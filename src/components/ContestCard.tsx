
import React from 'react';
import { Contest } from '../data/mockData';
import { Trophy, Users } from 'lucide-react';

interface ContestCardProps {
  contest: Contest;
  onJoin: () => void;
}

export const ContestCard: React.FC<ContestCardProps> = ({ contest, onJoin }) => {
  const progress = (contest.filledSpots / contest.totalSpots) * 100;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-4">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-bold text-slate-800">{contest.name}</h3>
              {contest.isMega && (
                <span className="bg-orange-100 text-orange-600 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">Mega</span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-medium">Prize Pool</p>
            <p className="text-xl font-black text-slate-900">{contest.prizePool}</p>
          </div>
          <button 
            onClick={onJoin}
            className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-green-100 hover:scale-105 transition-transform"
          >
            {contest.entryFee === 0 ? 'FREE' : `₹${contest.entryFee}`}
          </button>
        </div>
        
        <div className="space-y-1.5">
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-400 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            <span className="text-orange-500">{contest.totalSpots - contest.filledSpots} spots left</span>
            <span>{contest.totalSpots} spots</span>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-4">
        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
          <Trophy size={12} className="text-slate-400" />
          <span>₹1 Lakh</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
          <Users size={12} className="text-slate-400" />
          <span>60% Winners</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
          <span>Guaranteed</span>
        </div>
      </div>
    </div>
  );
};
