'use client'

import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from './ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Input } from './ui/input'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

export const TerminalSearch = () => {
  const [open, setOpen] = useState(false)
  const [command, setCommand] = useState('')
  const [mounted, setMounted] = useState(false)
  const [filteredCommands, setFilteredCommands] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const commands = [
    { cmd: 'cd /', path: '/app' },
    { cmd: 'cat intro.md', path: '/app/intro' },
    { cmd: './list_activities', path: '/app/Activities' },
    { cmd: 'ls ./projects', path: '/app/projects' },
    { cmd: 'stats --summary', path: '/app/stats' },
    { cmd: 'history --all', path: '/app/history' },
    { cmd: 'members --list', path: '/app/team' },
    { cmd: 'partners --show', path: '/app/partners' }
  ]

  useEffect(() => {
    setMounted(true)
    setFilteredCommands(commands.map(c => c.cmd))
  }, [])

  if (!mounted) {
    return null
  }

  const handleCommand = (cmd: string) => {
    if (!mounted) return
    
    const matchedCommand = commands.find(c => c.cmd.toLowerCase().includes(cmd.toLowerCase()))
    if (matchedCommand) {
      window.location.href = matchedCommand.path
    } else {
      console.log('Search:', cmd)
    }
  }

  const handleInputChange = (value: string) => {
    setCommand(value)
    const filtered = commands
      .filter(c => c.cmd.toLowerCase().includes(value.toLowerCase()))
      .map(c => c.cmd)
    setFilteredCommands(filtered)
    setSelectedIndex(0)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1))
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      if (filteredCommands[selectedIndex]) {
        handleCommand(filteredCommands[selectedIndex])
        setOpen(false)
      }
    }
  }

  return (
    <motion.div
      className="fixed bottom-8 right-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-12 h-12 p-0 rounded-full bg-[#1A1A1A] border-2 border-green-700 hover:bg-[#1A1A1A]/90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-terminal text-green-500"
            >
              <polyline points="4 17 10 11 4 5"/>
              <line x1="12" x2="20" y1="19" y2="19"/>
            </svg>
          </Button>
        </DialogTrigger>
        <DialogContent className="fixed right-16 bottom-16 w-[500px] rounded-lg border-2 border-green-700 bg-[#1E1E1E] p-0 overflow-hidden font-mono">
          <VisuallyHidden>
            <DialogTitle>Terminal Search</DialogTitle>
          </VisuallyHidden>
          <div className="px-6 py-4 border-b border-green-500">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div className="text-green-500">$ <span className="text-white">terminal-search</span></div>
            <Input
              placeholder="Type command or search..."
              className="bg-[#2A2A2A] border-green-500 text-green-500 placeholder:text-green-500/50"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCommand(command)
                  setOpen(false)
                }
              }}
            />
            <div className="text-sm text-green-500 space-y-2">
              {filteredCommands.map((cmd, index) => {
                const commandInfo = commands.find(c => c.cmd === cmd)
                return (
                  <div 
                    key={cmd}
                    className={`flex justify-between p-2 rounded cursor-pointer ${
                      index === selectedIndex ? 'bg-[#2A2A2A]' : ''
                    }`}
                    onClick={() => {
                      handleCommand(cmd)
                      setOpen(false)
                    }}
                  >
                    <span className="text-blue-500">$ {cmd}</span>
                    <span>{commandInfo?.path ? `- ${commandInfo.path}` : ''}</span>
                  </div>
                )
              })}
            </div>
            <div className="pt-4 border-t-2 border-green-500/50 text-green-500/50 text-xs">
              Press <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded">Enter</span> to execute command
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
