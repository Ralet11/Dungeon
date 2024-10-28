import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sword, Book, Map, Users, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardCard = ({ icon: Icon, title, description, delay, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    onClick={onClick}
    className="bg-[#252940] p-6 rounded-lg shadow-lg relative overflow-hidden cursor-pointer hover:bg-[#1f233b] transition-colors"
  >
    <motion.div
      className="absolute inset-0 bg-purple-600 opacity-5"
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, 0],
      }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    />
    <div className="flex items-center mb-4">
      <Icon className="text-purple-400 mr-3" size={24} />
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <p className="text-[#9a8df2] mb-4">{description}</p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-300"
    >
      Explorar <ChevronRight size={16} className="ml-1" />
    </motion.button>
  </motion.div>
);

const HomeScreen = () => {

  const navigate = useNavigate()


  // Función de ejemplo para manejar el clic en cada card
  const handleCardClick = (title) => {
    navigate(`${title}`)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1b1f38] to-[#252940] text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <header className="text-center mb-12">
          <motion.div
            className="text-6xl mb-4 inline-block"
            animate={{ rotateY: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span role="img" aria-label="castle">🏰</span>
          </motion.div>
          <h1 className="text-4xl font-bold mb-2">Bienvenido al Reino, Aventurero</h1>
          <p className="text-[#9a8df2]">Tu épica jornada comienza aquí</p>
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-center"
        >
          <p className="text-[#9a8df2] mb-4">¿Listo para embarcarte en tu próxima aventura?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition-colors duration-300"
          >
            Comenzar Nueva Misión
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomeScreen;
