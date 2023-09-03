export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      productos: {
        Row: {
          cantidad: number | null
          categorias: string[] | null
          colores: string[] | null
          created_at: string
          descripcion: string | null
          id: number
          imagen: string | null
          nombre: string | null
          precio: number | null
        }
        Insert: {
          cantidad?: number | null
          categorias?: string[] | null
          colores?: string[] | null
          created_at?: string
          descripcion?: string | null
          id?: number
          imagen?: string | null
          nombre?: string | null
          precio?: number | null
        }
        Update: {
          cantidad?: number | null
          categorias?: string[] | null
          colores?: string[] | null
          created_at?: string
          descripcion?: string | null
          id?: number
          imagen?: string | null
          nombre?: string | null
          precio?: number | null
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          Ciudad: string | null
          codigo_postal: number | null
          created_at: string
          direccion: string | null
          email: string | null
          id: string
          nombre: string | null
        }
        Insert: {
          Ciudad?: string | null
          codigo_postal?: number | null
          created_at?: string
          direccion?: string | null
          email?: string | null
          id: string
          nombre?: string | null
        }
        Update: {
          Ciudad?: string | null
          codigo_postal?: number | null
          created_at?: string
          direccion?: string | null
          email?: string | null
          id?: string
          nombre?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
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
