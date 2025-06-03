
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const Settings = () => {
  return (
    <div className="flex-1 bg-gray-50">
      <Header title="Settings" subtitle="Configure your preferences and account settings" />
      
      <div className="p-6">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Sport Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Sport Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="nba">NBA</Label>
                  <p className="text-sm text-gray-500">Receive NBA recommendations</p>
                </div>
                <Switch id="nba" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="nfl">NFL</Label>
                  <p className="text-sm text-gray-500">Receive NFL recommendations</p>
                </div>
                <Switch id="nfl" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="mlb">MLB</Label>
                  <p className="text-sm text-gray-500">Receive MLB recommendations</p>
                </div>
                <Switch id="mlb" />
              </div>
            </CardContent>
          </Card>

          {/* Bankroll Management */}
          <Card>
            <CardHeader>
              <CardTitle>Bankroll Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="max-bet">Maximum Bet Size (%)</Label>
                <Input id="max-bet" type="number" defaultValue="5" className="mt-1" />
                <p className="text-sm text-gray-500 mt-1">Maximum percentage of bankroll per bet</p>
              </div>
              
              <div>
                <Label htmlFor="target-bankroll">Target Bankroll ($)</Label>
                <Input id="target-bankroll" type="number" defaultValue="5000" className="mt-1" />
                <p className="text-sm text-gray-500 mt-1">Your bankroll growth target</p>
              </div>
              
              <div>
                <Label htmlFor="risk-level">Risk Level</Label>
                <Select defaultValue="moderate">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="daily-picks">Daily Picks</Label>
                  <p className="text-sm text-gray-500">Get notified of new daily recommendations</p>
                </div>
                <Switch id="daily-picks" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="high-confidence">High Confidence Alerts</Label>
                  <p className="text-sm text-gray-500">Alerts for 5-star confidence picks</p>
                </div>
                <Switch id="high-confidence" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="results">Results Updates</Label>
                  <p className="text-sm text-gray-500">Get notified when bet results are available</p>
                </div>
                <Switch id="results" />
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>AI Analysis Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="confidence-threshold">Minimum Confidence Level</Label>
                <Select defaultValue="3">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Star</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="5">5 Stars Only</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">Only show picks above this confidence level</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="injury-analysis">Advanced Injury Analysis</Label>
                  <p className="text-sm text-gray-500">Factor in detailed injury reports</p>
                </div>
                <Switch id="injury-analysis" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weather-analysis">Weather Analysis</Label>
                  <p className="text-sm text-gray-500">Include weather factors for outdoor sports</p>
                </div>
                <Switch id="weather-analysis" defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="bg-green-600 hover:bg-green-700">
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
