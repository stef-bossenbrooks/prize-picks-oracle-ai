
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const mockBets = [
  {
    id: 1,
    date: '2024-03-14',
    player: 'Jayson Tatum',
    prop: 'Points Over 27.5',
    stake: 50,
    odds: 1.91,
    result: 'Win',
    payout: 95.50
  },
  {
    id: 2,
    date: '2024-03-13',
    player: 'Luka Dončić',
    prop: 'Assists Under 8.5',
    stake: 75,
    odds: 1.85,
    result: 'Loss',
    payout: 0
  },
  {
    id: 3,
    date: '2024-03-13',
    player: 'Nikola Jokić',
    prop: 'Rebounds Over 12.5',
    stake: 100,
    odds: 1.95,
    result: 'Win',
    payout: 195
  }
];

const BetTracker = () => {
  const [showAddForm, setShowAddForm] = useState(false);

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
              <div className="text-2xl font-bold">47</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Wagered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,250</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Return</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">$4,170</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Net Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+$920</div>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="player">Player</Label>
                  <Input id="player" placeholder="Player name" />
                </div>
                <div>
                  <Label htmlFor="prop">Prop</Label>
                  <Input id="prop" placeholder="e.g., Points Over 25.5" />
                </div>
                <div>
                  <Label htmlFor="stake">Stake ($)</Label>
                  <Input id="stake" type="number" placeholder="0.00" />
                </div>
                <div>
                  <Label htmlFor="odds">Odds</Label>
                  <Input id="odds" type="number" step="0.01" placeholder="1.91" />
                </div>
                <div>
                  <Label htmlFor="sport">Sport</Label>
                  <Select>
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
                  <Label htmlFor="result">Result</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pending" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="win">Win</SelectItem>
                      <SelectItem value="loss">Loss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="mt-4">Save Bet</Button>
            </CardContent>
          )}
        </Card>

        {/* Bet History Table */}
        <Card>
          <CardHeader>
            <CardTitle>Bet History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Date</th>
                    <th className="text-left py-2">Player</th>
                    <th className="text-left py-2">Prop</th>
                    <th className="text-left py-2">Stake</th>
                    <th className="text-left py-2">Odds</th>
                    <th className="text-left py-2">Result</th>
                    <th className="text-left py-2">Payout</th>
                  </tr>
                </thead>
                <tbody>
                  {mockBets.map((bet) => (
                    <tr key={bet.id} className="border-b">
                      <td className="py-3">{bet.date}</td>
                      <td className="py-3 font-medium">{bet.player}</td>
                      <td className="py-3">{bet.prop}</td>
                      <td className="py-3">${bet.stake}</td>
                      <td className="py-3">{bet.odds}</td>
                      <td className="py-3">
                        <Badge 
                          variant={bet.result === 'Win' ? 'default' : 'destructive'}
                          className={bet.result === 'Win' ? 'bg-green-600' : 'bg-red-600'}
                        >
                          {bet.result}
                        </Badge>
                      </td>
                      <td className="py-3 font-medium">
                        <span className={bet.result === 'Win' ? 'text-green-600' : 'text-red-600'}>
                          ${bet.payout}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BetTracker;
