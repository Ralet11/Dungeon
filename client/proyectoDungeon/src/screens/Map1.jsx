import React, { useState } from 'react'
import { motion } from 'framer-motion'

const regions = [
  { id: 'issylra', name: 'Issylra', x: '10%', y: '30%' },
  { id: 'taldorei', name: "Tal'Dorei", x: '40%', y: '35%' },
  { id: 'wildemount', name: 'Wildemount', x: '70%', y: '30%' },
  { id: 'marquet', name: 'Marquet', x: '30%', y: '70%' },
  { id: 'shattered-teeth', name: 'Shattered Teeth', x: '85%', y: '70%' },
]

export default function ExandriaMap() {
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [showInfo, setShowInfo] = useState(false)

  const handleRegionClick = (region) => {
    setSelectedRegion(region)
    setShowInfo(true)
  }

  const closeInfo = () => {
    setShowInfo(false)
  }

  return (
    <div className="relative w-full h-screen bg-blue-100 overflow-hidden">
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/exandria-E39H8TpQCjk3fV2uMFGU5e6HSL72vY.webp"
        alt="Map of Exandria"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30" />

      {regions.map((region) => (
        <motion.button
          key={region.id}
          className="absolute w-16 h-16 bg-yellow-400 rounded-full border-4 border-yellow-600 shadow-lg cursor-pointer hover:bg-yellow-300 transition-colors duration-200 flex items-center justify-center text-xs font-bold text-yellow-900"
          style={{ left: region.x, top: region.y }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleRegionClick(region)}
        >
          {region.name}
        </motion.button>
      ))}

      {showInfo && selectedRegion && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-90 text-white p-6 rounded-t-xl"
        >
          <h2 className="text-2xl font-bold mb-2">{selectedRegion.name}</h2>
          <p className="mb-4">Explore the wonders of {selectedRegion.name} in Exandria!</p>
          <button
            onClick={closeInfo}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Close
          </button>
        </motion.div>
      )}

      <div className="absolute top-0 left-0 m-4 text-white text-shadow">
        <h1 className="text-4xl font-bold mb-2">Exandria Explorer</h1>
        <p>Click on a region to learn more about it!</p>
      </div>
    </div>
  )
}