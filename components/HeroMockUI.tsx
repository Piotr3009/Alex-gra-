'use client'

import { Badge } from '@/components/ui/badge'
import { Calendar, Bell, BarChart3 } from 'lucide-react'

export function HeroMockUI() {
  return (
    <div className="hero-mock-container relative w-full h-[400px] lg:h-[500px] perspective-1000">
      {/* Main Dashboard Card (Back) */}
      <div
        className="hero-card-back absolute inset-0 glass-card rounded-xl p-4 transform translate-x-4 translate-y-4 transition-transform duration-500"
        style={{ transform: 'translateZ(-20px) rotateX(2deg) rotateY(-2deg)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-zinc-500">Dashboard</span>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-base/50 rounded-lg p-3 border border-border">
            <div className="text-xs text-zinc-500 mb-1">Active Projects</div>
            <div className="text-xl font-bold text-white">12</div>
          </div>
          <div className="bg-base/50 rounded-lg p-3 border border-border">
            <div className="text-xs text-zinc-500 mb-1">This Week</div>
            <div className="text-xl font-bold text-accent-green">£24.5k</div>
          </div>
          <div className="bg-base/50 rounded-lg p-3 border border-border">
            <div className="text-xs text-zinc-500 mb-1">Team Load</div>
            <div className="text-xl font-bold text-accent-orange">87%</div>
          </div>
        </div>

        <div className="bg-base/50 rounded-lg p-3 border border-border h-[120px]">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-zinc-500" />
            <span className="text-xs text-zinc-500">Revenue Overview</span>
          </div>
          <div className="flex items-end gap-1 h-[70px]">
            {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-primary/30 rounded-t"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Gantt Chart Card (Front) */}
      <div
        className="hero-card-front absolute top-8 left-8 right-4 glass-card rounded-xl p-4 shadow-2xl transition-transform duration-500"
        style={{ transform: 'translateZ(20px) rotateX(-1deg) rotateY(1deg)' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-white">Production Schedule</span>
          <Badge variant="success" className="ml-auto text-xs">Live</Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 w-20 truncate">Kitchen Oak</span>
            <div className="flex-1 h-6 bg-base/50 rounded relative overflow-hidden">
              <div className="absolute left-[10%] w-[60%] h-full bg-primary rounded flex items-center px-2">
                <span className="text-[10px] text-white truncate">Machining</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 w-20 truncate">Wardrobe #4</span>
            <div className="flex-1 h-6 bg-base/50 rounded relative overflow-hidden">
              <div className="absolute left-[30%] w-[40%] h-full bg-accent-green rounded flex items-center px-2">
                <span className="text-[10px] text-white truncate">Assembly</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 w-20 truncate">Cabinet Set</span>
            <div className="flex-1 h-6 bg-base/50 rounded relative overflow-hidden">
              <div className="absolute left-[5%] w-[25%] h-full bg-accent-orange rounded flex items-center px-2">
                <span className="text-[10px] text-white truncate">Design</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Notification Card */}
      <div
        className="hero-card-mobile absolute bottom-4 right-0 w-[200px] glass-card rounded-xl p-3 shadow-2xl transition-transform duration-500"
        style={{ transform: 'translateZ(40px)' }}
      >
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Bell className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-white mb-0.5">Stock Alert</div>
            <div className="text-[10px] text-zinc-400">Oak panels below threshold</div>
          </div>
          <div className="badge-pulse w-2 h-2 rounded-full bg-accent-orange flex-shrink-0 mt-1" />
        </div>
      </div>
    </div>
  )
}
