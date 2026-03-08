-- Initial Database Schema for ANCA Chess Platform

-- Creating players table
CREATE TABLE players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    fide_id TEXT UNIQUE,
    rating INTEGER,
    district TEXT,
    title TEXT,
    photo TEXT,
    dob DATE,
    club TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Creating tournaments table
CREATE TABLE tournaments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    location TEXT,
    start_date DATE,
    end_date DATE,
    category TEXT,
    registration_link TEXT,
    results_link TEXT,
    organizer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Creating news table
CREATE TABLE news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    image TEXT,
    author TEXT,
    published_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Creating downloads table
CREATE TABLE downloads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    file_url TEXT NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Creating gallery table
CREATE TABLE gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    album TEXT NOT NULL,
    image_url TEXT NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS) policies

-- Players: Anyone can read, only authenticated users can write
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON players FOR SELECT USING (true);
CREATE POLICY "Users can insert players" ON players FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update players" ON players FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Users can delete players" ON players FOR DELETE USING (auth.role() = 'authenticated');

-- Tournaments: Anyone can read, only authenticated users can write
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tournaments are viewable by everyone." ON tournaments FOR SELECT USING (true);
CREATE POLICY "Users can insert tournaments" ON tournaments FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update tournaments" ON tournaments FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Users can delete tournaments" ON tournaments FOR DELETE USING (auth.role() = 'authenticated');

-- News: Anyone can read, only authenticated users can write
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "News are viewable by everyone." ON news FOR SELECT USING (true);
CREATE POLICY "Users can insert news" ON news FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update news" ON news FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Users can delete news" ON news FOR DELETE USING (auth.role() = 'authenticated');

-- Downloads: Anyone can read, only authenticated users can write
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Downloads are viewable by everyone." ON downloads FOR SELECT USING (true);
CREATE POLICY "Users can insert downloads" ON downloads FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update downloads" ON downloads FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Users can delete downloads" ON downloads FOR DELETE USING (auth.role() = 'authenticated');

-- Gallery: Anyone can read, only authenticated users can write
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Gallery is viewable by everyone." ON gallery FOR SELECT USING (true);
CREATE POLICY "Users can insert into gallery" ON gallery FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update gallery" ON gallery FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Users can delete from gallery" ON gallery FOR DELETE USING (auth.role() = 'authenticated');
