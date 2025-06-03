export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bankroll: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          notes: string | null
          running_balance: number | null
          transaction_type: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          notes?: string | null
          running_balance?: number | null
          transaction_type: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          notes?: string | null
          running_balance?: number | null
          transaction_type?: string
        }
        Relationships: []
      }
      bets: {
        Row: {
          created_at: string | null
          date: string
          id: string
          league: string | null
          line: number
          notes: string | null
          opponent: string | null
          over_under: string
          payout: number | null
          player: string
          pnl: number | null
          prop_type: string
          result: string | null
          sport: string
          stake: number
          strategy: string | null
          team: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          league?: string | null
          line: number
          notes?: string | null
          opponent?: string | null
          over_under: string
          payout?: number | null
          player: string
          pnl?: number | null
          prop_type: string
          result?: string | null
          sport: string
          stake: number
          strategy?: string | null
          team?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          league?: string | null
          line?: number
          notes?: string | null
          opponent?: string | null
          over_under?: string
          payout?: number | null
          player?: string
          pnl?: number | null
          prop_type?: string
          result?: string | null
          sport?: string
          stake?: number
          strategy?: string | null
          team?: string | null
        }
        Relationships: []
      }
      learning_insights: {
        Row: {
          created_at: string | null
          finding: string
          id: string
          impact_score: number | null
          implemented: boolean | null
          insight_type: string
          recommendation: string | null
        }
        Insert: {
          created_at?: string | null
          finding: string
          id?: string
          impact_score?: number | null
          implemented?: boolean | null
          insight_type: string
          recommendation?: string | null
        }
        Update: {
          created_at?: string | null
          finding?: string
          id?: string
          impact_score?: number | null
          implemented?: boolean | null
          insight_type?: string
          recommendation?: string | null
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          confidence: number
          correct: boolean | null
          created_at: string | null
          date: string
          id: string
          line: number
          opponent: string | null
          player: string
          prop_type: string
          rationale: string | null
          recommendation: string
          result: string | null
          source: string | null
          sport: string
          team: string | null
        }
        Insert: {
          confidence: number
          correct?: boolean | null
          created_at?: string | null
          date: string
          id?: string
          line: number
          opponent?: string | null
          player: string
          prop_type: string
          rationale?: string | null
          recommendation: string
          result?: string | null
          source?: string | null
          sport: string
          team?: string | null
        }
        Update: {
          confidence?: number
          correct?: boolean | null
          created_at?: string | null
          date?: string
          id?: string
          line?: number
          opponent?: string | null
          player?: string
          prop_type?: string
          rationale?: string | null
          recommendation?: string
          result?: string | null
          source?: string | null
          sport?: string
          team?: string | null
        }
        Relationships: []
      }
      strategies: {
        Row: {
          active: boolean | null
          created_at: string | null
          description: string | null
          id: string
          loss_count: number | null
          name: string
          roi: number | null
          sport: string
          win_count: number | null
          win_rate: number | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          loss_count?: number | null
          name: string
          roi?: number | null
          sport: string
          win_count?: number | null
          win_rate?: number | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          loss_count?: number | null
          name?: string
          roi?: number | null
          sport?: string
          win_count?: number | null
          win_rate?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      current_bankroll: {
        Row: {
          current_balance: number | null
        }
        Relationships: []
      }
      performance_by_confidence: {
        Row: {
          accuracy_rate: number | null
          confidence: number | null
          correct_predictions: number | null
          total_recommendations: number | null
        }
        Relationships: []
      }
      performance_by_prop: {
        Row: {
          losses: number | null
          prop_type: string | null
          roi: number | null
          total_bets: number | null
          total_pnl: number | null
          win_rate: number | null
          wins: number | null
        }
        Relationships: []
      }
      performance_by_sport: {
        Row: {
          losses: number | null
          roi: number | null
          sport: string | null
          total_bets: number | null
          total_pnl: number | null
          win_rate: number | null
          wins: number | null
        }
        Relationships: []
      }
      todays_recommendations: {
        Row: {
          confidence: number | null
          correct: boolean | null
          created_at: string | null
          date: string | null
          id: string | null
          line: number | null
          opponent: string | null
          player: string | null
          prop_type: string | null
          rationale: string | null
          recommendation: string | null
          result: string | null
          source: string | null
          sport: string | null
          team: string | null
        }
        Insert: {
          confidence?: number | null
          correct?: boolean | null
          created_at?: string | null
          date?: string | null
          id?: string | null
          line?: number | null
          opponent?: string | null
          player?: string | null
          prop_type?: string | null
          rationale?: string | null
          recommendation?: string | null
          result?: string | null
          source?: string | null
          sport?: string | null
          team?: string | null
        }
        Update: {
          confidence?: number | null
          correct?: boolean | null
          created_at?: string | null
          date?: string | null
          id?: string | null
          line?: number | null
          opponent?: string | null
          player?: string | null
          prop_type?: string | null
          rationale?: string | null
          recommendation?: string | null
          result?: string | null
          source?: string | null
          sport?: string | null
          team?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
