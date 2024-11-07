'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dice6, Shield, Swords, Scroll, Backpack, ChevronRight, ChevronLeft, Upload } from 'lucide-react'

const colors = {
  backgroundStart: '#1b1f38',
  backgroundEnd: '#252940',
  cardBackground: '#252940',
  cardHoverBackground: '#1f233b',
  cardAccent: '#9a8df2',
  buttonBackground: '#9a8df2',
  buttonText: '#ffffff',
  buttonHoverBackground: '#1f233b',
  textPrimary: '#ffffff',
  textSecondary: '#9a8df2',
  iconColor: '#9a8df2',
  purpleLight: '#9a8df2',
  purpleDark: '#252940',
}

const races = ['Human', 'Elf', 'Dwarf', 'Halfling', 'Dragonborn', 'Tiefling']
const classes = ['Fighter', 'Wizard', 'Rogue', 'Cleric', 'Bard', 'Paladin']
const backgrounds = ['Acolyte', 'Criminal', 'Folk Hero', 'Noble', 'Sage', 'Soldier']
const abilities = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']
const abilityScores = [15, 14, 13, 12, 9, 8]
const fears = ['Oscuridad', 'Soledad', 'Fallar', 'Perder a seres queridos', 'Ser débil'];
const hobbies = ['Leer', 'Pintar', 'Cazar', 'Cantar', 'Cocinar', 'Viajar'];
const traits = ['Valiente', 'Curioso', 'Compasivo', 'Impulsivo', 'Misterioso', 'Prudente'];


const classHitDice = {
  Fighter: 10,
  Wizard: 6,
  Rogue: 8,
  Cleric: 8,
  Bard: 8,
  Paladin: 10,
}

const classArmor = {
  Fighter: { name: 'Chain Mail', ac: 16 },
  Wizard: { name: 'No Armor', ac: 10 },
  Rogue: { name: 'Leather Armor', ac: 11 },
  Cleric: { name: 'Scale Mail', ac: 14 },
  Bard: { name: 'Leather Armor', ac: 11 },
  Paladin: { name: 'Chain Mail', ac: 16 },
}

const CharacterCreationStep = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    className="bg-[#252940] p-6 rounded-lg shadow-lg"
  >
    <h2 className="text-2xl font-bold mb-4 text-[#ffffff]">{title}</h2>
    {children}
  </motion.div>
)

