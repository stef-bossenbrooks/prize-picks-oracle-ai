
import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCurrentBankroll } from '@/hooks/useBankroll';
import { useTodaysRecommendations, useUpdateRecommendationResult } from '@/hooks/useRecommendations';
import { useBets } from '@/hooks/useBets';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { data: currentBankroll = 0, isLoading: bankrollLoading } = useCurrentBankroll();
  const { data: todaysRecs = [], isLoading: recsLoading } = useTodaysRecommendations();
  const { data: bets = [], isLoading: betsLoading } = useBets();
  const updateResult = useUpdateRecommendationResult();
  const { toast } = useToast();

  // Calculate stats from bets
  const totalPnl = bets.reduce((sum, bet) => sum + (bet.pnl || 0), 0);
  const completedBets = bets.filter(bet => bet.result !== 'pending');
  const winRate = completedBets.length > 0 
    ? (completedBets.filter(bet => bet.result === 'win').length / completedBets.length) * 100 
    : 0;

  // Generate PnL chart data from recent bets
  const pnlData = React.useMemo(() => {
    const last14Days = [];
    const today = new Date();
    
    for (let i = 13; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayBets = bets.filter(bet => bet.date === dateStr);
      const dayPnl = dayBets.reduce((sum, bet) => sum + (bet.pnl || 0), 0);
      
      last14Days.push({
        date: `${date.getMonth() + 1}/${date.getDate()}`,
        pnl: dayPnl
      });
    }
    
    // Calculate cumulative PnL
    let cumulative = 0;
    return last14Days.map(day => {
      cumulative += day.pnl;
      return { ...day, pnl: cumulative };
    });
  }, [bets]);

  const handleRecordResult = async (recId: string, result: 'win' | 'loss') => {
    try {
      await updateResult.mutateAsync({ 
        id: recId, 
        result, 
        correct: result === 'win' 
      });
      toast({
        title: "Result Recorded",
        description: `Recommendation marked as ${result}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record result",
        variant: "destructive",
      });
    }
  };

  if (bankrollLoading || recsLoading || betsLoading) {
    return (
      <div className="flex-1 bg-gray-50">
        <Header title="Dashboard" subtitle="Loading..." />
        <div className="p-6">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50">
      <Header title="Dashboard" subtitle="Welcome back! Here's your betting overview." />
      
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Current Bankroll</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${currentBankroll >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${currentBankroll.toFixed(2)}
              </div>
              <p className="text-xs text-gray-500 mt-1">Total balance</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">All-Time P&L</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${totalPnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalPnl >= 0 ? '+' : ''}${totalPnl.toFixed(2)}
              </div>
              <p className="text-xs text-gray-500 mt-1">{winRate.toFixed(1)}% win rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Win Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{winRate.toFixed(1)}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${winRate}%` }}></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Today's Picks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{todaysRecs.length}</div>
              <p className="text-xs text-gray-500 mt-1">
                {todaysRecs.filter(r => r.confidence >= 4).length} high confidence
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Today's Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaysRecs.slice(0, 3).map((rec) => (
                  <div key={rec.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-semibold">{rec.player}</div>
                      <div className="text-sm text-gray-600">{rec.team} vs {rec.opponent}</div>
                      <div className="text-sm">
                        {rec.prop_type} {rec.recommendation} {rec.line}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={rec.recommendation === 'over' ? 'default' : 'secondary'}>
                        {rec.recommendation}
                      </Badge>
                      <div className="text-xs text-gray-500 mt-1">
                        {'★'.repeat(rec.confidence)}
                      </div>
                    </div>
                    {!rec.result && (
                      <div className="ml-4 space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRecordResult(rec.id, 'win')}
                        >
                          Win
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleRecordResult(rec.id, 'loss')}
                        >
                          Loss
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                {todaysRecs.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No recommendations for today yet.</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>14-Day Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={pnlData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="pnl" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Button className="bg-green-600 hover:bg-green-700">
                Deposit Funds
              </Button>
              <Button variant="outline">
                Withdraw
              </Button>
              <Button variant="outline">
                View All Recommendations
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
