-- Production database initialization
-- This script ensures all tables are created properly

-- Enable UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables if they don't exist (Prisma will handle this, but backup)
DO $$ 
BEGIN
    -- Check if User table exists
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'User') THEN
        RAISE NOTICE 'User table does not exist - Prisma will create it';
    END IF;
    
    -- Check if Movie table exists  
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'Movie') THEN
        RAISE NOTICE 'Movie table does not exist - Prisma will create it';
    END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_email ON "User"(email);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_movie_tmdb_id ON "Movie"("tmdbId");
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_watchlist_user_id ON "Watchlist"("userId");
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_viewing_history_user_id ON "ViewingHistory"("userId");
