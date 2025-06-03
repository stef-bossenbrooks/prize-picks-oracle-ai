
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockTransactions = [
  { id: 1, date: '2024-03-14', type: 'Deposit', amount: 500, balance: 2450 },
  { id: 2, date: '2024-03-13', type: 'Withdrawal', amount: -200, balance: 1950 },
  { id: 3, date: '2024-03-12', type: 'Deposit', amount: 300, balance: 2150 },
  { id: 4, date: '2024-03-10', type: 'Deposit', amount: 1000, balance: 1850 }
];

const balanceHistory = [
  { date: '3/1', balance: 1000 },
  { date: '3/3', balance: 1200 },
  { date: '3/5', balance: 1150 },
  { date: '3/7', balance: 1400 },
  { date: '3/9', balance: 1650 },
  { date: '3/11', balance: 1850 },
  { date: '3/13', balance: 1950 },
  { date: '3/14', balance: 2450 }
];

const Bankroll = () => {
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  return (
    <div className="flex-1 bg-gray-50">
      <Header title="Bankroll Management" subtitle="Track your deposits, withdrawals, and balance history" />
      
      <div className="p-6">
        {/* Current Balance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600 mb-2">$2,450</div>
            <p className="text-gray-600">Available for betting</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Add Transaction Form */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Add Transaction</CardTitle>
                <Button 
                  onClick={() => setShowTransactionForm(!showTransactionForm)}
                  variant={showTransactionForm ? "outline" : "default"}
                  size="sm"
                >
                  {showTransactionForm ? 'Cancel' : 'Add'}
                </Button>
              </div>
            </CardHeader>
            {showTransactionForm && (
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="transaction-type">Transaction Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="deposit">Deposit</SelectItem>
                        <SelectItem value="withdrawal">Withdrawal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount ($)</Label>
                    <Input id="amount" type="number" placeholder="0.00" />
                  </div>
                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Input id="description" placeholder="Transaction notes" />
                  </div>
                  <Button className="w-full">Add Transaction</Button>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Monthly Summary */}
          <Card>
            <CardHeader>
              <CardTitle>March 2024 Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Deposits:</span>
                  <span className="font-medium text-green-600">+$1,800</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Withdrawals:</span>
                  <span className="font-medium text-red-600">-$200</span>
                </div>
                <div className="flex justify-between">
                  <span>Betting P&L:</span>
                  <span className="font-medium text-green-600">+$850</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold">
                  <span>Net Change:</span>
                  <span className="text-green-600">+$2,450</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Balance Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Balance Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={balanceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Balance']} />
                <Line type="monotone" dataKey="balance" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Date</th>
                    <th className="text-left py-2">Type</th>
                    <th className="text-left py-2">Amount</th>
                    <th className="text-left py-2">Balance After</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b">
                      <td className="py-3">{transaction.date}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          transaction.type === 'Deposit' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className={`py-3 font-medium ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
                      </td>
                      <td className="py-3 font-medium">${transaction.balance}</td>
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

export default Bankroll;
