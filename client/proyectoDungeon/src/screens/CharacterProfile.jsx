'use client'

import { useState } from 'react'

export default function CharacterProfile() {
  const [activeTab, setActiveTab] = useState('info')

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img 
              src="/placeholder.svg?height=64&width=64" 
              alt="Character avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Seto Zatanamoth</h1>
            <p className="text-gray-600">Tiefling Brujo 1</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 border-b mb-6">
        {[
          { id: 'info', label: 'Información' },
          { id: 'background', label: 'Trasfondo' },
          { id: 'traits', label: 'Rasgos' },
          { id: 'equipment', label: 'Equipo' },
          { id: 'spells', label: 'Conjuros' },
          { id: 'allies', label: 'Compañeros' },
          { id: 'actions', label: 'Acciones' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 -mb-px ${
              activeTab === tab.id
                ? 'border-b-2 border-orange-500 text-orange-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Characteristics */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            CARACTERÍSTICAS
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'FUE', value: 0, base: 10 },
              { label: 'DES', value: 0, base: 10 },
              { label: 'CON', value: 0, base: 10 },
              { label: 'INT', value: 0, base: 11 },
              { label: 'SAB', value: 0, base: 10 },
              { label: 'CAR', value: 1, base: 12 },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="bg-gray-50 rounded-lg p-4 border">
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.base}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-50 rounded-lg p-4 border text-center">
              <div className="text-gray-500 text-sm">PUNTOS DE GOLPE</div>
              <div className="text-2xl font-bold">8</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border text-center">
              <div className="text-gray-500 text-sm">INICIATIVA</div>
              <div className="text-2xl font-bold">0</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border text-center">
              <div className="text-gray-500 text-sm">VELOCIDAD</div>
              <div className="text-2xl font-bold">30</div>
              <div className="text-gray-500 text-sm">PIES</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border text-center">
              <div className="text-gray-500 text-sm">CLASE DE ARMADURA</div>
              <div className="text-2xl font-bold">10</div>
            </div>
          </div>
        </div>

        {/* Right Column - Skills */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            HABILIDADES
          </h2>
          <div className="space-y-2">
            {[
              { name: 'Acrobacias (Des)', modifier: '+0' },
              { name: 'Arcanos (Int)', modifier: '+0' },
              { name: 'Atletismo (Fue)', modifier: '+0' },
              { name: 'Engañar (Car)', modifier: '+1' },
              { name: 'Historia (Int)', modifier: '+2' },
              { name: 'Interpretación (Car)', modifier: '+1' },
              { name: 'Intimidar (Car)', modifier: '+1' },
              { name: 'Investigación (Int)', modifier: '+0' },
              { name: 'Juego de Manos (Des)', modifier: '+0' },
              { name: 'Medicina (Sab)', modifier: '+0' },
            ].map((skill) => (
              <div
                key={skill.name}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
              >
                <span>{skill.name}</span>
                <span className="font-semibold">{skill.modifier}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}