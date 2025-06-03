
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useBets, useAddBet, useUpdateBetResult } from '@/hooks/useBets';
import { useToast } from '@/hooks/use-toast';

const BetTracker = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    player: '',
    prop_type: '',
    line: '',
    over_under: 'over',
    stake: '',
    sport: '',
    team: '',
    opponent: '',
    date: new Date().toISOString().split('T')[0],
    result: 'pending'
  });

  const { data: bets = [], isLoading } = useBets();
  const addBet = useAddBet();
  const updateResult = useUpdateBetResult();
  const { toast } = useToast();

  // Calculate summary stats from real data
  const totalBets = bets.length;
  const totalWagered = bets.reduce((sum, bet) => sum + bet.stake, 0);
  const completedBets = bets.filter(bet => bet.result !== 'pending');
  const totalReturn = bets.reduce((sum, bet) => sum + (bet.payout || 0), 0);
  const netProfit = bets.reduce((sum, bet) => sum + (bet.pnl || 0), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBet.mutateAsync({
        player: formData.player,
        prop_type: formData.prop_type,
        line: parseFloat(formData.line),
        over_under: formData.over_under as 'over' | 'under',
        stake: parseFloat(formData.stake),
        sport: formData.sport,
        team: formData.team,
        opponent: formData.opponent,
        date: formData.date,
        result: formData.result as 'win' | 'loss' | 'pending'
      });
      
      toast({
        title: "Bet Added",
        description: "Your bet has been recorded successfully",
      });
      
      setShowAddForm(false);
      setFormData({
        player: '',
        prop_type: '',
        line: '',
        over_under: 'over',
        stake: '',
        sport: '',
        team: '',
        opponent: '',
        date: new Date().toISOString().split('T')[0],
        result: 'pending'
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add bet",
        variant: "destructive",
      });
    }
  };

  const handleUpdateResult = async (betId: string, result: 'win' | 'loss') => {
    try {
      await updateResult.mutateAsync({ id: betId, result });
      toast({
        title: "Result Updated",
        description: `Bet marked as ${result}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update result",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 bg-gray-50">
        <Header title="Bet Tracker" subtitle="Loading..." />
        <div className="p-6">Loading bet data...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50">
      <Header title="Bet Tracker" subtitle="Track and analyze your betting history" />
      
      <div className="p-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Bets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBets}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Wagered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalWagered.toFixed(2)}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Return</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalReturn >= totalWagered ? 'text-green-600' : 'text-red-600'}`}>
                ${totalReturn.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Net Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {netProfit >= 0 ? '+' : ''}${netProfit.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Bet Form */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Add New Bet</CardTitle>
              <Button 
                onClick={() => setShowAddForm(!showAddForm)}
                variant={showAddForm ? "outline" : "default"}
              >
                {showAddForm ? 'Cancel' : 'Add Bet'}
              </Button>
            </div>
          </CardHeader>
          {showAddForm && (
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="player">Player</Label>
                    <Input 
                      id="player" 
                      placeholder="Player name" 
                      value={formData.player}
                      onChange={(e) => setFormData({...formData, player: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="prop">Prop Type</Label>
                    <Input 
                      id="prop" 
                      placeholder="e.g., Points, Rebounds, Assists" 
                      value={formData.prop_type}
                      onChange={(e) => setFormData({...formData, prop_type: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="line">Line</Label>
                    <Input 
                      id="line" 
                      type="number" 
                      step="0.5" 
                      placeholder="25.5" 
                      value={formData.line}
                      onChange={(e) => setFormData({...formData, line: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="over-under">Over/Under</Label>
                    <Select value={formData.over_under} onValueChange={(value) => setFormData({...formData, over_under: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="over">Over</SelectItem>
                        <SelectItem value="under">Under</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="stake">Stake ($)</Label>
                    <Input 
                      id="stake" 
                      type="number" 
                      step="0.01" 
                      placeholder="0.00" 
                      value={formData.stake}
                      onChange={(e) => setFormData({...formData, stake: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="sport">Sport</Label>
                    <Select value={formData.sport} onValueChange={(value) => setFormData({...formData, sport: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sport" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NBA">NBA</SelectItem>
                        <SelectItem value="NFL">NFL</SelectItem>
                        <SelectItem value="MLB">MLB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="team">Team</Label>
                    <Input 
                      id="team" 
                      placeholder="Team name" 
                      value={formData.team}
                      onChange={(e) => setFormData({...formData, team: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="opponent">Opponent</Label>
                    <Input 
                      id="opponent" 
                      placeholder="Opponent team" 
                      value={formData.opponent}
                      onChange={(e) => setFormData({...formData, opponent: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input 
                      id="date" 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="mt-4" disabled={addBet.isPending}>
                  {addBet.isPending ? 'Adding...' : 'Save Bet'}
                </Button>
              </form>
            </CardContent>
          )}
        </Card>

        {/* Bet History Table */}
        <Card>
          <CardHeader>
            <CardTitle>Bet History</CardTitle>
          </CardHeader>
          <CardContent>
            {bets.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No bets recorded yet. Add your first bet above!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Date</th>
                      <th className="text-left py-2">Player</th>
                      <th className="text-left py-2">Prop</th>
                      <th className="text-left py-2">Stake</th>
                      <th className="text-left py-2">Result</th>
                      <th className="text-left py-2">P&L</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bets.map((bet) => (
                      <tr key={bet.id} className="border-b">
                        <td className="py-3">{bet.date}</td>
                        <td className="py-3 font-medium">{bet.player}</td>
                        <td className="py-3">{bet.prop_type} {bet.over_under} {bet.line}</td>
                        <td className="py-3">${bet.stake}</td>
                        <td className="py-3">
                          <Badge 
                            variant={bet.result === 'win' ? 'default' : bet.result === 'loss' ? 'destructive' : 'secondary'}
                            className={
                              bet.result === 'win' ? 'bg-green-600' : 
                              bet.result === 'loss' ? 'bg-red-600' : 
                              'bg-gray-600'
                            }
                          >
                            {bet.result}
                          </Badge>
                        </td>
                        <td className="py-3 font-medium">
                          <span className={
                            bet.pnl && bet.pnl > 0 ? 'text-green-600' : 
                            bet.pnl && bet.pnl < 0 ? 'text-red-600' : 
                            'text-gray-600'
                          }>
                            {bet.pnl ? `${bet.pnl >= 0 ? '+' : ''}$${bet.pnl.toFixed(2)}` : '-'}
                          </span>
                        </td>
                        <td className="py-3">
                          {bet.result === 'pending' && (
                            <div className="space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleUpdateResult(bet.id, 'win')}
                                disabled={updateResult.isPending}
                              >
                                Win
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleUpdateResult(bet.id, 'loss')}
                                disabled={updateResult.isPending}
                              >
                                Loss
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BetTracker;
