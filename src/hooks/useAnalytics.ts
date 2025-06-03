
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const usePerformanceBySport = () => {
  return useQuery({
    queryKey: ['performance-by-sport'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('performance_by_sport')
        .select('*');
      
      if (error) throw error;
      return data;
    },
  });
};

export const usePerformanceByProp = () => {
  return useQuery({
    queryKey: ['performance-by-prop'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('performance_by_prop')
        .select('*');
      
      if (error) throw error;
      return data;
    },
  });
};

export const usePerformanceByConfidence = () => {
  return useQuery({
    queryKey: ['performance-by-confidence'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('performance_by_confidence')
        .select('*');
      
      if (error) throw error;
      return data;
    },
  });
};
