
import React from 'react';
import { Player } from '../data/mockData';
import { Check } from 'lucide-react';

interface CaptainRowProps {
  player: Player;
  isCaptain: boolean;
  isViceCaptain: boolean;
  onSelectCaptain: (id: string) => void;
  onSelectViceCaptain: (id: string) => void;
}

export const CaptainRow: React.FC<CaptainRowProps> = ({ 
  player, 
  isCaptain, 
  isViceCaptain, 
  onSelectCaptain, 
  onSelectViceCaptain 
}) => {
  return (
    <div className="flex items-center justify-between p-3 border-b border-slate-100 bg-white">
      <div className="flex items-center gap-3 flex-1">
        <div className="relative">
          <img src={player.image} alt={player.name} className="w-10 h-10 rounded-full bg-slate-100" referrerPolicy="no-referrer" />
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
            <span className="text-[8px] font-bold px-1 bg-slate-800 text-white rounded-sm">{player.team}</span>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-800">{player.name}</h4>
          <p className="text-[10px] text-slate-500 font-medium">{player.role} • {player.points} pts</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={() => onSelectCaptain(player.id)}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all border-2 ${
            isCaptain 
              ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
              : 'bg-white text-slate-400 border-slate-200 hover:border-slate-400'
          }`}
        >
          {isCaptain ? 'C' : 'C'}
        </button>
        
        <button
          onClick={() => onSelectViceCaptain(player.id)}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all border-2 ${
            isViceCaptain 
              ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
              : 'bg-white text-slate-400 border-slate-200 hover:border-slate-400'
          }`}
        >
          {isViceCaptain ? 'VC' : 'VC'}
        </button>
      </div>
    </div>
  );
};
