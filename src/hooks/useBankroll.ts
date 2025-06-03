
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

type BankrollTransaction = Tables<'bankroll'>;
type BankrollInsert = TablesInsert<'bankroll'>;

export const useBankroll = () => {
  return useQuery({
    queryKey: ['bankroll'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bankroll')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCurrentBankroll = () => {
  return useQuery({
    queryKey: ['current-bankroll'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('current_bankroll')
        .select('current_balance')
        .single();
      
      if (error) throw error;
      return data?.current_balance || 0;
    },
  });
};

export const useAddBankrollTransaction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (transaction: Omit<BankrollInsert, 'id' | 'created_at' | 'running_balance'>) => {
      const { data, error } = await supabase
        .from('bankroll')
        .insert(transaction)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bankroll'] });
      queryClient.invalidateQueries({ queryKey: ['current-bankroll'] });
    },
  });
};
