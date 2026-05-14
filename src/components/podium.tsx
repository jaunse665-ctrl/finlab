"use client"

import { motion } from "framer-motion"
import { Trophy, Medal } from "lucide-react"

interface PodiumProps {
  winners: {
    position: number
    name: string
    score: number
  }[]
}

export function AnimatedPodium({ winners }: PodiumProps) {
  // Sort winners by position to ensure 1, 2, 3
  const sortedWinners = [...winners].sort((a, b) => a.position - b.position)
  
  const first = sortedWinners.find(w => w.position === 1)
  const second = sortedWinners.find(w => w.position === 2)
  const third = sortedWinners.find(w => w.position === 3)

  return (
    <div className="flex items-end justify-center gap-2 sm:gap-6 h-64 sm:h-80 mt-12 mb-8 px-4">
      {/* 2nd Place */}
      {second && (
        <div className="flex flex-col items-center justify-end w-1/3 max-w-[120px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-col items-center mb-2"
          >
            <Trophy className="w-8 h-8 text-zinc-400 mb-1 drop-shadow-sm" />
            <div className="font-bold text-sm sm:text-lg text-zinc-700 text-center truncate w-full px-2">{second.name}</div>
            <div className="font-medium text-xs sm:text-sm text-zinc-500">{second.score} pts</div>
          </motion.div>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "60%" }}
            transition={{ delay: 1, duration: 0.8, type: "spring", bounce: 0.4 }}
            className="w-full bg-gradient-to-t from-zinc-300 to-zinc-200 rounded-t-lg shadow-lg relative flex justify-center items-start pt-4 border-t-4 border-zinc-400"
          >
            <span className="text-4xl font-black text-zinc-400/50">2</span>
          </motion.div>
        </div>
      )}

      {/* 1st Place */}
      {first && (
        <div className="flex flex-col items-center justify-end w-1/3 max-w-[140px] z-10">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 2, duration: 0.5, type: "spring" }}
            className="flex flex-col items-center mb-2"
          >
            <Trophy className="w-10 h-10 text-yellow-500 mb-1 drop-shadow-md" />
            <div className="font-black text-base sm:text-xl text-yellow-600 text-center truncate w-full px-2">{first.name}</div>
            <div className="font-bold text-sm sm:text-base text-yellow-600/80">{first.score} pts</div>
          </motion.div>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ delay: 2, duration: 1, type: "spring", bounce: 0.5 }}
            className="w-full bg-gradient-to-t from-yellow-300 to-yellow-200 rounded-t-lg shadow-xl relative flex justify-center items-start pt-4 border-t-4 border-yellow-400"
          >
            <span className="text-5xl font-black text-yellow-500/50">1</span>
          </motion.div>
        </div>
      )}

      {/* 3rd Place */}
      {third && (
        <div className="flex flex-col items-center justify-end w-1/3 max-w-[120px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center mb-2"
          >
            <Trophy className="w-7 h-7 text-orange-400 mb-1 drop-shadow-sm" />
            <div className="font-bold text-sm sm:text-lg text-orange-800 text-center truncate w-full px-2">{third.name}</div>
            <div className="font-medium text-xs sm:text-sm text-orange-700/80">{third.score} pts</div>
          </motion.div>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "45%" }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring", bounce: 0.3 }}
            className="w-full bg-gradient-to-t from-orange-300 to-orange-200 rounded-t-lg shadow-lg relative flex justify-center items-start pt-4 border-t-4 border-orange-400"
          >
            <span className="text-4xl font-black text-orange-400/50">3</span>
          </motion.div>
        </div>
      )}
    </div>
  )
}
