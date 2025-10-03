const supabase = require('../config/supabase');

class DatabaseService {
  constructor(tableName = 'tasks') {
    this.tableName = tableName;
  }

  // Set user token for authenticated operations
  setUserToken(token) {
    this.userToken = token;
  }

  // Get authenticated supabase client
  getAuthenticatedClient() {
    if (this.userToken) {
      // Create a new client with the user's token
      const { createClient } = require('@supabase/supabase-js');
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_ANON_KEY;
      
      const authenticatedClient = createClient(supabaseUrl, supabaseKey, {
        global: {
          headers: {
            Authorization: `Bearer ${this.userToken}`
          }
        }
      });
      return authenticatedClient;
    }
    return supabase;
  }

  // Get all records
  async getAll() {
    try {
      const client = this.getAuthenticatedClient();
      const { data, error } = await client
        .from(this.tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Get record by ID
  async getById(id) {
    try {
      const client = this.getAuthenticatedClient();
      const { data, error } = await client
        .from(this.tableName)
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Create new record
  async create(record) {
    try {
      const client = this.getAuthenticatedClient();
      const { data, error } = await client
        .from(this.tableName)
        .insert([record])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Update record by ID
  async update(id, updates) {
    try {
      const client = this.getAuthenticatedClient();
      const { data, error } = await client
        .from(this.tableName)
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Delete record by ID
  async delete(id) {
    try {
      const client = this.getAuthenticatedClient();
      const { data, error } = await client
        .from(this.tableName)
        .delete()
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }

  // Get records with pagination
  async getPaginated(page = 1, limit = 10) {
    try {
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const client = this.getAuthenticatedClient();
      const { data, error, count } = await client
        .from(this.tableName)
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;
      return { data, error: null, count };
    } catch (error) {
      return { data: null, error, count: 0 };
    }
  }

  // Search records
  async search(searchTerm, searchColumns = ['title', 'description']) {
    try {
      const client = this.getAuthenticatedClient();
      let query = client.from(this.tableName).select('*');
      
      // Build OR conditions for search columns
      const orConditions = searchColumns.map(column => `${column}.ilike.%${searchTerm}%`);
      query = query.or(orConditions.join(','));

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
}

module.exports = DatabaseService;


