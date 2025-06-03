
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRecommendations, useUpdateRecommendationResult } from '@/hooks/useRecommendations';
import { useToast } from '@/hooks/use-toast';

const Recommendations = () => {
  const [sportFilter, setSportFilter] = useState('all');
  const [confidenceFilter, setConfidenceFilter] = useState('all');
  const { data: recommendations = [], isLoading } = useRecommendations(sportFilter, confidenceFilter);
  const updateResult = useUpdateRecommendationResult();
  const { toast } = useToast();

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

  if (isLoading) {
    return (
      <div className="flex-1 bg-gray-50">
        <Header title="Recommendations" subtitle="Loading..." />
        <div className="p-6">Loading recommendations...</div>
      </div>
    );
  }

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
          {recommendations.map((rec) => (
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
                    <span className="font-medium">{rec.prop_type}</span>
                    <Badge 
                      variant={rec.recommendation === 'over' ? 'default' : 'secondary'}
                      className={rec.recommendation === 'over' ? 'bg-green-600' : 'bg-red-600'}
                    >
                      {rec.recommendation} {rec.line}
                    </Badge>
                  </div>
                  
                  {rec.rationale && (
                    <div>
                      <h4 className="font-medium text-sm mb-2">Analysis</h4>
                      <p className="text-sm text-gray-600">{rec.rationale}</p>
                    </div>
                  )}
                  
                  {rec.source && (
                    <div>
                      <h4 className="font-medium text-sm mb-1">Source</h4>
                      <p className="text-xs text-gray-500">{rec.source}</p>
                    </div>
                  )}
                  
                  {rec.result ? (
                    <div className="flex items-center justify-center">
                      <Badge variant={rec.result === 'win' ? 'default' : 'destructive'}>
                        Result: {rec.result}
                      </Badge>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleRecordResult(rec.id, 'win')}
                      >
                        Record Win
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        className="flex-1"
                        onClick={() => handleRecordResult(rec.id, 'loss')}
                      >
                        Record Loss
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {recommendations.length === 0 && (
          <Card>
            <CardContent className="text-center py-8 text-gray-500">
              <p>No recommendations found matching your filters.</p>
            </CardContent>
          </Card>
        )}

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
