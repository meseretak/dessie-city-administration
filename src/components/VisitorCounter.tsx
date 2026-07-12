'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Eye, TrendingUp, Calendar, Clock, Activity } from 'lucide-react'

interface VisitorStats {
  total: number
  today: number
  live: number
  week: number
  month: number
}

function AnimatedNumber({ value, delay = 0 }: { value: number; delay?: number }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (value === 0) return
    const duration = 1200
    const steps = 40
    const increment = value / steps
    let current = 0
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += increment
        if (current >= value) {
          setDisplay(value)
          clearInterval(interval)
        } else {
          setDisplay(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <span className="tabular-nums font-bold">
      {display.toLocaleString()}
    </span>
  )
}

function PulseDot() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
    </span>
  )
}

export default function VisitorCounter() {
  const [stats, setStats] = useState<VisitorStats | null>(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    // Track visit
    fetch('/api/visitors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: window.location.pathname }),
    }).catch(() => {})

    // Fetch stats
    const loadStats = () => {
      fetch('/api/visitors')
        .then(r => r.json())
        .then(setStats)
        .catch(() => {})
    }

    loadStats()
    const interval = setInterval(loadStats, 30000) // refresh every 30s
    return () => clearInterval(interval)
  }, [])

  if (!stats) {
    return (
      <div className="bg-gradient-to-r from-[#0a3d22] via-[#0d4a28] to-[#0a3d22] border-t border-[#1a6b3c]/30">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
            <div className="h-4 w-4 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
            <span>Loading visitor stats...</span>
          </div>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      icon: <Users className="w-4 h-4" />,
      label: 'Total Visitors',
      value: stats.total,
      color: 'from-[#c8a415] to-[#a88a10]',
      bg: 'bg-[#c8a415]/10',
      border: 'border-[#c8a415]/20',
      textColor: 'text-[#c8a415]',
    },
    {
      icon: <Calendar className="w-4 h-4" />,
      label: "Today's Visitors",
      value: stats.today,
      color: 'from-emerald-400 to-emerald-600',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      textColor: 'text-emerald-400',
    },
    {
      icon: <TrendingUp className="w-4 h-4" />,
      label: 'This Week',
      value: stats.week,
      color: 'from-cyan-400 to-cyan-600',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
      textColor: 'text-cyan-400',
    },
    {
      icon: <Clock className="w-4 h-4" />,
      label: 'This Month',
      value: stats.month,
      color: 'from-amber-400 to-amber-600',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      textColor: 'text-amber-400',
    },
  ]

  return (
    <div className="bg-gradient-to-r from-[#0a3d22] via-[#0d4a28] to-[#0a3d22] border-t border-[#1a6b3c]/30 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-[#c8a415]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 py-4 relative z-10">
        {/* Compact header bar */}
        <div
          className="flex items-center justify-center gap-3 cursor-pointer group"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10 group-hover:border-[#c8a415]/30 transition-all">
            <Activity className="w-4 h-4 text-[#c8a415]" />
            <span className="text-white/70 text-sm font-medium">Live Visitors</span>
            <div className="flex items-center gap-1.5">
              <PulseDot />
              <span className="text-[#c8a415] font-bold text-lg tabular-nums">
                <AnimatedNumber value={stats.live} />
              </span>
            </div>
            <span className="text-white/30 text-xs hidden sm:inline">online now</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-white/50">
              <Eye className="w-3.5 h-3.5" />
              <span>Total:</span>
              <span className="text-white/90 font-semibold tabular-nums">
                <AnimatedNumber value={stats.total} delay={200} />
              </span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1.5 text-white/50">
              <Calendar className="w-3.5 h-3.5" />
              <span>Today:</span>
              <span className="text-emerald-400 font-semibold tabular-nums">
                <AnimatedNumber value={stats.today} delay={400} />
              </span>
            </div>
          </div>

          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>

        {/* Expanded stats grid */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/10">
                {statCards.map((card, i) => (
                  <motion.div
                    key={card.label}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`${card.bg} ${card.border} border rounded-xl p-4 hover:scale-[1.02] transition-transform duration-200`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`${card.textColor}`}>{card.icon}</div>
                      <span className="text-white/50 text-xs font-medium uppercase tracking-wider">
                        {card.label}
                      </span>
                    </div>
                    <div className={`${card.textColor} text-2xl sm:text-3xl font-bold`}>
                      <AnimatedNumber value={card.value} delay={i * 150} />
                    </div>
                    <div className="mt-1 h-1 w-full bg-black/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (card.value / Math.max(1, stats.total)) * 100)}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
                        className={`h-full bg-gradient-to-r ${card.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Live indicator bar */}
              <div className="mt-4 flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5">
                  <PulseDot />
                  <span className="text-emerald-400 text-xs font-medium">
                    {stats.live} {stats.live === 1 ? 'user' : 'users'} browsing right now
                  </span>
                </div>
                <span className="text-white/20 text-xs">
                  Last updated: {new Date().toLocaleTimeString()}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}