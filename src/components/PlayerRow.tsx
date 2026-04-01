
import React from 'react';
import { Player } from '../data/mockData';
import { Plus, Minus, Info } from 'lucide-react';

interface PlayerRowProps {
  player: Player;
  isSelected: boolean;
  onSelect: (player: Player) => void;
  onShowStats: (player: Player) => void;
  disabled: boolean;
}

export const PlayerRow: React.FC<PlayerRowProps> = ({ player, isSelected, onSelect, onShowStats, disabled }) => {
  return (
    <div className={`flex items-center justify-between p-3 border-b border-slate-100 transition-colors ${isSelected ? 'bg-green-50' : 'bg-white'}`}>
      <div className="flex items-center gap-3 flex-1">
        <div className="relative cursor-pointer" onClick={() => onShowStats(player)}>
          <img src={player.image} alt={player.name} className="w-10 h-10 rounded-full bg-slate-100" referrerPolicy="no-referrer" />
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
            <span className="text-[8px] font-bold px-1 bg-slate-800 text-white rounded-sm">{player.team}</span>
          </div>
          <div className="absolute -top-1 -left-1 bg-white rounded-full p-0.5 shadow-sm">
            <Info size={10} className="text-blue-500" />
          </div>
        </div>
        <div className="cursor-pointer" onClick={() => onShowStats(player)}>
          <h4 className="text-sm font-bold text-slate-800">{player.name}</h4>
          <p className="text-[10px] text-slate-500 font-medium">{player.role} • {player.points} pts</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-sm font-bold text-slate-800">{player.credits}</p>
          <p className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter">Credits</p>
        </div>
        
        <button
          onClick={() => onSelect(player)}
          disabled={disabled && !isSelected}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isSelected 
              ? 'bg-red-500 text-white shadow-sm' 
              : disabled 
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
                : 'bg-green-500 text-white shadow-sm hover:scale-110'
          }`}
        >
          {isSelected ? <Minus size={18} /> : <Plus size={18} />}
        </button>
      </div>
    </div>
  );
};
