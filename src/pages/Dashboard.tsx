
import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockRecommendations = [
  {
    id: 1,
    player: 'Jayson Tatum',
    team: 'BOS',
    opponent: 'LAL',
    prop: 'Points',
    line: 27.5,
    recommendation: 'Over',
    confidence: 5
  },
  {
    id: 2,
    player: 'Luka Dončić',
    team: 'DAL',
    opponent: 'GSW',
    prop: 'Assists',
    line: 8.5,
    recommendation: 'Under',
    confidence: 4
  },
  {
    id: 3,
    player: 'Nikola Jokić',
    team: 'DEN',
    opponent: 'MIA',
    prop: 'Rebounds',
    line: 12.5,
    recommendation: 'Over',
    confidence: 4
  }
];

const pnlData = [
  { date: '3/1', pnl: 0 },
  { date: '3/2', pnl: 150 },
  { date: '3/3', pnl: 100 },
  { date: '3/4', pnl: 280 },
  { date: '3/5', pnl: 200 },
  { date: '3/6', pnl: 350 },
  { date: '3/7', pnl: 420 },
  { date: '3/8', pnl: 380 },
  { date: '3/9', pnl: 520 },
  { date: '3/10', pnl: 650 },
  { date: '3/11', pnl: 580 },
  { date: '3/12', pnl: 720 },
  { date: '3/13', pnl: 850 },
  { date: '3/14', pnl: 920 }
];

const Dashboard = () => {
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
              <div className="text-3xl font-bold text-green-600">$2,450</div>
              <p className="text-xs text-gray-500 mt-1">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">All-Time P&L</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">+$920</div>
              <p className="text-xs text-gray-500 mt-1">62.3% win rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Win Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">62.3%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '62.3%' }}></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Today's Picks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
              <p className="text-xs text-gray-500 mt-1">High confidence</p>
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
                {mockRecommendations.map((rec) => (
                  <div key={rec.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-semibold">{rec.player}</div>
                      <div className="text-sm text-gray-600">{rec.team} vs {rec.opponent}</div>
                      <div className="text-sm">
                        {rec.prop} {rec.recommendation} {rec.line}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={rec.recommendation === 'Over' ? 'default' : 'secondary'}>
                        {rec.recommendation}
                      </Badge>
                      <div className="text-xs text-gray-500 mt-1">
                        {'★'.repeat(rec.confidence)}
                      </div>
                    </div>
                    <Button size="sm" className="ml-4">
                      Record Result
                    </Button>
                  </div>
                ))}
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
