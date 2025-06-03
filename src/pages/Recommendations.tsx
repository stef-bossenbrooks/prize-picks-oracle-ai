
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const mockRecommendations = [
  {
    id: 1,
    player: 'Jayson Tatum',
    team: 'Boston Celtics',
    opponent: 'Los Angeles Lakers',
    sport: 'NBA',
    prop: 'Points',
    line: 27.5,
    recommendation: 'Over',
    confidence: 5,
    rationale: 'Tatum has exceeded 27.5 points in 8 of his last 10 games. Lakers defense ranks 24th against forwards.',
    strategy: 'High-volume scorer exploitation'
  },
  {
    id: 2,
    player: 'Luka Dončić',
    team: 'Dallas Mavericks',
    opponent: 'Golden State Warriors',
    sport: 'NBA',
    prop: 'Assists',
    line: 8.5,
    recommendation: 'Under',
    confidence: 4,
    rationale: 'Warriors fast pace limits Luka\'s assist opportunities. Kyrie Irving\'s return reduces his playmaking load.',
    strategy: 'Pace and usage rate analysis'
  },
  {
    id: 3,
    player: 'Nikola Jokić',
    team: 'Denver Nuggets',
    opponent: 'Miami Heat',
    sport: 'NBA',
    prop: 'Rebounds',
    line: 12.5,
    recommendation: 'Over',
    confidence: 4,
    rationale: 'Jokic averages 13.2 rebounds vs teams allowing 48+ rebounds per game. Heat rank 28th in rebounding.',
    strategy: 'Matchup-based rebounding edge'
  }
];

const Recommendations = () => {
  const [sportFilter, setSportFilter] = useState('all');
  const [confidenceFilter, setConfidenceFilter] = useState('all');

  const filteredRecommendations = mockRecommendations.filter(rec => {
    if (sportFilter !== 'all' && rec.sport !== sportFilter) return false;
    if (confidenceFilter !== 'all' && rec.confidence < parseInt(confidenceFilter)) return false;
    return true;
  });

  return (
    <div className="flex-1 bg-gray-50">
      <Header title="Recommendations" subtitle="AI-generated picks for today's games" />
      
      <div className="p-6">
        {/* Filters */}
        <div className="flex space-x-4 mb-6">
          <Select value={sportFilter} onValueChange={setSportFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sports</SelectItem>
              <SelectItem value="NBA">NBA</SelectItem>
              <SelectItem value="NFL">NFL</SelectItem>
              <SelectItem value="MLB">MLB</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={confidenceFilter} onValueChange={setConfidenceFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Confidence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Confidence</SelectItem>
              <SelectItem value="4">4+ Stars</SelectItem>
              <SelectItem value="5">5 Stars Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {filteredRecommendations.map((rec) => (
            <Card key={rec.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{rec.player}</CardTitle>
                  <div className="text-yellow-500">
                    {'★'.repeat(rec.confidence)}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{rec.team} vs {rec.opponent}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{rec.prop}</span>
                    <Badge 
                      variant={rec.recommendation === 'Over' ? 'default' : 'secondary'}
                      className={rec.recommendation === 'Over' ? 'bg-green-600' : 'bg-red-600'}
                    >
                      {rec.recommendation} {rec.line}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2">Analysis</h4>
                    <p className="text-sm text-gray-600">{rec.rationale}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-1">Strategy</h4>
                    <p className="text-xs text-gray-500">{rec.strategy}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      Record Result
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Add to Combo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Combo Plays Section */}
        <Card>
          <CardHeader>
            <CardTitle>Power Play & Flex Combinations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <p>Create combinations from your selected picks</p>
              <Button className="mt-4" variant="outline">
                Build Power Play (2-4 picks)
              </Button>
              <Button className="mt-2 ml-4" variant="outline">
                Build Flex Play (5+ picks)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Recommendations;
