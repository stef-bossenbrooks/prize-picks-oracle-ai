
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

type Recommendation = Tables<'recommendations'>;
type RecommendationInsert = TablesInsert<'recommendations'>;

export const useRecommendations = (sport?: string, confidenceFilter?: string) => {
  return useQuery({
    queryKey: ['recommendations', sport, confidenceFilter],
    queryFn: async () => {
      let query = supabase
        .from('recommendations')
        .select('*')
        .order('confidence', { ascending: false })
        .order('created_at', { ascending: false });

      if (sport && sport !== 'all') {
        query = query.eq('sport', sport);
      }

      if (confidenceFilter && confidenceFilter !== 'all') {
        query = query.gte('confidence', parseInt(confidenceFilter));
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    },
  });
};

export const useTodaysRecommendations = () => {
  return useQuery({
    queryKey: ['todays-recommendations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('todays_recommendations')
        .select('*');
      
      if (error) throw error;
      return data;
    },
  });
};

export const useUpdateRecommendationResult = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, result, correct }: { id: string; result: 'win' | 'loss'; correct: boolean }) => {
      const { data, error } = await supabase
        .from('recommendations')
        .update({ result, correct })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations'] });
      queryClient.invalidateQueries({ queryKey: ['todays-recommendations'] });
    },
  });
};
