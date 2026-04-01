import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  User, 
  Wallet, 
  Bell, 
  ChevronLeft, 
  Info, 
  CheckCircle2, 
  Users,
  ShieldCheck,
  Zap,
  Layout,
  X,
  Star,
  Award,
  Gift,
  Share2,
  Camera,
  Settings,
  LogOut,
  Mail,
  Phone,
  MapPin,
  HelpCircle,
  MessageSquare,
  Plus,
  Minus,
  Download,
  Smartphone
} from 'lucide-react';
import { MOCK_MATCHES, MOCK_PLAYERS, MOCK_CONTESTS, Match, Player, Contest } from './data/mockData';
import { POINTS_SYSTEM } from './data/pointsData';
import { MatchCard } from './components/MatchCard';
import { PlayerRow } from './components/PlayerRow';
import { ContestCard } from './components/ContestCard';
import { CaptainRow } from './components/CaptainRow';
import { PlayerStatsModal } from './components/PlayerStatsModal';

type View = 'home' | 'contests' | 'team-creation' | 'captain-selection' | 'success' | 'points-system' | 'live-match' | 'my-matches' | 'winners' | 'refer-earn' | 'wallet' | 'profile' | 'notifications' | 'support' | 'privacy-policy' | 'terms-conditions';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [activeTab, setActiveTab] = useState<Player['role']>('WK');
  const [captainId, setCaptainId] = useState<string | null>(null);
  const [viceCaptainId, setViceCaptainId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [statsPlayer, setStatsPlayer] = useState<Player | null>(null);
  const [livePoints, setLivePoints] = useState<Record<string, number>>({});
  const [matchStatus, setMatchStatus] = useState<'Upcoming' | 'Live' | 'Completed'>('Upcoming');
  const [joinedMatches, setJoinedMatches] = useState<Match[]>([]);
  const [wallet, setWallet] = useState({
    total: 1250,
    winnings: 450,
    bonus: 800,
    transactions: [
      { id: 't1', type: 'Win', amount: 450, date: 'Mar 30, 2024', status: 'Success', match: 'CSK vs RCB' },
      { id: 't2', type: 'Entry Fee', amount: -49, date: 'Mar 29, 2024', status: 'Success', match: 'MI vs GT' },
      { id: 't3', type: 'Added', amount: 500, date: 'Mar 28, 2024', status: 'Success' },
      { id: 't4', type: 'Referral Bonus', amount: 500, date: 'Mar 27, 2024', status: 'Success' },
    ]
  });
  const [userProfile, setUserProfile] = useState({
    name: 'Sumit Singh',
    email: 'sumit.singh@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sumit'
  });
  const [notifications, setNotifications] = useState([
    { id: 'n1', title: 'Match Starting Soon!', message: 'CSK vs RCB starts in 30 minutes. Create your team now!', time: '10m ago', type: 'match', unread: true },
    { id: 'n2', title: 'Congratulations!', message: 'You won ₹450 in the Mega Contest!', time: '2h ago', type: 'win', unread: true },
    { id: 'n3', title: 'Referral Bonus', message: 'Your friend joined! ₹500 added to your wallet.', time: '1d ago', type: 'wallet', unread: false },
    { id: 'n4', title: 'New Contest Live', message: 'MI vs GT Mega Contest is now open with ₹10 Crore prize pool.', time: '2d ago', type: 'contest', unread: false },
  ]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showDownloadBanner, setShowDownloadBanner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const totalCredits = 100;
  const usedCredits = useMemo(() => 
    selectedPlayers.reduce((sum, p) => sum + p.credits, 0), 
  [selectedPlayers]);

  // Live Match Simulation
  useEffect(() => {
    if (currentView !== 'live-match') return;

    const interval = setInterval(() => {
      setLivePoints(prev => {
        const next = { ...prev };
        // Randomly pick a player from selected team to give points
        if (selectedPlayers.length > 0) {
          const randomPlayer = selectedPlayers[Math.floor(Math.random() * selectedPlayers.length)];
          const eventType = Math.random();
          
          let pointsToAdd = 0;
          if (eventType > 0.8) pointsToAdd = 25; // Wicket
          else if (eventType > 0.5) pointsToAdd = 4; // Boundary
          else pointsToAdd = 1; // Single

          const currentVal = next[randomPlayer.id] || 0;
          next[randomPlayer.id] = currentVal + pointsToAdd;
        }
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentView, selectedPlayers]);

  const handleMatchSelect = (match: Match) => {
    setSelectedMatch(match);
    setCurrentView('contests');
  };

  const togglePlayer = (player: Player) => {
    if (selectedPlayers.find(p => p.id === player.id)) {
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
      if (captainId === player.id) setCaptainId(null);
      if (viceCaptainId === player.id) setViceCaptainId(null);
    } else {
      if (selectedPlayers.length < 11 && (usedCredits + player.credits) <= totalCredits) {
        setSelectedPlayers([...selectedPlayers, player]);
      }
    }
  };

  const filteredPlayers = MOCK_PLAYERS.filter(p => p.role === activeTab);

  const roleCounts = useMemo(() => {
    const counts = { WK: 0, BAT: 0, AR: 0, BOWL: 0 };
    selectedPlayers.forEach(p => counts[p.role]++);
    return counts;
  }, [selectedPlayers]);

  const renderHome = () => (
    <div className="flex flex-col gap-4 p-4 pb-24">
      {/* Header with Wallet */}
      <div className="flex items-center justify-between mb-2">
        <div 
          onClick={() => setCurrentView('profile')}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
            <img src={userProfile.image} alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Welcome back,</p>
            <p className="text-sm font-black text-slate-800">{userProfile.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentView('notifications')}
            className="relative p-2 bg-white rounded-xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-colors"
          >
            <Bell size={18} className="text-slate-600" />
            {notifications.some(n => n.unread) && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            )}
          </button>
          <button 
            onClick={() => setCurrentView('wallet')}
            className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-colors"
          >
            <Wallet size={16} className="text-green-600" />
            <span className="text-xs font-black text-slate-800">₹{wallet.total}</span>
          </button>
        </div>
      </div>

      {/* Download App Banner */}
      <AnimatePresence>
        {showDownloadBanner && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4"
          >
            <div className="bg-slate-900 rounded-2xl p-4 flex items-center justify-between relative overflow-hidden">
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                  <Smartphone size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white tracking-tight">Download KHELLO App</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Get better experience & rewards</p>
                </div>
              </div>
              <div className="flex items-center gap-2 relative z-10">
                <button 
                  onClick={() => {
                    alert("App download link sent to your phone!");
                    setShowDownloadBanner(false);
                  }}
                  className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-500/20"
                >
                  Download
                </button>
                <button 
                  onClick={() => setShowDownloadBanner(false)}
                  className="p-1.5 text-slate-500 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-green-500/10 rounded-full blur-2xl" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Refer & Earn Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setCurrentView('refer-earn')}
        className="bg-gradient-to-r from-green-600 to-green-500 p-4 rounded-2xl text-white shadow-lg shadow-green-200 relative overflow-hidden cursor-pointer"
      >
        <div className="relative z-10">
          <h3 className="text-lg font-black tracking-tight mb-1">Refer & Earn ₹500</h3>
          <p className="text-[10px] font-bold text-green-100 uppercase tracking-widest">Invite your friends and get cash bonus</p>
          <button className="mt-3 px-4 py-1.5 bg-white text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">
            Refer Now
          </button>
        </div>
        <Gift className="absolute -right-4 -bottom-4 w-24 h-24 text-white/20 rotate-12" />
      </motion.div>

      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-slate-800">Upcoming Matches</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              if (selectedPlayers.length === 0) {
                // For demo, if no team, select first match and some players
                setSelectedMatch(MOCK_MATCHES[0]);
                setSelectedPlayers(MOCK_PLAYERS.slice(0, 11));
                setCaptainId(MOCK_PLAYERS[0].id);
                setViceCaptainId(MOCK_PLAYERS[1].id);
              }
              setCurrentView('live-match');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 rounded-full text-green-700 text-xs font-bold hover:bg-green-200 transition-colors"
          >
            <Zap size={14} />
            Live Demo
          </button>
          <button 
            onClick={() => setCurrentView('points-system')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full text-slate-600 text-xs font-bold hover:bg-slate-200 transition-colors"
          >
            <Info size={14} />
            Points
          </button>
        </div>
      </div>
      
      {MOCK_MATCHES.map(match => (
        <MatchCard 
          key={match.id} 
          match={match} 
          onClick={() => handleMatchSelect(match)} 
        />
      ))}
    </div>
  );

  const renderContests = () => (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-slate-900 text-white p-4 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentView('home')} className="p-1">
            <ChevronLeft size={24} />
          </button>
          <div>
            <p className="text-sm font-bold">{selectedMatch?.teamA.short} vs {selectedMatch?.teamB.short}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{selectedMatch?.startTime} Left</p>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Contests</h3>
          <button className="text-[10px] font-bold text-green-600 uppercase">View All</button>
        </div>
        {MOCK_CONTESTS.map(contest => (
          <ContestCard 
            key={contest.id} 
            contest={contest} 
            onJoin={() => setCurrentView('team-creation')} 
          />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 flex justify-center z-30">
        <button 
          onClick={() => setCurrentView('team-creation')}
          className="w-full py-3 bg-green-600 text-white rounded-lg font-bold shadow-lg shadow-green-100"
        >
          Create Team
        </button>
      </div>
    </div>
  );

  const renderTeamCreation = () => (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white p-4 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setCurrentView('contests')} className="p-1">
            <ChevronLeft size={24} />
          </button>
          <div className="text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Create Team</p>
            <p className="text-sm font-bold">{selectedMatch?.teamA.short} vs {selectedMatch?.teamB.short}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
            <Info size={16} />
          </div>
        </div>

        <div className="flex justify-between items-end gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-[10px] font-bold mb-1">
              <span>PLAYERS</span>
              <span>{selectedPlayers.length}/11</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${(selectedPlayers.length / 11) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-[10px] font-bold mb-1">
              <span>CREDITS LEFT</span>
              <span>{(totalCredits - usedCredits).toFixed(1)}</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${((totalCredits - usedCredits) / totalCredits) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Role Tabs */}
      <div className="flex bg-white border-b border-slate-200 sticky top-[116px] z-10">
        {(['WK', 'BAT', 'AR', 'BOWL'] as const).map(role => (
          <button
            key={role}
            onClick={() => setActiveTab(role)}
            className={`flex-1 py-3 text-xs font-bold transition-all relative ${
              activeTab === role ? 'text-green-600' : 'text-slate-500'
            }`}
          >
            {role} ({roleCounts[role]})
            {activeTab === role && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
              />
            )}
          </button>
        ))}
      </div>

      {/* Player List */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="p-3 bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Pick {activeTab === 'WK' ? '1-4' : activeTab === 'BAT' ? '3-6' : activeTab === 'AR' ? '1-4' : '3-6'} {activeTab}s
        </div>
        {filteredPlayers.map(player => (
          <PlayerRow 
            key={player.id}
            player={player}
            isSelected={!!selectedPlayers.find(p => p.id === player.id)}
            onSelect={togglePlayer}
            onShowStats={(p) => setStatsPlayer(p)}
            disabled={selectedPlayers.length >= 11}
          />
        ))}
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 flex gap-3 z-30">
        <button 
          onClick={() => setShowPreview(true)}
          className="flex-1 py-3 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 flex items-center justify-center gap-2"
        >
          <Layout size={18} />
          Preview
        </button>
        <button 
          onClick={() => selectedPlayers.length === 11 && setCurrentView('captain-selection')}
          disabled={selectedPlayers.length !== 11}
          className={`flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            selectedPlayers.length === 11 
              ? 'bg-green-600 text-white shadow-lg shadow-green-200' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <ShieldCheck size={18} />
          Next
        </button>
      </div>
    </div>
  );

  const renderCaptainSelection = () => (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-slate-900 text-white p-4 sticky top-0 z-20">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => setCurrentView('team-creation')} className="p-1">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest">Choose Captain & VC</h3>
            <p className="text-[10px] text-slate-400 font-bold">C gets 2x points, VC gets 1.5x points</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="flex justify-between p-3 bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          <span>PLAYER</span>
          <div className="flex gap-8 pr-4">
            <span>C BY %</span>
            <span>VC BY %</span>
          </div>
        </div>
        {selectedPlayers.map(player => (
          <CaptainRow 
            key={player.id}
            player={player}
            isCaptain={captainId === player.id}
            isViceCaptain={viceCaptainId === player.id}
            onSelectCaptain={(id) => {
              setCaptainId(id);
              if (viceCaptainId === id) setViceCaptainId(null);
            }}
            onSelectViceCaptain={(id) => {
              setViceCaptainId(id);
              if (captainId === id) setCaptainId(null);
            }}
          />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 z-30">
        <button 
          onClick={handleSaveTeam}
          disabled={!captainId || !viceCaptainId}
          className={`w-full py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            captainId && viceCaptainId 
              ? 'bg-green-600 text-white shadow-lg shadow-green-200' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          Save Team
        </button>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12 }}
        className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"
      >
        <CheckCircle2 size={48} />
      </motion.div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Team Created!</h2>
      <p className="text-slate-500 mb-8">Your fantasy team for {selectedMatch?.teamA.short} vs {selectedMatch?.teamB.short} is ready. Captain: {selectedPlayers.find(p => p.id === captainId)?.name}</p>
      
      <div className="w-full space-y-3">
        <button 
          onClick={() => {
            setSelectedPlayers([]);
            setCaptainId(null);
            setViceCaptainId(null);
            setCurrentView('home');
          }}
          className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold"
        >
          Join More Contests
        </button>
        <button 
          onClick={() => setCurrentView('home')}
          className="w-full py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold"
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  const renderPointsSystem = () => (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-slate-900 text-white p-4 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentView('home')} className="p-1">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-bold">Fantasy Points System</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-6 no-scrollbar">
        {POINTS_SYSTEM.map((category, idx) => (
          <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-100">
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">{category.title}</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {category.items.map((item, i) => (
                <div key={i} className="px-4 py-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-slate-700">{item.label}</p>
                    {item.description && <p className="text-[10px] text-slate-400 font-medium">{item.description}</p>}
                  </div>
                  <span className="text-sm font-black text-green-600">{item.points}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
              <Info size={16} />
            </div>
            <p className="text-xs text-green-800 font-medium leading-relaxed">
              Points are calculated based on the official scorecard provided by the data provider. Any changes to the scorecard after the match is marked as 'Completed' will not be reflected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLiveMatch = () => {
    const totalPoints = selectedPlayers.reduce((sum, p) => {
      let pPoints = livePoints[p.id] || 0;
      if (p.id === captainId) pPoints *= 2;
      if (p.id === viceCaptainId) pPoints *= 1.5;
      return sum + pPoints;
    }, 0);

    return (
      <div className="flex flex-col h-full bg-slate-50">
        <div className="bg-slate-900 text-white p-4 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentView('home')} className="p-1">
              <ChevronLeft size={24} />
            </button>
            <div>
              <p className="text-sm font-bold">{selectedMatch?.teamA.short} vs {selectedMatch?.teamB.short}</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider">Live Tracking</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto no-scrollbar pb-24">
          {/* Score Summary */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Total Points</span>
              <span className="text-2xl font-black text-green-600 tracking-tighter">{Math.floor(totalPoints)}</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                className="h-full bg-green-500"
              />
            </div>
          </div>

          {/* Player Points List */}
          <div className="space-y-2">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Player Performance</h3>
            {selectedPlayers.map(player => {
              const basePoints = livePoints[player.id] || 0;
              const isC = player.id === captainId;
              const isVC = player.id === viceCaptainId;
              const multiplier = isC ? 2 : (isVC ? 1.5 : 1);
              const finalPoints = basePoints * multiplier;

              return (
                <div key={player.id} className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={player.image} alt="" className="w-10 h-10 rounded-full object-cover bg-slate-100" />
                      {(isC || isVC) && (
                        <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black border-2 border-white ${isC ? 'bg-yellow-500 text-white' : 'bg-slate-400 text-white'}`}>
                          {isC ? 'C' : 'VC'}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{player.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{player.team} • {player.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-800">{Math.floor(finalPoints)}</p>
                    {multiplier > 1 && <p className="text-[9px] text-green-500 font-bold uppercase">{multiplier}x Points</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const handleSaveTeam = () => {
    if (captainId && viceCaptainId) {
      if (selectedMatch && !joinedMatches.find(m => m.id === selectedMatch.id)) {
        setJoinedMatches(prev => [...prev, selectedMatch]);
      }
      setCurrentView('success');
    }
  };

  const renderMyMatches = () => (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-slate-900 text-white p-4 sticky top-0 z-20">
        <h2 className="text-lg font-bold">My Matches</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-4 no-scrollbar">
        {joinedMatches.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <Trophy size={48} className="mb-4 opacity-20" />
            <p className="text-sm font-bold">No matches joined yet!</p>
            <button 
              onClick={() => setCurrentView('home')}
              className="mt-4 text-green-600 text-xs font-bold uppercase tracking-widest"
            >
              Join a Contest
            </button>
          </div>
        ) : (
          joinedMatches.map(match => (
            <div key={match.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <div className="p-4 border-b border-slate-50 flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{match.series}</span>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[8px] font-bold rounded-full uppercase">Joined</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={match.teamA.logo} alt="" className="w-10 h-10 object-contain" />
                  <span className="font-black text-slate-800">{match.teamA.short}</span>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400">VS</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-black text-slate-800">{match.teamB.short}</span>
                  <img src={match.teamB.logo} alt="" className="w-10 h-10 object-contain" />
                </div>
              </div>
              <div className="bg-slate-50 p-3 flex justify-between items-center">
                <button 
                  onClick={() => {
                    setSelectedMatch(match);
                    setCurrentView('live-match');
                  }}
                  className="text-xs font-bold text-green-600 flex items-center gap-1"
                >
                  <Zap size={14} />
                  View Live
                </button>
                <span className="text-[10px] font-bold text-slate-400">1 Team Created</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderWinners = () => (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-slate-900 text-white p-4 sticky top-0 z-20">
        <h2 className="text-lg font-bold">Winners</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-4 no-scrollbar">
        {[
          { name: 'Rahul S.', prize: '₹1,00,000', rank: 1, match: 'CSK vs RCB', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul' },
          { name: 'Sumit K.', prize: '₹50,000', rank: 2, match: 'MI vs GT', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sumit' },
          { name: 'Anjali P.', prize: '₹25,000', rank: 3, match: 'IND vs AUS', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali' },
          { name: 'Vikram R.', prize: '₹10,000', rank: 4, match: 'CSK vs RCB', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram' },
        ].map((winner, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src={winner.image} alt="" className="w-12 h-12 rounded-full bg-slate-100" />
                <div className="absolute -top-1 -left-1 w-6 h-6 bg-yellow-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                  #{winner.rank}
                </div>
              </div>
              <div>
                <p className="font-bold text-slate-800">{winner.name}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{winner.match}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-black text-green-600 tracking-tighter">{winner.prize}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Won</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReferEarn = () => (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-slate-900 text-white p-4 sticky top-0 z-20 flex items-center gap-4">
        <button onClick={() => setCurrentView('home')} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-bold">Refer & Earn</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24 flex flex-col items-center text-center">
        <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Gift size={64} className="text-green-600" />
        </div>
        
        <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">Invite Friends & Earn</h3>
        <p className="text-slate-500 text-sm mb-8 px-4">
          Share your referral code with friends. When they join their first contest, you both get <span className="text-green-600 font-bold">₹500 Cash Bonus</span>.
        </p>

        <div className="w-full bg-white p-6 rounded-3xl border-2 border-dashed border-slate-200 mb-8">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Your Referral Code</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-3xl font-black text-slate-800 tracking-wider">KHELLO500</span>
            <button className="p-2 bg-slate-100 rounded-lg text-slate-600">
              <Layout size={20} />
            </button>
          </div>
        </div>

        <button className="w-full py-4 bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-green-200 flex items-center justify-center gap-3 mb-4">
          <Share2 size={20} />
          Invite Friends
        </button>

        <div className="grid grid-cols-3 gap-4 w-full mt-8">
          {[
            { label: 'Invite', icon: <Users size={20} /> },
            { label: 'Friend Joins', icon: <CheckCircle2 size={20} /> },
            { label: 'Get Bonus', icon: <Wallet size={20} /> },
          ].map((step, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                {step.icon}
              </div>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWallet = () => (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-slate-900 text-white p-4 sticky top-0 z-20 flex items-center gap-4">
        <button onClick={() => setCurrentView('home')} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-bold">My Wallet</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-6 no-scrollbar">
        {/* Balance Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Balance</p>
          <h3 className="text-4xl font-black text-slate-800 mb-6 tracking-tighter">₹{wallet.total}</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-slate-50 rounded-2xl">
              <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Winnings</p>
              <p className="text-lg font-black text-slate-800 tracking-tight">₹{wallet.winnings}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl">
              <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Cash Bonus</p>
              <p className="text-lg font-black text-slate-800 tracking-tight">₹{wallet.bonus}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-green-200">
              Add Cash
            </button>
            <button className="flex-1 py-3 bg-white text-green-600 border border-green-600 rounded-xl font-bold text-sm">
              Withdraw
            </button>
          </div>
        </div>

        {/* Transactions */}
        <div>
          <h4 className="text-sm font-black text-slate-800 mb-4 px-2">Recent Transactions</h4>
          <div className="space-y-3">
            {wallet.transactions.map(t => (
              <div key={t.id} className="bg-white p-4 rounded-2xl border border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    t.amount > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {t.amount > 0 ? <Award size={20} /> : <Wallet size={20} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{t.type}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                      {t.date} {t.match ? `• ${t.match}` : ''}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-black tracking-tight ${
                    t.amount > 0 ? 'text-green-600' : 'text-slate-800'
                  }`}>
                    {t.amount > 0 ? '+' : ''}₹{Math.abs(t.amount)}
                  </p>
                  <p className="text-[9px] text-green-500 font-bold uppercase">{t.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-slate-900 text-white p-4 sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentView('home')} className="p-1">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-bold">Profile Settings</h2>
        </div>
        <button className="p-2 bg-white/10 rounded-full">
          <Settings size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-8 no-scrollbar">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-32 h-32 bg-slate-200 rounded-full border-4 border-white shadow-xl overflow-hidden">
              <img src={userProfile.image} alt="" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-green-600 text-white rounded-full border-4 border-white shadow-lg">
              <Camera size={20} />
            </button>
          </div>
          <h3 className="mt-4 text-xl font-black text-slate-800 tracking-tight">{userProfile.name}</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Member since 2024</p>
        </div>

        {/* Details Form */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                <User size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Full Name</p>
                <input 
                  type="text" 
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                  className="w-full text-sm font-bold text-slate-800 bg-transparent outline-none"
                />
              </div>
            </div>
            <div className="h-px bg-slate-50 w-full" />
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                <Mail size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                <input 
                  type="email" 
                  value={userProfile.email}
                  onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                  className="w-full text-sm font-bold text-slate-800 bg-transparent outline-none"
                />
              </div>
            </div>
            <div className="h-px bg-slate-50 w-full" />
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                <Phone size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</p>
                <input 
                  type="text" 
                  value={userProfile.phone}
                  onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                  className="w-full text-sm font-bold text-slate-800 bg-transparent outline-none"
                />
              </div>
            </div>
            <div className="h-px bg-slate-50 w-full" />
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                <MapPin size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Location</p>
                <input 
                  type="text" 
                  value={userProfile.location}
                  onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
                  className="w-full text-sm font-bold text-slate-800 bg-transparent outline-none"
                />
              </div>
            </div>
          </div>

          <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-slate-200">
            Save Changes
          </button>
        </div>

        {/* Account Actions */}
        <div className="space-y-3">
          <button className="w-full p-4 bg-white rounded-2xl border border-slate-100 flex items-center justify-between text-slate-600">
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} />
              <span className="text-sm font-bold">KYC Verification</span>
            </div>
            <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase">Verified</span>
          </button>
          <button 
            onClick={() => alert("App download link sent to your phone!")}
            className="w-full p-4 bg-white rounded-2xl border border-slate-100 flex items-center justify-between text-slate-600"
          >
            <div className="flex items-center gap-3">
              <Download size={20} />
              <span className="text-sm font-bold">Download App</span>
            </div>
            <ChevronLeft size={16} className="rotate-180 text-slate-300" />
          </button>
          <button 
            onClick={() => setCurrentView('support')}
            className="w-full p-4 bg-white rounded-2xl border border-slate-100 flex items-center justify-between text-slate-600"
          >
            <div className="flex items-center gap-3">
              <HelpCircle size={20} />
              <span className="text-sm font-bold">Help & Support</span>
            </div>
            <ChevronLeft size={16} className="rotate-180 text-slate-300" />
          </button>
          <button className="w-full p-4 bg-white rounded-2xl border border-slate-100 flex items-center justify-between text-red-600">
            <div className="flex items-center gap-3">
              <LogOut size={20} />
              <span className="text-sm font-bold">Logout</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-slate-900 text-white p-4 sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentView('home')} className="p-1">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-lg font-bold">Notifications</h2>
        </div>
        <button 
          onClick={() => setNotifications(notifications.map(n => ({...n, unread: false})))}
          className="text-[10px] font-black uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-full"
        >
          Mark all read
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-3 no-scrollbar">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <Bell size={48} className="mb-4 opacity-20" />
            <p className="text-sm font-bold uppercase tracking-widest">No notifications yet</p>
          </div>
        ) : (
          notifications.map(n => (
            <div 
              key={n.id} 
              className={`p-4 rounded-2xl border transition-all ${
                n.unread ? 'bg-white border-green-100 shadow-sm' : 'bg-slate-50 border-slate-100 opacity-70'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  n.type === 'win' ? 'bg-yellow-100 text-yellow-600' :
                  n.type === 'match' ? 'bg-green-100 text-green-600' :
                  n.type === 'wallet' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                }`}>
                  {n.type === 'win' ? <Award size={20} /> :
                   n.type === 'match' ? <Zap size={20} /> :
                   n.type === 'wallet' ? <Wallet size={20} /> : <Info size={20} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-black text-slate-800 tracking-tight">{n.title}</h4>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{n.message}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-slate-900 text-white p-4 sticky top-0 z-20 flex items-center gap-4">
        <button onClick={() => setCurrentView('profile')} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-bold">Help & Support</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-6 no-scrollbar">
        {/* Contact Options */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
              <MessageSquare size={24} />
            </div>
            <p className="text-xs font-black text-slate-800">Chat with Us</p>
            <p className="text-[10px] text-slate-400 font-bold">24/7 Support</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
              <Mail size={24} />
            </div>
            <p className="text-xs font-black text-slate-800">Email Us</p>
            <p className="text-[10px] text-slate-400 font-bold">Response in 2h</p>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {[
              { q: "How to create a team?", a: "Go to Home, select a match, and pick 11 players within 100 credits." },
              { q: "How are points calculated?", a: "Points are based on real-life performance. Check the 'Points' section for details." },
              { q: "How to withdraw winnings?", a: "Go to Wallet, click Withdraw, and enter your amount. KYC must be verified." },
              { q: "Is my money safe?", a: "Yes, KHELLO uses secure payment gateways and follows all legal guidelines." },
              { q: "How to add app to Home Screen?", a: "Android: Open Chrome menu (3 dots) > 'Add to Home Screen'. iOS: Open Safari > Share icon > 'Add to Home Screen'." }
            ].map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
              >
                <button 
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <span className="text-sm font-bold text-slate-700">{faq.q}</span>
                  {expandedFaq === idx ? <Minus size={16} className="text-slate-400" /> : <Plus size={16} className="text-slate-400" />}
                </button>
                <AnimatePresence>
                  {expandedFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4"
                    >
                      <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-50 pt-3">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div className="space-y-2">
          <div className="bg-white p-4 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Smartphone size={16} className="text-green-600" />
              Installation Guide
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">For Android (Chrome)</p>
                <ol className="text-xs text-slate-600 space-y-1 list-decimal ml-4 font-bold">
                  <li>Tap the three dots (⋮) in the top right.</li>
                  <li>Select "Add to Home Screen".</li>
                  <li>Confirm by clicking "Add".</li>
                </ol>
              </div>
              <div className="h-px bg-slate-50" />
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">For iPhone (Safari)</p>
                <ol className="text-xs text-slate-600 space-y-1 list-decimal ml-4 font-bold">
                  <li>Tap the Share icon (square with arrow).</li>
                  <li>Scroll down and tap "Add to Home Screen".</li>
                  <li>Tap "Add" in the top right corner.</li>
                </ol>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setCurrentView('terms-conditions')}
            className="w-full p-4 bg-white rounded-2xl border border-slate-100 flex items-center justify-between text-slate-600"
          >
            <span className="text-sm font-bold">Terms & Conditions</span>
            <ChevronLeft size={16} className="rotate-180 text-slate-300" />
          </button>
          <button 
            onClick={() => setCurrentView('privacy-policy')}
            className="w-full p-4 bg-white rounded-2xl border border-slate-100 flex items-center justify-between text-slate-600"
          >
            <span className="text-sm font-bold">Privacy Policy</span>
            <ChevronLeft size={16} className="rotate-180 text-slate-300" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderTermsConditions = () => (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-slate-900 text-white p-4 sticky top-0 z-20 flex items-center gap-4">
        <button onClick={() => setCurrentView('support')} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-bold">Terms & Conditions</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-600 no-scrollbar">
        <section>
          <h3 className="text-sm font-black text-slate-800 uppercase mb-2">1. Introduction</h3>
          <p className="text-xs leading-relaxed">Welcome to KHELLO. By using our app, you agree to these terms. Please read them carefully. KHELLO is a fantasy sports platform intended for entertainment purposes only.</p>
        </section>
        <section>
          <h3 className="text-sm font-black text-slate-800 uppercase mb-2">2. Eligibility</h3>
          <p className="text-xs leading-relaxed">You must be at least 18 years old to use this app. Users from states where fantasy sports are restricted are not eligible to participate in paid contests.</p>
        </section>
        <section>
          <h3 className="text-sm font-black text-slate-800 uppercase mb-2">3. User Account</h3>
          <p className="text-xs leading-relaxed">You are responsible for maintaining the confidentiality of your account and password. Any fraudulent activity will lead to immediate account termination.</p>
        </section>
        <section>
          <h3 className="text-sm font-black text-slate-800 uppercase mb-2">4. Contest Rules</h3>
          <p className="text-xs leading-relaxed">Contest winners are determined based on the points accumulated by their selected players in real-life matches. Our decision on points and winners is final.</p>
        </section>
        <section>
          <h3 className="text-sm font-black text-slate-800 uppercase mb-2">5. Payments & Withdrawals</h3>
          <p className="text-xs leading-relaxed">Winnings will be credited to your wallet. Withdrawals are subject to KYC verification and may take up to 2-3 business days to process.</p>
        </section>
      </div>
    </div>
  );

  const renderPrivacyPolicy = () => (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-slate-900 text-white p-4 sticky top-0 z-20 flex items-center gap-4">
        <button onClick={() => setCurrentView('support')} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-bold">Privacy Policy</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-600 no-scrollbar">
        <section>
          <h3 className="text-sm font-black text-slate-800 uppercase mb-2">1. Data Collection</h3>
          <p className="text-xs leading-relaxed">We collect information like your name, email, and phone number to provide a personalized experience and process your transactions securely.</p>
        </section>
        <section>
          <h3 className="text-sm font-black text-slate-800 uppercase mb-2">2. Use of Data</h3>
          <p className="text-xs leading-relaxed">Your data is used to manage your account, provide customer support, and send you important updates about contests and rewards.</p>
        </section>
        <section>
          <h3 className="text-sm font-black text-slate-800 uppercase mb-2">3. Data Security</h3>
          <p className="text-xs leading-relaxed">We use industry-standard encryption to protect your personal and financial information. We do not share your data with third parties for marketing purposes.</p>
        </section>
        <section>
          <h3 className="text-sm font-black text-slate-800 uppercase mb-2">4. Cookies</h3>
          <p className="text-xs leading-relaxed">We use cookies to remember your preferences and improve app performance. You can manage cookie settings in your browser.</p>
        </section>
        <section>
          <h3 className="text-sm font-black text-slate-800 uppercase mb-2">5. Contact Us</h3>
          <p className="text-xs leading-relaxed">If you have any questions about our privacy practices, please contact us through the Help & Support section in the app.</p>
        </section>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-green-100">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="w-24 h-24 bg-green-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-500/20 mb-6"
            >
              <Trophy size={48} className="text-white" />
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-black text-white tracking-tighter mb-2"
            >
              KHELLO
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-green-500 font-bold uppercase tracking-[0.3em] text-[10px]"
            >
              Fantasy Cricket
            </motion.p>
            
            <div className="absolute bottom-12 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-full bg-green-500"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-md mx-auto h-screen bg-slate-50 flex flex-col font-sans overflow-hidden shadow-2xl relative border-x border-slate-200"
          >
            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto no-scrollbar">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentView}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  {currentView === 'home' && renderHome()}
                  {currentView === 'contests' && renderContests()}
                  {currentView === 'team-creation' && renderTeamCreation()}
                  {currentView === 'captain-selection' && renderCaptainSelection()}
                  {currentView === 'success' && renderSuccess()}
                  {currentView === 'points-system' && renderPointsSystem()}
                  {currentView === 'live-match' && renderLiveMatch()}
                  {currentView === 'my-matches' && renderMyMatches()}
                  {currentView === 'winners' && renderWinners()}
                  {currentView === 'refer-earn' && renderReferEarn()}
                  {currentView === 'wallet' && renderWallet()}
                  {currentView === 'profile' && renderProfile()}
                  {currentView === 'notifications' && renderNotifications()}
                  {currentView === 'support' && renderSupport()}
                  {currentView === 'privacy-policy' && renderPrivacyPolicy()}
                  {currentView === 'terms-conditions' && renderTermsConditions()}
                </motion.div>
              </AnimatePresence>
            </main>

            {/* Bottom Navigation (Only on Home) */}
            {['home', 'my-matches', 'winners', 'refer-earn', 'wallet', 'profile'].includes(currentView) && (
              <nav className="bg-white border-t border-slate-200 p-2 flex justify-around items-center sticky bottom-0 z-20">
                <NavItem 
                  icon={<Trophy size={20} />} 
                  label="Home" 
                  active={currentView === 'home'} 
                  onClick={() => setCurrentView('home')}
                />
                <NavItem 
                  icon={<Users size={20} />} 
                  label="My Matches" 
                  active={currentView === 'my-matches'} 
                  onClick={() => setCurrentView('my-matches')}
                />
                <NavItem 
                  icon={<Gift size={20} />} 
                  label="Refer" 
                  active={currentView === 'refer-earn'}
                  onClick={() => setCurrentView('refer-earn')}
                />
                <NavItem 
                  icon={<Wallet size={20} />} 
                  label="Wallet" 
                  active={currentView === 'wallet'}
                  onClick={() => setCurrentView('wallet')}
                />
                <NavItem 
                  icon={<User size={20} />} 
                  label="Profile" 
                  active={currentView === 'profile'}
                  onClick={() => setCurrentView('profile')}
                />
              </nav>
            )}

            {/* Team Preview Modal */}
            <AnimatePresence>
              {showPreview && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-slate-900/90 flex flex-col"
                >
                  <div className="p-4 flex justify-between items-center text-white">
                    <h3 className="font-bold">Team Preview</h3>
                    <button onClick={() => setShowPreview(false)} className="p-2 bg-white/10 rounded-full">
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="flex-1 relative p-4 overflow-y-auto no-scrollbar">
                    {/* Pitch Background */}
                    <div className="absolute inset-0 m-4 border-2 border-white/20 rounded-2xl bg-green-900/50 flex flex-col justify-between p-8">
                      <div className="border-b border-white/20 h-1/4"></div>
                      <div className="border-y border-white/20 h-1/2 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full border border-white/20"></div>
                      </div>
                      <div className="border-t border-white/20 h-1/4"></div>
                    </div>

                    {/* Players on Pitch */}
                    <div className="relative z-10 h-full flex flex-col justify-between py-4">
                      {/* WK */}
                      <div className="flex justify-center gap-4">
                        {selectedPlayers.filter(p => p.role === 'WK').map(p => (
                          <PitchPlayer key={p.id} player={p} isC={captainId === p.id} isVC={viceCaptainId === p.id} />
                        ))}
                      </div>
                      {/* BAT */}
                      <div className="flex justify-center gap-4 flex-wrap">
                        {selectedPlayers.filter(p => p.role === 'BAT').map(p => (
                          <PitchPlayer key={p.id} player={p} isC={captainId === p.id} isVC={viceCaptainId === p.id} />
                        ))}
                      </div>
                      {/* AR */}
                      <div className="flex justify-center gap-4 flex-wrap">
                        {selectedPlayers.filter(p => p.role === 'AR').map(p => (
                          <PitchPlayer key={p.id} player={p} isC={captainId === p.id} isVC={viceCaptainId === p.id} />
                        ))}
                      </div>
                      {/* BOWL */}
                      <div className="flex justify-center gap-4 flex-wrap">
                        {selectedPlayers.filter(p => p.role === 'BOWL').map(p => (
                          <PitchPlayer key={p.id} player={p} isC={captainId === p.id} isVC={viceCaptainId === p.id} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-800 text-white flex justify-around text-xs font-bold uppercase tracking-widest">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-slate-400">IND</span>
                      <span className="text-xl">{selectedPlayers.filter(p => p.team === 'IND').length}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-slate-400">AUS</span>
                      <span className="text-xl">{selectedPlayers.filter(p => p.team === 'AUS').length}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-slate-400">Credits</span>
                      <span className="text-xl">{usedCredits.toFixed(1)}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Player Stats Modal */}
            <PlayerStatsModal 
              player={statsPlayer} 
              onClose={() => setStatsPlayer(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const PitchPlayer: React.FC<{ player: Player; isC: boolean; isVC: boolean }> = ({ player, isC, isVC }) => {
  return (
    <div className="flex flex-col items-center gap-1 w-16">
      <div className="relative">
        <img src={player.image} alt={player.name} className="w-10 h-10 rounded-full bg-slate-800 border border-white/20" referrerPolicy="no-referrer" />
        {isC && <span className="absolute -top-1 -right-1 w-5 h-5 bg-slate-900 text-white text-[8px] font-black rounded-full flex items-center justify-center border border-white/20">C</span>}
        {isVC && <span className="absolute -top-1 -right-1 w-5 h-5 bg-slate-900 text-white text-[8px] font-black rounded-full flex items-center justify-center border border-white/20">VC</span>}
      </div>
      <div className="bg-slate-900/80 px-1.5 py-0.5 rounded text-[8px] font-bold text-white whitespace-nowrap border border-white/10">
        {player.name.split(' ')[1] || player.name}
      </div>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }> = ({ 
  icon, 
  label, 
  active = false,
  onClick 
}) => {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-2 transition-colors ${active ? 'text-green-600' : 'text-slate-400'}`}
    >
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-tight">{label}</span>
    </button>
  );
};
