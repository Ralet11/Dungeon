import React, { useState } from 'react'
import { motion } from 'framer-motion'

import { Shield, Sword, Book, Map, Users } from 'lucide-react'
import ExandriaMap from './Map1'

const navItems = [
  { name: 'Misiones Activas', icon: Shield },
  { name: 'Arsenal Mágico', icon: Sword },
  { name: 'Grimorio', icon: Book },
  { name: 'Mapas del Reino', icon: Map },
  { name: 'Gremio de Aventureros', icon: Users },
]

export default function MapMain() {
  const [activeNav, setActiveNav] = useState('Mapas del Reino')

  return (
    <div className="min-h-screen bg-[#1e213a] text-white font-sans">
      <header className="bg-[#2b2d42] p-4 text-center">
        <div className="mb-2">
          <img src="/placeholder.svg?height=50&width=50" alt="Castle Icon" className="inline-block" />
        </div>
        <h1 className="text-3xl font-bold mb-1">Bienvenido al Reino, Aventurero</h1>
        <p className="text-[#8d99ae]">Tu épica jornada comienza aquí</p>
      </header>

      <nav className="bg-[#2b2d42] p-4">
        <ul className="flex justify-center space-x-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => setActiveNav(item.name)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 ${
                  activeNav === item.name ? 'bg-[#4a4e69] text-white' : 'text-[#8d99ae] hover:bg-[#3c3f58]'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="container mx-auto p-4">
        {activeNav === 'Mapas del Reino' ? (
          <div className="bg-[#2b2d42] rounded-lg overflow-hidden shadow-xl">
            <ExandriaMap />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#2b2d42] rounded-lg p-6 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-4">{activeNav}</h2>
            <p className="text-[#8d99ae]">
              Esta sección está en desarrollo. Pronto podrás explorar más contenido aquí.
            </p>
          </motion.div>
        )}
      </main>
    </div>
  )
}