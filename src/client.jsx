import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ivdkbtfxpwfusinunqgn.supabase.co"

const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2ZGtidGZ4cHdmdXNpbnVucWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc4ODUyOTcsImV4cCI6MTk5MzQ2MTI5N30.yg4TrrSwagWJ9i9s2DB8m4Q-39r8Fi6BQVV9W0-ozjw"


export const supabase = createClient(supabaseUrl, supabaseAnonKey)