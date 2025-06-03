
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

// Type definitions
export type BetData = Omit<TablesInsert<'bets'>, 'id' | 'created_at' | 'payout' | 'pnl'>;
export type TransactionType = 'deposit' | 'withdrawal' | 'winnings' | 'loss';

// Bankroll operations
export const getBankrollHistory = async () => {
  const { data, error } = await supabase
    .from('bankroll')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const getCurrentBalance = async () => {
  const { data, error } = await supabase
    .from('current_bankroll')
    .select('current_balance')
    .single();
  
  if (error) throw error;
  return data?.current_balance || 0;
};

export const addTransaction = async (
  type: TransactionType, 
  amount: number, 
  notes?: string
) => {
  const { data, error } = await supabase
    .from('bankroll')
    .insert({
      transaction_type: type,
      amount,
      notes
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Recommendations operations
export const getTodaysRecommendations = async () => {
  const { data, error } = await supabase
    .from('todays_recommendations')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const getAllRecommendations = async (sport?: string, confidenceFilter?: string) => {
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
};

// Bet operations
export const recordBet = async (bet: BetData) => {
  const { data, error } = await supabase
    .from('bets')
    .insert(bet)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateBetResult = async (betId: string, result: 'win' | 'loss') => {
  const { data, error } = await supabase
    .from('bets')
    .update({ result })
    .eq('id', betId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getAllBets = async () => {
  const { data, error } = await supabase
    .from('bets')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Performance metrics operations
export const getPerformanceMetrics = async () => {
  const [sportData, propData, confidenceData] = await Promise.all([
    supabase.from('performance_by_sport').select('*'),
    supabase.from('performance_by_prop').select('*'),
    supabase.from('performance_by_confidence').select('*')
  ]);

  if (sportData.error) throw sportData.error;
  if (propData.error) throw propData.error;
  if (confidenceData.error) throw confidenceData.error;

  return {
    bySport: sportData.data,
    byProp: propData.data,
    byConfidence: confidenceData.data
  };
};

// Update recommendation result
export const updateRecommendationResult = async (
  id: string, 
  result: 'win' | 'loss', 
  correct: boolean
) => {
  const { data, error } = await supabase
    .from('recommendations')
    .update({ result, correct })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};
