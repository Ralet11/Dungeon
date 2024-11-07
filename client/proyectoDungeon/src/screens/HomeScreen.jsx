import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sword, Book, Map, Users, ChevronRight, X, Plus, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../utils/colors';

const characters = [
  { id: 1, name: "Elara", class: "Maga", avatar: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Thorian", class: "Guerrero", avatar: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Lyra", class: "Arquera", avatar: "/placeholder.svg?height=100&width=100" },
  { id: 4, name: "Zephyr", class: "Pícaro", avatar: "/placeholder.svg?height=100&width=100" },
];

const DashboardCard = ({ icon: Icon, title, description, delay, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    onClick={onClick}
    className="p-6 rounded-lg shadow-lg relative overflow-hidden cursor-pointer"
    style={{
      backgroundColor: colors.cardBackground,
      transition: 'background-color 0.3s',
    }}
  >
    <motion.div
      className="absolute inset-0"
      style={{
        backgroundColor: colors.cardAccent,
        opacity: 0.05,
      }}
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, 0],
      }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    />
    <div className="flex items-center mb-4">
      <Icon className="mr-3" size={24} style={{ color: colors.iconColor }} />
      <h3 className="text-xl font-bold" style={{ color: colors.textPrimary }}>{title}</h3>
    </div>
    <p style={{ color: colors.textSecondary }} className="mb-4">{description}</p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center transition-colors duration-300"
      style={{
        color: colors.purpleLight,
      }}
    >
      Explorar <ChevronRight size={16} className="ml-1" />
    </motion.button>
  </motion.div>
);

const CharacterOrb = ({ selectedCharacter, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-8 right-8 cursor-pointer"
    onClick={onClick}
  >
    <div className="relative">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: colors.purpleLight,
          opacity: 0.3,
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <img
        src={selectedCharacter.avatar}
        alt={selectedCharacter.name}
        className="w-16 h-16 rounded-full border-4"
        style={{ borderColor: colors.iconColor }}
      />
    </div>
  </motion.div>
);

const CharacterSelection = ({ onClose, onSelect, selectedCharacter }) => {
  const navigate = useNavigate();

  const handleAddHero = () => {
    navigate('/CharacterCreation'); // Cambia esta ruta según la URL de tu pantalla de creación de personajes
  };


  const goToHereoProfile = () => {
    navigate('/CharacterProfile'); // Cambia esta ruta según la URL de tu pantalla de perfil de personajes
    onclose()
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <div className="p-8 rounded-lg shadow-xl max-w-md w-full"
        style={{ backgroundColor: colors.cardBackground }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>Elige tu Héroe</h2>
          <button onClick={onclose} className="p-2">
            <X size={24} style={{ color: colors.textSecondary }} />
          </button>
        </div>

        <button
          onClick={handleAddHero}
          className="flex items-center mb-4 p-2 rounded-lg"
          style={{
            backgroundColor: colors.purpleLight,
            color: colors.buttonText,
            transition: 'background-color 0.3s',
          }}
        >
          <Plus className="mr-2" size={20} />
          Agregar Nuevo Héroe
        </button>

        <div
          className="overflow-y-auto h-[300px] p-4 rounded-md border custom-scrollbar"
          style={{
            borderColor: colors.purpleLight,
          }}
        >
          {characters.map((character) => (
            <motion.div
              key={character.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center p-3 rounded-lg cursor-pointer mb-2 ${selectedCharacter.id === character.id ? 'bg-accent' : 'hover:bg-accent/50'}`}
              onClick={() => goToHereoProfile()}
              style={{
                backgroundColor: selectedCharacter.id === character.id ? colors.purpleLight : 'transparent',
                transition: 'background-color 0.2s',
              }}
            >
              <img src={character.avatar} alt={character.name} className="mr-4 w-12 h-12 rounded-full" />
              <div>
                <h3 className="font-semibold" style={{ color: colors.textPrimary }}>{character.name}</h3>
                <p className="text-sm" style={{ color: colors.textSecondary }}>{character.class}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const HomeScreen = () => {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [isSelectionOpen, setIsSelectionOpen] = useState(false);

  const handleCardClick = (title) => {
    navigate(`/${title}`);
  };

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    setIsSelectionOpen(false);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${colors.backgroundStart}, ${colors.backgroundEnd})`,
        color: colors.textPrimary,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto p-8"
      >
        <header className="text-center mb-12">
          <motion.div
            className="text-6xl mb-4 inline-block"
            animate={{ rotateY: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span role="img" aria-label="castle">🏰</span>
          </motion.div>
          <h1 className="text-4xl font-bold mb-2">Bienvenido al Reino, {selectedCharacter.name}</h1>
          <p style={{ color: colors.textSecondary }}>Tu épica jornada como {selectedCharacter.class} comienza aquí</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <DashboardCard
            icon={Shield}
            title="Misiones Activas"
            description="Explora tus misiones en curso y descubre nuevas aventuras."
            delay={0.2}
            onClick={() => handleCardClick("Misiones Activas")}
          />
          <DashboardCard
            icon={Sword}
            title="Arsenal Mágico"
            description="Gestiona tu inventario de armas y artefactos místicos."
            delay={0.4}
            onClick={() => handleCardClick("Arsenal Mágico")}
          />
          <DashboardCard
            icon={Book}
            title="Grimorio"
            description="Consulta tus hechizos y aprende nuevas magias arcanas."
            delay={0.6}
            onClick={() => handleCardClick("Grimorio")}
          />
          <DashboardCard
            icon={Map}
            title="Mapas del Reino"
            description="Descubre nuevos territorios y planifica tus expediciones."
            delay={0.8}
            onClick={() => handleCardClick("mapMain")}
          />
          <DashboardCard
            icon={Users}
            title="Gremio de Aventureros"
            description="Conéctate con otros héroes y forma alianzas poderosas."
            delay={1}
            onClick={() => handleCardClick("Gremio de Aventureros")}
          />
          <DashboardCard
            icon={Globe}
            title="Online world"
            description="Ingresa en el mundo pvp y pbe y demuestra tus habilidades"
            delay={1.2}
            onClick={() => handleCardClick("freeWorld")}
          />
        </div>
        

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-center"
        >
          <p style={{ color: colors.textSecondary }} className="mb-4">¿Listo para embarcarte en tu próxima aventura, {selectedCharacter.name}?</p>
          <button
            style={{
              backgroundColor: colors.buttonBackground,
              color: colors.buttonText,
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              transition: 'background-color 0.3s',
            }}
            className="font-bold hover:bg-purple-700"
          >
            Comenzar Nueva Misión
          </button>
        </motion.div>
      </motion.div>

      <CharacterOrb
        selectedCharacter={selectedCharacter}
        onClick={() => setIsSelectionOpen(true)}
      />

      <AnimatePresence>
        {isSelectionOpen && (
          <CharacterSelection
            onClose={() => setIsSelectionOpen(false)}
            onSelect={handleCharacterSelect}
            selectedCharacter={selectedCharacter}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeScreen;
