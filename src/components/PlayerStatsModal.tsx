
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp, Target, Swords, BarChart3 } from 'lucide-react';
import { Player } from '../data/mockData';

interface PlayerStatsModalProps {
  player: Player | null;
  onClose: () => void;
}

export const PlayerStatsModal: React.FC<PlayerStatsModalProps> = ({ player, onClose }) => {
  if (!player) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center p-0 sm:p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="bg-slate-900 p-6 text-white">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={player.image} alt={player.name} className="w-16 h-16 rounded-full bg-slate-800 border-2 border-white/20" referrerPolicy="no-referrer" />
                  <span className="absolute -bottom-1 -right-1 bg-white text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">{player.team}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold leading-tight">{player.name}</h2>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{player.role} • {player.points} Points</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <StatItem label="Avg" value={player.stats.average.toString()} />
              <StatItem label="S/R" value={player.stats.strikeRate.toString()} />
              <StatItem label="Credits" value={player.credits.toString()} />
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-8 overflow-y-auto max-h-[60vh] no-scrollbar">
            {/* Recent Performance */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-green-600" />
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Recent Performance</h3>
              </div>
              <div className="flex items-end justify-between h-24 gap-2 px-2">
                {player.stats.recentPerformance.map((pts, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-[10px] font-bold text-slate-400">{pts}</div>
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${(pts / 150) * 100}%` }}
                      className="w-full bg-green-500 rounded-t-sm min-h-[4px]"
                    />
                    <div className="text-[8px] font-bold text-slate-300 uppercase">M{5-i}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* H2H Records */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Swords size={18} className="text-orange-600" />
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Head to Head Records</h3>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 grid grid-cols-2 gap-4 border border-slate-100">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Matches</p>
                  <p className="text-lg font-black text-slate-800">{player.stats.h2hRecord.matches}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Average</p>
                  <p className="text-lg font-black text-slate-800">{player.stats.h2hRecord.average}</p>
                </div>
                {player.stats.h2hRecord.runs !== undefined && (
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Total Runs</p>
                    <p className="text-lg font-black text-slate-800">{player.stats.h2hRecord.runs}</p>
                  </div>
                )}
                {player.stats.h2hRecord.wickets !== undefined && (
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Total Wickets</p>
                    <p className="text-lg font-black text-slate-800">{player.stats.h2hRecord.wickets}</p>
                  </div>
                )}
              </div>
            </section>

            {/* Selection Stats */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 size={18} className="text-blue-600" />
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Selection Stats</h3>
              </div>
              <div className="space-y-4">
                <SelectionBar label="Selected By" percentage={78} color="bg-blue-500" />
                <SelectionBar label="Captain By" percentage={12} color="bg-slate-900" />
                <SelectionBar label="Vice Captain By" percentage={15} color="bg-slate-600" />
              </div>
            </section>
          </div>

          {/* Action */}
          <div className="p-6 bg-slate-50 border-t border-slate-100">
            <button 
              onClick={onClose}
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold shadow-xl shadow-slate-200"
            >
              Got it
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/10 rounded-xl p-3 text-center border border-white/5">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-lg font-black">{value}</p>
    </div>
  );
}

function SelectionBar({ label, percentage, color }: { label: string; percentage: number; color: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-tight">
        <span className="text-slate-500">{label}</span>
        <span className="text-slate-800">{percentage}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
    </div>
  );
}
