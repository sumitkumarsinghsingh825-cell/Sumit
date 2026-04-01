
import React from 'react';
import { Match } from '../data/mockData';
import { Clock } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  onClick: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="px-4 py-2 bg-slate-50 border-bottom border-slate-100 flex justify-between items-center">
        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{match.series}</span>
        {match.status === 'live' && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 animate-pulse">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span> LIVE
          </span>
        )}
      </div>
      
      <div className="p-4 flex items-center justify-between">
        <div className="flex flex-col items-center gap-2 w-1/3">
          <img src={match.teamA.logo} alt={match.teamA.name} className="w-10 h-10 rounded-full border border-slate-100 shadow-sm object-cover" referrerPolicy="no-referrer" />
          <span className="font-bold text-slate-800">{match.teamA.short}</span>
        </div>
        
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs font-medium text-slate-400 italic">vs</span>
          <div className="flex items-center gap-1 text-xs font-bold text-red-500">
            <Clock size={12} />
            <span>{match.startTime}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-2 w-1/3">
          <img src={match.teamB.logo} alt={match.teamB.name} className="w-10 h-10 rounded-full border border-slate-100 shadow-sm object-cover" referrerPolicy="no-referrer" />
          <span className="font-bold text-slate-800">{match.teamB.short}</span>
        </div>
      </div>
      
      <div className="px-4 py-2 bg-slate-50 flex justify-between items-center border-t border-slate-100">
        <div className="flex gap-2">
          <div className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded">MEGA ₹10 CRORE</div>
        </div>
        <div className="text-[10px] font-medium text-slate-400">12 Contests</div>
      </div>
    </div>
  );
};
