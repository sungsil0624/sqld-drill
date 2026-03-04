import { supabase } from './supabase'

export const db = {
  async getQuestions() {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('id', { ascending: true })
    
    if (error) throw error
    return data || []
  }
}