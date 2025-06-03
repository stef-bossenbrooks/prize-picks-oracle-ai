
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

type Bet = Tables<'bets'>;
type BetInsert = TablesInsert<'bets'>;

export const useBets = () => {
  return useQuery({
    queryKey: ['bets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bets')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useAddBet = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (bet: Omit<BetInsert, 'id' | 'created_at' | 'payout' | 'pnl'>) => {
      const { data, error } = await supabase
        .from('bets')
        .insert(bet)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bets'] });
    },
  });
};

export const useUpdateBetResult = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, result }: { id: string; result: 'win' | 'loss' | 'pending' }) => {
      const { data, error } = await supabase
        .from('bets')
        .update({ result })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bets'] });
    },
  });
};
