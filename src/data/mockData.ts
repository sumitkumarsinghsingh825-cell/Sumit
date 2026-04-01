
export interface PlayerStats {
  recentPerformance: number[]; // Points in last 5 matches
  average: number; // Batting avg for BAT/WK/AR, Bowling avg for BOWL
  strikeRate: number;
  h2hRecord: {
    matches: number;
    runs?: number;
    wickets?: number;
    average: number;
  };
}

export interface Player {
  id: string;
  name: string;
  role: 'WK' | 'BAT' | 'AR' | 'BOWL';
  team: string;
  credits: number;
  points: number;
  image: string;
  stats: PlayerStats;
}

export interface Match {
  id: string;
  teamA: { name: string; short: string; logo: string };
  teamB: { name: string; short: string; logo: string };
  startTime: string;
  series: string;
  status: 'upcoming' | 'live' | 'completed';
}

export const MOCK_MATCHES: Match[] = [
  {
    id: 'ipl1',
    teamA: { name: 'Chennai Super Kings', short: 'CSK', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Chennai_Super_Kings_Logo.svg/1200px-Chennai_Super_Kings_Logo.svg.png' },
    teamB: { name: 'Royal Challengers Bangalore', short: 'RCB', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Royal_Challengers_Bangalore_Logo.svg/1200px-Royal_Challengers_Bangalore_Logo.svg.png' },
    startTime: '2h 15m',
    series: 'TATA IPL 2024',
    status: 'upcoming'
  },
  {
    id: 'ipl2',
    teamA: { name: 'Mumbai Indians', short: 'MI', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Mumbai_Indians_Logo.svg/1200px-Mumbai_Indians_Logo.svg.png' },
    teamB: { name: 'Gujarat Titans', short: 'GT', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Gujarat_Titans_Logo.svg/1200px-Gujarat_Titans_Logo.svg.png' },
    startTime: '5h 45m',
    series: 'TATA IPL 2024',
    status: 'upcoming'
  },
  {
    id: 'm1',
    teamA: { name: 'India', short: 'IND', logo: 'https://flagcdn.com/in.svg' },
    teamB: { name: 'Australia', short: 'AUS', logo: 'https://flagcdn.com/au.svg' },
    startTime: '2h 30m',
    series: 'ICC World Cup 2026',
    status: 'upcoming'
  },
  {
    id: 'm2',
    teamA: { name: 'England', short: 'ENG', logo: 'https://flagcdn.com/gb.svg' },
    teamB: { name: 'South Africa', short: 'RSA', logo: 'https://flagcdn.com/za.svg' },
    startTime: '5h 15m',
    series: 'T20 International',
    status: 'upcoming'
  },
  {
    id: 'm3',
    teamA: { name: 'Pakistan', short: 'PAK', logo: 'https://flagcdn.com/pk.svg' },
    teamB: { name: 'New Zealand', short: 'NZL', logo: 'https://flagcdn.com/nz.svg' },
    startTime: 'Live',
    series: 'Bilateral Series',
    status: 'live'
  }
];

export interface Contest {
  id: string;
  name: string;
  prizePool: string;
  entryFee: number;
  totalSpots: number;
  filledSpots: number;
  isMega?: boolean;
}

export const MOCK_CONTESTS: Contest[] = [
  { id: 'c1', name: 'Mega Contest', prizePool: '₹10 Crores', entryFee: 49, totalSpots: 1000000, filledSpots: 650000, isMega: true },
  { id: 'c2', name: 'Head-to-Head', prizePool: '₹10,000', entryFee: 5750, totalSpots: 2, filledSpots: 1 },
  { id: 'c3', name: 'Winner Takes All', prizePool: '₹1,000', entryFee: 299, totalSpots: 4, filledSpots: 2 },
  { id: 'c4', name: 'Practice Contest', prizePool: 'Glory', entryFee: 0, totalSpots: 100, filledSpots: 45 },
];

export const MOCK_PLAYERS: Player[] = [
  { 
    id: 'ipl-p1', name: 'MS Dhoni', role: 'WK', team: 'CSK', credits: 9.5, points: 450, image: 'https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320/lsci/db/PICTURES/CMS/319900/319946.png',
    stats: { recentPerformance: [45, 12, 67, 34, 89], average: 38.5, strikeRate: 135.8, h2hRecord: { matches: 12, runs: 450, average: 45.0 } }
  },
  { 
    id: 'ipl-p2', name: 'Ruturaj Gaikwad', role: 'BAT', team: 'CSK', credits: 9.0, points: 520, image: 'https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320/lsci/db/PICTURES/CMS/322600/322614.png',
    stats: { recentPerformance: [67, 89, 12, 45, 34], average: 42.1, strikeRate: 142.5, h2hRecord: { matches: 8, runs: 320, average: 40.0 } }
  },
  { 
    id: 'ipl-p3', name: 'Virat Kohli', role: 'BAT', team: 'RCB', credits: 10.5, points: 780, image: 'https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320/lsci/db/PICTURES/CMS/316600/316603.png',
    stats: { recentPerformance: [12, 45, 67, 89, 34], average: 52.8, strikeRate: 138.2, h2hRecord: { matches: 15, runs: 950, average: 63.3 } }
  },
  { 
    id: 'ipl-p4', name: 'Faf du Plessis', role: 'BAT', team: 'RCB', credits: 9.5, points: 540, image: 'https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320/lsci/db/PICTURES/CMS/316500/316584.png',
    stats: { recentPerformance: [34, 12, 89, 67, 45], average: 35.6, strikeRate: 145.1, h2hRecord: { matches: 10, runs: 350, average: 35.0 } }
  },
  { 
    id: 'p1', name: 'Virat Kohli', role: 'BAT', team: 'IND', credits: 10.5, points: 850, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Virat',
    stats: { recentPerformance: [85, 42, 110, 15, 65], average: 58.5, strikeRate: 138.2, h2hRecord: { matches: 12, runs: 640, average: 64.0 } }
  },
  { 
    id: 'p2', name: 'Steve Smith', role: 'BAT', team: 'AUS', credits: 9.5, points: 720, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Steve',
    stats: { recentPerformance: [45, 92, 30, 55, 12], average: 54.2, strikeRate: 128.5, h2hRecord: { matches: 15, runs: 780, average: 52.0 } }
  },
  { 
    id: 'p3', name: 'Jasprit Bumrah', role: 'BOWL', team: 'IND', credits: 9.0, points: 680, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasprit',
    stats: { recentPerformance: [75, 50, 90, 25, 110], average: 22.4, strikeRate: 18.5, h2hRecord: { matches: 10, wickets: 18, average: 21.2 } }
  },
  { 
    id: 'p4', name: 'Glenn Maxwell', role: 'AR', team: 'AUS', credits: 9.0, points: 640, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Glenn',
    stats: { recentPerformance: [120, 15, 45, 80, 10], average: 35.8, strikeRate: 154.6, h2hRecord: { matches: 14, runs: 420, wickets: 12, average: 30.0 } }
  },
  { 
    id: 'p5', name: 'Rishabh Pant', role: 'WK', team: 'IND', credits: 8.5, points: 590, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rishabh',
    stats: { recentPerformance: [35, 65, 20, 95, 40], average: 42.5, strikeRate: 145.2, h2hRecord: { matches: 8, runs: 310, average: 38.7 } }
  },
  { 
    id: 'p6', name: 'Pat Cummins', role: 'BOWL', team: 'AUS', credits: 9.0, points: 610, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pat',
    stats: { recentPerformance: [40, 60, 35, 75, 50], average: 24.8, strikeRate: 22.4, h2hRecord: { matches: 12, wickets: 22, average: 23.5 } }
  },
  { 
    id: 'p7', name: 'Hardik Pandya', role: 'AR', team: 'IND', credits: 9.0, points: 630, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hardik',
    stats: { recentPerformance: [55, 30, 85, 45, 20], average: 32.4, strikeRate: 148.5, h2hRecord: { matches: 11, runs: 280, wickets: 10, average: 28.0 } }
  },
  { 
    id: 'p8', name: 'David Warner', role: 'BAT', team: 'AUS', credits: 9.0, points: 600, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    stats: { recentPerformance: [15, 110, 40, 25, 85], average: 45.2, strikeRate: 142.8, h2hRecord: { matches: 18, runs: 820, average: 45.5 } }
  },
  { 
    id: 'p9', name: 'KL Rahul', role: 'WK', team: 'IND', credits: 8.5, points: 580, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KL',
    stats: { recentPerformance: [60, 25, 45, 70, 35], average: 48.5, strikeRate: 135.4, h2hRecord: { matches: 10, runs: 450, average: 45.0 } }
  },
  { 
    id: 'p10', name: 'Mitchell Starc', role: 'BOWL', team: 'AUS', credits: 9.0, points: 620, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mitchell',
    stats: { recentPerformance: [95, 30, 65, 40, 80], average: 21.5, strikeRate: 19.2, h2hRecord: { matches: 13, wickets: 25, average: 20.4 } }
  },
  { 
    id: 'p11', name: 'Ravindra Jadeja', role: 'AR', team: 'IND', credits: 9.0, points: 650, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ravindra',
    stats: { recentPerformance: [45, 55, 70, 30, 60], average: 34.2, strikeRate: 125.8, h2hRecord: { matches: 16, runs: 380, wickets: 18, average: 31.6 } }
  },
  { 
    id: 'p12', name: 'Rohit Sharma', role: 'BAT', team: 'IND', credits: 10.0, points: 810, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit',
    stats: { recentPerformance: [105, 20, 65, 45, 90], average: 49.8, strikeRate: 140.5, h2hRecord: { matches: 20, runs: 950, average: 47.5 } }
  },
  { 
    id: 'p13', name: 'Travis Head', role: 'BAT', team: 'AUS', credits: 9.0, points: 690, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Travis',
    stats: { recentPerformance: [135, 40, 15, 85, 30], average: 41.2, strikeRate: 158.4, h2hRecord: { matches: 9, runs: 410, average: 45.5 } }
  },
  { 
    id: 'p14', name: 'Mohammed Shami', role: 'BOWL', team: 'IND', credits: 9.0, points: 640, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shami',
    stats: { recentPerformance: [80, 45, 115, 20, 55], average: 23.5, strikeRate: 20.8, h2hRecord: { matches: 11, wickets: 20, average: 22.8 } }
  },
  { 
    id: 'p15', name: 'Adam Zampa', role: 'BOWL', team: 'AUS', credits: 8.5, points: 570, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Adam',
    stats: { recentPerformance: [65, 35, 40, 90, 25], average: 28.4, strikeRate: 24.5, h2hRecord: { matches: 14, wickets: 19, average: 26.5 } }
  },
  { 
    id: 'p16', name: 'Josh Hazlewood', role: 'BOWL', team: 'AUS', credits: 8.5, points: 580, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Josh',
    stats: { recentPerformance: [50, 40, 60, 30, 70], average: 25.2, strikeRate: 23.1, h2hRecord: { matches: 10, wickets: 15, average: 25.0 } }
  },
  { 
    id: 'p17', name: 'Axar Patel', role: 'AR', team: 'IND', credits: 8.5, points: 550, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Axar',
    stats: { recentPerformance: [30, 45, 25, 60, 80], average: 28.5, strikeRate: 132.4, h2hRecord: { matches: 7, runs: 120, wickets: 8, average: 24.0 } }
  },
  { 
    id: 'p18', name: 'Alex Carey', role: 'WK', team: 'AUS', credits: 8.0, points: 510, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    stats: { recentPerformance: [25, 30, 55, 15, 40], average: 32.8, strikeRate: 122.5, h2hRecord: { matches: 12, runs: 280, average: 28.0 } }
  },
];
