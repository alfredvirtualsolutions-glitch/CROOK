
import React, { useState, useEffect } from 'react';
import { Trophy, Star, Zap, Flame, Target, Award, Crown, Sparkles } from 'lucide-react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: 'trophy' | 'star' | 'zap' | 'flame' | 'target' | 'award' | 'crown' | 'sparkles';
  color: 'pink' | 'purple' | 'cyan' | 'green' | 'yellow' | 'orange';
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

const iconMap = {
  trophy: Trophy,
  star: Star,
  zap: Zap,
  flame: Flame,
  target: Target,
  award: Award,
  crown: Crown,
  sparkles: Sparkles,
};

const colorMap = {
  pink: {
    bg: 'from-pink-500 to-rose-500',
    glow: 'shadow-pink-500/50',
    border: 'border-pink-400/30',
    text: 'text-pink-300',
  },
  purple: {
    bg: 'from-purple-500 to-violet-500',
    glow: 'shadow-purple-500/50',
    border: 'border-purple-400/30',
    text: 'text-purple-300',
  },
  cyan: {
    bg: 'from-cyan-500 to-blue-500',
    glow: 'shadow-cyan-500/50',
    border: 'border-cyan-400/30',
    text: 'text-cyan-300',
  },
  green: {
    bg: 'from-green-500 to-emerald-500',
    glow: 'shadow-green-500/50',
    border: 'border-green-400/30',
    text: 'text-green-300',
  },
  yellow: {
    bg: 'from-yellow-500 to-amber-500',
    glow: 'shadow-yellow-500/50',
    border: 'border-yellow-400/30',
    text: 'text-yellow-300',
  },
  orange: {
    bg: 'from-orange-500 to-red-500',
    glow: 'shadow-orange-500/50',
    border: 'border-orange-400/30',
    text: 'text-orange-300',
  },
};

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  animate?: boolean;
}

export default function AchievementBadge({ 
  achievement, 
  size = 'md', 
  showDetails = true,
  animate = false 
}: AchievementBadgeProps) {
  const [isAnimating, setIsAnimating] = useState(animate);
  const Icon = iconMap[achievement.icon];
  const colors = colorMap[achievement.color];

  useEffect(() => {
    if (animate) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
  };

  if (!achievement.unlocked) {
    return (
      <div className="flex items-center gap-4">
        <div className={`${sizeClasses[size]} rounded-2xl bg-slate-800/30 border border-slate-700/50 flex items-center justify-center shrink-0`}>
          <Icon className={`${iconSizes[size]} text-slate-600`} />
        </div>
        {showDetails && (
          <div className="flex-1">
            <p className="text-slate-500 font-bold text-sm tracking-tight">{achievement.title}</p>
            <p className="text-slate-600 text-xs leading-tight mb-2">{achievement.description}</p>
            {achievement.progress !== undefined && achievement.maxProgress !== undefined && (
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-600 rounded-full transition-all duration-1000"
                  style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div 
        className={`
          ${sizeClasses[size]} rounded-2xl bg-gradient-to-br ${colors.bg} 
          flex items-center justify-center shadow-lg ${colors.glow}
          border ${colors.border}
          ${isAnimating ? 'animate-achievement-pop' : ''}
          hover:scale-110 transition-transform duration-200 shrink-0
        `}
      >
        <Icon className={`${iconSizes[size]} text-white drop-shadow-md`} />
      </div>
      {showDetails && (
        <div className="flex-1">
          <p className={`${colors.text} font-bold text-sm tracking-tight`}>{achievement.title}</p>
          <p className="text-slate-400 text-xs leading-tight">{achievement.description}</p>
        </div>
      )}
    </div>
  );
}

export function AchievementToast({ achievement, onClose }: { achievement: Achievement; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = colorMap[achievement.color];
  const Icon = iconMap[achievement.icon];

  return (
    <div className="fixed top-24 right-6 z-[200] animate-slide-in-right">
      <div className={`
        bg-slate-900/95 backdrop-blur-xl border ${colors.border} rounded-2xl p-4 
        shadow-2xl ${colors.glow} max-w-sm
      `}>
        <div className="flex items-center gap-4">
          <div className={`
            w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.bg} 
            flex items-center justify-center shadow-lg animate-achievement-pop
          `}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-yellow-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
              🎉 Achievement Unlocked!
            </p>
            <p className={`${colors.text} font-bold text-sm`}>{achievement.title}</p>
            <p className="text-slate-400 text-xs">{achievement.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
