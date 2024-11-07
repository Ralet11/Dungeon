'use client'

import React, { useState, useEffect, useCallback } from 'react'

const tileSize = 32
const viewportWidth = 20
const viewportHeight = 15
const worldWidth = 50
const worldHeight = 50

// Componentes UI simplificados
const Button = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
  >
    {children}
  </button>
)

const Progress = ({ value, className }) => (
  <div className={`w-full bg-gray-200 rounded ${className}`}>
    <div
      className="bg-blue-500 rounded h-2"
      style={{ width: `${value}%` }}
    ></div>
  </div>
)

const Heart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-red-500">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
)

const Star = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-yellow-500">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const FreeWorld = () => {
  const [player, setPlayer] = useState({
    x: 5,
    y: 5,
    health: 100,
    maxHealth: 100,
    experience: 0,
    level: 1,
    inventory: ['Potion']
  })
  const [map, setMap] = useState(generateMap())
  const [npcs, setNpcs] = useState(generateNPCs())
  const [cameraOffset, setCameraOffset] = useState({ x: 0, y: 0 })
  const [interactingNPC, setInteractingNPC] = useState(null)
  const [combatLog, setCombatLog] = useState([])

  const updateCameraOffset = useCallback(() => {
    const newOffsetX = Math.max(0, Math.min(player.x - Math.floor(viewportWidth / 2), worldWidth - viewportWidth))
    const newOffsetY = Math.max(0, Math.min(player.y - Math.floor(viewportHeight / 2), worldHeight - viewportHeight))
    setCameraOffset({ x: newOffsetX, y: newOffsetY })
  }, [player.x, player.y])

  useEffect(() => {
    updateCameraOffset()
  }, [player.x, player.y, updateCameraOffset])

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { x, y } = player
      let newX = x
      let newY = y

      switch (event.key) {
        case 'ArrowUp':
          newY = y > 0 ? y - 1 : y
          break
        case 'ArrowDown':
          newY = y < worldHeight - 1 ? y + 1 : y
          break
        case 'ArrowLeft':
          newX = x > 0 ? x - 1 : x
          break
        case 'ArrowRight':
          newX = x < worldWidth - 1 ? x + 1 : x
          break
        case ' ':
          interact()
          return
        default:
          return
      }

      if (map[newY][newX] !== 'water') {
        setPlayer(prev => ({ ...prev, x: newX, y: newY }))
        updateCameraOffset()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [player, map, updateCameraOffset])

  function generateMap() {
    const terrainTypes = ['grass', 'tree', 'water', 'sand']
    return Array.from({ length: worldHeight }, () =>
      Array.from({ length: worldWidth }, () =>
        terrainTypes[Math.floor(Math.random() * terrainTypes.length)]
      )
    )
  }

  function generateNPCs() {
    const npcs = []
    for (let i = 0; i < 10; i++) {
      npcs.push({
        x: Math.floor(Math.random() * worldWidth),
        y: Math.floor(Math.random() * worldHeight),
        type: Math.random() > 0.5 ? 'friendly' : 'enemy',
        health: 50,
        message: 'Hello, traveler!'
      })
    }
    return npcs
  }

  function getTileClass(tile) {
    switch (tile) {
      case 'grass':
        return 'bg-green-500'
      case 'tree':
        return 'bg-green-800'
      case 'water':
        return 'bg-blue-600'
      case 'sand':
        return 'bg-yellow-300'
      default:
        return ''
    }
  }

  function getNPCEmoji(type) {
    return type === 'friendly' ? '🙂' : '👹'
  }

  function interact() {
    const nearbyNPC = npcs.find(npc => 
      Math.abs(npc.x - player.x) <= 1 && Math.abs(npc.y - player.y) <= 1
    )

    if (nearbyNPC) {
      if (nearbyNPC.type === 'friendly') {
        setInteractingNPC(nearbyNPC)
      } else {
        // Combat
        const damage = Math.floor(Math.random() * 20) + 10
        setNpcs(prev => prev.map(npc => 
          npc === nearbyNPC ? { ...npc, health: Math.max(0, npc.health - damage) } : npc
        ))
        setCombatLog(prev => [...prev, `You dealt ${damage} damage to the enemy!`])
        
        if (nearbyNPC.health - damage <= 0) {
          gainExperience(50)
          setCombatLog(prev => [...prev, 'You defeated the enemy!'])
        } else {
          const enemyDamage = Math.floor(Math.random() * 10) + 5
          setPlayer(prev => ({ ...prev, health: Math.max(0, prev.health - enemyDamage) }))
          setCombatLog(prev => [...prev, `The enemy dealt ${enemyDamage} damage to you!`])
        }
      }
    }
  }

  function gainExperience(amount) {
    setPlayer(prev => {
      const newExperience = prev.experience + amount
      if (newExperience >= 100) {
        return {
          ...prev,
          experience: newExperience - 100,
          level: prev.level + 1,
          maxHealth: prev.maxHealth + 20,
          health: prev.maxHealth + 20
        }
      }
      return { ...prev, experience: newExperience }
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="mb-4 flex items-center space-x-4">
        <div className="flex items-center">
          <Heart />
          <Progress value={(player.health / player.maxHealth) * 100} className="w-32" />
        </div>
        <div className="flex items-center">
          <Star />
          <Progress value={player.experience} className="w-32" />
        </div>
        <div>Level: {player.level}</div>
      </div>
      <div className="relative w-[640px] h-[480px] bg-gray-800 overflow-hidden border-4 border-gray-900">
        {map.slice(cameraOffset.y, cameraOffset.y + viewportHeight).map((row, rowIndex) =>
          row.slice(cameraOffset.x, cameraOffset.x + viewportWidth).map((tile, colIndex) => (
            <div
              key={`${rowIndex + cameraOffset.y}-${colIndex + cameraOffset.x}`}
              className={`absolute flex items-center justify-center ${getTileClass(tile)}`}
              style={{
                width: tileSize,
                height: tileSize,
                top: rowIndex * tileSize,
                left: colIndex * tileSize,
              }}
            >
              {player.x === colIndex + cameraOffset.x && player.y === rowIndex + cameraOffset.y && (
                <div className="text-2xl z-10">🧙</div>
              )}
              {npcs.map((npc, index) => 
                npc.x === colIndex + cameraOffset.x && npc.y === rowIndex + cameraOffset.y && (
                  <div key={index} className="text-2xl z-10">{getNPCEmoji(npc.type)}</div>
                )
              )}
            </div>
          ))
        )}
      </div>
      <div className="mt-4 flex space-x-2">
        <Button onClick={() => setPlayer(prev => ({ ...prev, health: Math.min(prev.maxHealth, prev.health + 20) }))}>
          Use Potion
        </Button>
        <Button onClick={interact}>
          Interact (Space)
        </Button>
      </div>
      {interactingNPC && (
        <div className="mt-4 p-4 bg-white rounded shadow">
          <p>{interactingNPC.message}</p>
          <Button onClick={() => setInteractingNPC(null)}>Close</Button>
        </div>
      )}
      {combatLog.length > 0 && (
        <div className="mt-4 p-4 bg-white rounded shadow max-h-32 overflow-y-auto">
          <h3 className="font-bold mb-2">Combat Log</h3>
          {combatLog.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export default FreeWorld