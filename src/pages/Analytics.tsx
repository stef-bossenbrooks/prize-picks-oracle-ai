
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const sportPerformance = [
  { sport: 'NBA', wins: 18, losses: 7, winRate: 72 },
  { sport: 'NFL', wins: 12, losses: 10, winRate: 55 },
  { sport: 'MLB', wins: 8, losses: 4, winRate: 67 }
];

const propPerformance = [
  { prop: 'Points', wins: 15, losses: 8, winRate: 65 },
  { prop: 'Rebounds', wins: 12, losses: 6, winRate: 67 },
  { prop: 'Assists', wins: 11, losses: 7, winRate: 61 }
];

const confidencePerformance = [
  { confidence: '5 Stars', winRate: 85, count: 12 },
  { confidence: '4 Stars', winRate: 72, count: 18 },
  { confidence: '3 Stars', winRate: 58, count: 15 },
  { confidence: '2 Stars', winRate: 45, count: 8 }
];

const weeklyTrends = [
  { week: 'Week 1', profit: 120 },
  { week: 'Week 2', profit: 280 },
  { week: 'Week 3', profit: 180 },
  { week: 'Week 4', profit: 340 }
];

const Analytics = () => {
  return (
    <div className="flex-1 bg-gray-50">
      <Header title="Analytics" subtitle="Deep dive into your betting performance" />
      
      <div className="p-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Overall Win Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">62.3%</div>
              <p className="text-xs text-gray-500 mt-1">38W - 23L</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Best Sport</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">NBA</div>
              <p className="text-xs text-gray-500 mt-1">72% win rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Best Prop</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">Rebounds</div>
              <p className="text-xs text-gray-500 mt-1">67% win rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">ROI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">28.3%</div>
              <p className="text-xs text-gray-500 mt-1">Above target</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Performance by Sport */}
          <Card>
            <CardHeader>
              <CardTitle>Performance by Sport</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={sportPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sport" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="wins" fill="#10b981" />
                  <Bar dataKey="losses" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance by Prop Type */}
          <Card>
            <CardHeader>
              <CardTitle>Performance by Prop Type</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={propPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="prop" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="winRate" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Confidence Level Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Performance by Confidence Level</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={confidencePerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="confidence" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="winRate" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weekly Profit Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Profit Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={weeklyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Profit']} />
                  <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Strategy Performance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Strategy Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Strategy</th>
                    <th className="text-left py-2">Bets</th>
                    <th className="text-left py-2">Win Rate</th>
                    <th className="text-left py-2">ROI</th>
                    <th className="text-left py-2">Profit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3">High-volume scorer exploitation</td>
                    <td className="py-3">15</td>
                    <td className="py-3">73%</td>
                    <td className="py-3 text-green-600">32%</td>
                    <td className="py-3 text-green-600">+$280</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Matchup-based rebounding edge</td>
                    <td className="py-3">12</td>
                    <td className="py-3">67%</td>
                    <td className="py-3 text-green-600">25%</td>
                    <td className="py-3 text-green-600">+$190</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Pace and usage rate analysis</td>
                    <td className="py-3">18</td>
                    <td className="py-3">61%</td>
                    <td className="py-3 text-green-600">18%</td>
                    <td className="py-3 text-green-600">+$150</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
