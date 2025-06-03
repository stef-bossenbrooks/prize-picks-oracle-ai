
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getBankrollHistory, 
  getCurrentBalance, 
  addTransaction,
  getTodaysRecommendations,
  getAllRecommendations,
  recordBet,
  updateBetResult,
  getAllBets,
  getPerformanceMetrics,
  updateRecommendationResult,
  type BetData,
  type TransactionType
} from '@/lib/api';

// Bankroll hooks
export const useBankroll = () => {
  const transactions = useQuery({
    queryKey: ['bankroll'],
    queryFn: getBankrollHistory,
  });

  const currentBalance = useQuery({
    queryKey: ['current-bankroll'],
    queryFn: getCurrentBalance,
  });

  return {
    transactions: transactions.data || [],
    currentBalance: currentBalance.data || 0,
    isLoading: transactions.isLoading || currentBalance.isLoading,
    error: transactions.error || currentBalance.error,
  };
};

export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ type, amount, notes }: { 
      type: TransactionType; 
      amount: number; 
      notes?: string; 
    }) => addTransaction(type, amount, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bankroll'] });
      queryClient.invalidateQueries({ queryKey: ['current-bankroll'] });
    },
  });
};

// Bets hooks
export const useBets = () => {
  return useQuery({
    queryKey: ['bets'],
    queryFn: getAllBets,
  });
};

export const useAddBet = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (bet: BetData) => recordBet(bet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bets'] });
    },
  });
};

export const useUpdateBetResult = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ betId, result }: { betId: string; result: 'win' | 'loss' }) => 
      updateBetResult(betId, result),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bets'] });
    },
  });
};

// Recommendations hooks
export const useRecommendations = (sport?: string, confidenceFilter?: string) => {
  return useQuery({
    queryKey: ['recommendations', sport, confidenceFilter],
    queryFn: () => getAllRecommendations(sport, confidenceFilter),
  });
};

export const useTodaysRecommendations = () => {
  return useQuery({
    queryKey: ['todays-recommendations'],
    queryFn: getTodaysRecommendations,
  });
};

export const useUpdateRecommendationResult = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, result, correct }: { 
      id: string; 
      result: 'win' | 'loss'; 
      correct: boolean; 
    }) => updateRecommendationResult(id, result, correct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations'] });
      queryClient.invalidateQueries({ queryKey: ['todays-recommendations'] });
    },
  });
};

// Performance metrics hooks
export const usePerformanceMetrics = () => {
  return useQuery({
    queryKey: ['performance-metrics'],
    queryFn: getPerformanceMetrics,
  });
};
