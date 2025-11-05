export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      evt_data: {
        Row: {
          created_at: string
          datetime: string
          distance: number
          id: number
          img: string
          info: string
          location_label: string
          location_url: string
          route_url: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          datetime: string
          distance: number
          id?: number
          img: string
          info: string
          location_label: string
          location_url: string
          route_url: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          datetime?: string
          distance?: number
          id?: number
          img?: string
          info?: string
          location_label?: string
          location_url?: string
          route_url?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      evt_registration: {
        Row: {
          created_at: string
          id: number
          id_event: number
          id_user: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          id_event: number
          id_user?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          id_event?: number
          id_user?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "evt_registration_id_event_fkey"
            columns: ["id_event"]
            isOneToOne: false
            referencedRelation: "evt_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evt_registration_id_user_fkey"
            columns: ["id_user"]
            isOneToOne: false
            referencedRelation: "psn_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evt_registration_id_user_fkey"
            columns: ["id_user"]
            isOneToOne: false
            referencedRelation: "vw_user_gamification"
            referencedColumns: ["id_user"]
          },
        ]
      }
      gam_badge: {
        Row: {
          category: string
          condition_sql: string
          created_at: string | null
          description: string | null
          icon: string
          id: number
          name: string
          points: number
          tier: string | null
        }
        Insert: {
          category: string
          condition_sql: string
          created_at?: string | null
          description?: string | null
          icon: string
          id?: number
          name: string
          points?: number
          tier?: string | null
        }
        Update: {
          category?: string
          condition_sql?: string
          created_at?: string | null
          description?: string | null
          icon?: string
          id?: number
          name?: string
          points?: number
          tier?: string | null
        }
        Relationships: []
      }
      gam_user_badge: {
        Row: {
          id: number
          id_badge: number | null
          id_user: string | null
          progress: number | null
          unlocked: boolean | null
          unlocked_at: string | null
        }
        Insert: {
          id?: number
          id_badge?: number | null
          id_user?: string | null
          progress?: number | null
          unlocked?: boolean | null
          unlocked_at?: string | null
        }
        Update: {
          id?: number
          id_badge?: number | null
          id_user?: string | null
          progress?: number | null
          unlocked?: boolean | null
          unlocked_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gam_user_badge_id_user_fkey"
            columns: ["id_user"]
            isOneToOne: false
            referencedRelation: "psn_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gam_user_badge_id_user_fkey"
            columns: ["id_user"]
            isOneToOne: false
            referencedRelation: "vw_user_gamification"
            referencedColumns: ["id_user"]
          },
        ]
      }
      psn_data: {
        Row: {
          date_of_birth: string | null
          edited_at: string | null
          email: string
          id: string
          img_base64: string | null
          is_admin: boolean
          name: string
          surname: string
        }
        Insert: {
          date_of_birth?: string | null
          edited_at?: string | null
          email: string
          id?: string
          img_base64?: string | null
          is_admin?: boolean
          name: string
          surname: string
        }
        Update: {
          date_of_birth?: string | null
          edited_at?: string | null
          email?: string
          id?: string
          img_base64?: string | null
          is_admin?: boolean
          name?: string
          surname?: string
        }
        Relationships: []
      }
      psn_roles: {
        Row: {
          is_admin: boolean
          user_id: string
        }
        Insert: {
          is_admin?: boolean
          user_id: string
        }
        Update: {
          is_admin?: boolean
          user_id?: string
        }
        Relationships: []
      }
      sys_bugreport: {
        Row: {
          attachment: string | null
          category: string
          created_at: string
          description: string
          id: number
          id_user: string
          priority: string
          title: string
          url: string | null
        }
        Insert: {
          attachment?: string | null
          category: string
          created_at?: string
          description: string
          id?: number
          id_user?: string
          priority: string
          title: string
          url?: string | null
        }
        Update: {
          attachment?: string | null
          category?: string
          created_at?: string
          description?: string
          id?: number
          id_user?: string
          priority?: string
          title?: string
          url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      vw_user_badges: {
        Row: {
          description: string | null
          icon: string | null
          id: number | null
          id_user: string | null
          name: string | null
          points: number | null
          progress: number | null
          tier: string | null
          unlocked: boolean | null
          unlocked_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gam_user_badge_id_user_fkey"
            columns: ["id_user"]
            isOneToOne: false
            referencedRelation: "psn_data"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gam_user_badge_id_user_fkey"
            columns: ["id_user"]
            isOneToOne: false
            referencedRelation: "vw_user_gamification"
            referencedColumns: ["id_user"]
          },
        ]
      }
      vw_user_gamification: {
        Row: {
          id_user: string | null
          img_base64: string | null
          level: number | null
          level_color: string | null
          level_icon: string | null
          name: string | null
          surname: string | null
          total_xp: number | null
          unlocked_badges: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      update_user_badge: { Args: never; Returns: undefined }
      update_user_badges: { Args: never; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