export default function CharacterCreator() {
  const [step, setStep] = useState(0)
  const [character, setCharacter] = useState({
    name: '',
    race: '',
    class: '',
    background: '',
    abilities: Object.fromEntries(abilities.map(ability => [ability, 0])),
    equipment: [],
    image: null,
  })
  const [availableScores, setAvailableScores] = useState([...abilityScores])

  const updateCharacter = (field, value) => {
    setCharacter(prev => ({ ...prev, [field]: value }))
  }

  const assignAbilityScore = (ability, score) => {
    if (character.abilities[ability] !== 0) {
      setAvailableScores(prev => [...prev, character.abilities[ability]])
    }
    setCharacter(prev => ({
      ...prev,
      abilities: { ...prev.abilities, [ability]: score }
    }))
    setAvailableScores(prev => prev.filter(s => s !== score))
  }

  const calculateModifier = (score) => {
    return Math.floor((score - 10) / 2)
  }

  const calculateHP = () => {
    const constitutionModifier = calculateModifier(character.abilities.Constitution)
    const classHitDie = classHitDice[character.class] || 8
    return classHitDie + constitutionModifier
  }

  const calculateAC = () => {
    const baseAC = classArmor[character.class]?.ac || 10
    const dexModifier = calculateModifier(character.abilities.Dexterity)
    return baseAC + (baseAC < 14 ? dexModifier : 0) // Only add DEX mod for light armor
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateCharacter('image', reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const steps = [
    {
      title: "¿Quién eres?",
      content: (
        <>
          <input
            type="text"
            placeholder="Nombre de tu personaje"
            value={character.name}
            onChange={(e) => updateCharacter('name', e.target.value)}
            className="w-full p-2 mb-4 bg-[#1f233b] text-[#ffffff] rounded"
          />
          <select
            value={character.race}
            onChange={(e) => updateCharacter('race', e.target.value)}
            className="w-full p-2 mb-4 bg-[#1f233b] text-[#ffffff] rounded"
          >
            <option value="">Elige tu raza</option>
            {races.map(race => (
              <option key={race} value={race}>{race}</option>
            ))}
          </select>
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#9a8df2] border-dashed rounded-lg cursor-pointer bg-[#1f233b] hover:bg-[#252940]">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-[#9a8df2]" />
                <p className="mb-2 text-sm text-[#9a8df2]"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-[#9a8df2]">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
            </label>
          </div>
          {character.image && (
            <div className="mt-4">
              <img src={character.image} alt="Character" className="max-w-full h-auto rounded-lg" />
            </div>
          )}
        </>
      )
    },
    {
      title: "¿Cuál es tu vocación?",
      content: (
        <select
          value={character.class}
          onChange={(e) => updateCharacter('class', e.target.value)}
          className="w-full p-2 bg-[#1f233b] text-[#ffffff] rounded"
        >
          <option value="">Elige tu clase</option>
          {classes.map(cls => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      )
    },
    {
        title: "¿Cuál es tu historia?",
        content: (
          <>
            <select
              value={character.background}
              onChange={(e) => updateCharacter('background', e.target.value)}
              className="w-full p-2 bg-[#1f233b] text-[#ffffff] rounded"
            >
              <option value="">Elige tu trasfondo</option>
              {backgrounds.map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
      
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-[#ffffff] mb-2">Rasgos adicionales</h3>
      
              {/* Selección de Miedos */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#9a8df2] mb-1">Miedos</label>
                <select
                  value={character.fear || ''}
                  onChange={(e) => updateCharacter('fear', e.target.value)}
                  className="w-full p-2 bg-[#1f233b] text-[#ffffff] rounded mb-2"
                >
                  <option value="">Selecciona un miedo</option>
                  {fears.map(fear => (
                    <option key={fear} value={fear}>{fear}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Añadir otro miedo"
                  value={character.customFear || ''}
                  onChange={(e) => updateCharacter('customFear', e.target.value)}
                  className="w-full p-2 bg-[#1f233b] text-[#ffffff] rounded"
                />
              </div>
      
              {/* Selección de Hobbies */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#9a8df2] mb-1">Hobbies</label>
                <select
                  value={character.hobby || ''}
                  onChange={(e) => updateCharacter('hobby', e.target.value)}
                  className="w-full p-2 bg-[#1f233b] text-[#ffffff] rounded mb-2"
                >
                  <option value="">Selecciona un hobby</option>
                  {hobbies.map(hobby => (
                    <option key={hobby} value={hobby}>{hobby}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Añadir otro hobby"
                  value={character.customHobby || ''}
                  onChange={(e) => updateCharacter('customHobby', e.target.value)}
                  className="w-full p-2 bg-[#1f233b] text-[#ffffff] rounded"
                />
              </div>
      
              {/* Selección de Otros Rasgos */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#9a8df2] mb-1">Otros rasgos</label>
                <select
                  value={character.trait || ''}
                  onChange={(e) => updateCharacter('trait', e.target.value)}
                  className="w-full p-2 bg-[#1f233b] text-[#ffffff] rounded mb-2"
                >
                  <option value="">Selecciona un rasgo</option>
                  {traits.map(trait => (
                    <option key={trait} value={trait}>{trait}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Añadir otro rasgo"
                  value={character.customTrait || ''}
                  onChange={(e) => updateCharacter('customTrait', e.target.value)}
                  className="w-full p-2 bg-[#1f233b] text-[#ffffff] rounded"
                />
              </div>
            </div>
          </>
        )
      },
    {
      title: "¿Cuáles son tus habilidades?",
      content: (
        <div className="grid grid-cols-2 gap-4">
          {abilities.map(ability => (
            <div key={ability} className="flex items-center justify-between">
              <span className="text-[#ffffff]">{ability}</span>
              <select
                value={character.abilities[ability]}
                onChange={(e) => assignAbilityScore(ability, Number(e.target.value))}
                className="p-2 bg-[#1f233b] text-[#ffffff] rounded"
              >
                <option value={0}>Select</option>
                {availableScores.map(score => (
                  <option key={score} value={score}>{score}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "¿Qué llevas contigo?",
      content: (
        <div className="h-64 overflow-y-auto border border-[#9a8df2] rounded p-2">
          <div className="space-y-2">
            {['Espada corta', 'Arco largo', 'Grimorio', 'Símbolo sagrado', 'Herramientas de ladrón', 'Mochila'].map(item => (
              <div key={item} className="flex items-center">
                <input
                  type="checkbox"
                  id={item}
                  checked={character.equipment.includes(item)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateCharacter('equipment', [...character.equipment, item])
                    } else {
                      updateCharacter('equipment', character.equipment.filter(i => i !== item))
                    }
                  }}
                  className="mr-2"
                />
                <label htmlFor={item} className="text-[#ffffff]">{item}</label>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{
      backgroundImage: `linear-gradient(to bottom right, ${colors.backgroundStart}, ${colors.backgroundEnd})`,
    }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-[#ffffff] mb-2">Crea tu Héroe</h1>
          <p className="text-[#9a8df2]">Forja tu destino en el mundo de Dungeons & Dragons</p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <CharacterCreationStep key={step} title={steps[step].title}>
              {steps[step].content}
            </CharacterCreationStep>
          </AnimatePresence>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(prev => Math.max(0, prev - 1))}
              disabled={step === 0}
              className="px-4 py-2 bg-[#9a8df2] text-[#ffffff] rounded hover:bg-[#1f233b] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="inline mr-2" /> Anterior
            </button>
            <button
              onClick={() => setStep(prev => Math.min(steps.length - 1, prev + 1))}
              disabled={step === steps.length - 1}
              className="px-4 py-2 bg-[#9a8df2] text-[#ffffff] rounded hover:bg-[#1f233b] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente <ChevronRight className="inline ml-2" />
            </button>
          </div>
        </div>

        <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5 }}
  className="mt-12 p-6 bg-[#252940] rounded-lg shadow-lg"
>
  <h2 className="text-2xl font-bold mb-4 text-[#ffffff]">Hoja de Personaje</h2>
  <div className="grid grid-cols-3 gap-4">
    
    {/* Columna 1: Información Básica */}
    <div className="col-span-1">
      {character.image && (
        <img src={character.image} alt="Character" className="w-full h-auto rounded-lg mb-4" />
      )}
      <p className="text-[#ffffff]"><strong>Nombre:</strong> {character.name || 'Sin nombre'}</p>
      <p className="text-[#ffffff]"><strong>Raza:</strong> {character.race || 'No seleccionada'}</p>
      <p className="text-[#ffffff]"><strong>Clase:</strong> {character.class || 'No seleccionada'}</p>
      <p className="text-[#ffffff]"><strong>Trasfondo:</strong> {character.background || 'No seleccionado'}</p>
      <p className="text-[#ffffff]"><strong>PV:</strong> {calculateHP()}</p>
      <p className="text-[#ffffff]"><strong>CA:</strong> {calculateAC()}</p>
      <p className="text-[#ffffff]"><strong>Armadura:</strong> {classArmor[character.class]?.name || 'Ninguna'}</p>
    </div>
    
    {/* Columna 2: Habilidades */}
    <div className="col-span-1">
      <p className="text-[#ffffff] font-bold mb-2">Habilidades:</p>
      <ul>
        {Object.entries(character.abilities).map(([ability, score]) => (
          <li key={ability} className="text-[#ffffff]">
            {ability}: {score} (Mod: {calculateModifier(score)})
          </li>
        ))}
      </ul>
    </div>
    
    {/* Columna 3: Equipo */}
    <div className="col-span-1">
      <p className="text-[#ffffff] font-bold mb-2">Equipo:</p>
      <ul className="list-disc list-inside">
        {character.equipment.map(item => (
          <li key={item} className="text-[#ffffff]">{item}</li>
        ))}
      </ul>
    </div>
  </div>
  
  {/* Nueva Sección: Rasgos Adicionales */}
  <div className="mt-8">
    <h3 className="text-xl font-bold text-[#ffffff] mb-4">Rasgos Adicionales</h3>
    <p className="text-[#ffffff]"><strong>Miedos:</strong> {character.fear || character.customFear || 'No especificado'}</p>
    <p className="text-[#ffffff]"><strong>Hobbies:</strong> {character.hobby || character.customHobby || 'No especificado'}</p>
    <p className="text-[#ffffff]"><strong>Otros rasgos:</strong> {character.trait || character.customTrait || 'No especificado'}</p>
  </div>
</motion.div>

      
      </div>
    </div>
  )
}