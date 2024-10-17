import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast.error('Por favor, ingresa un email válido.');
      return;
    }

    if (password.trim() === '') {
      toast.error('La contraseña no puede estar vacía.');
      return;
    }

    setIsLoading(true);

    // Simular proceso de login
    setTimeout(() => {
      setIsLoading(false);
      if (email === 'test@example.com' && password === 'password123') {
        toast.success('Inicio de sesión exitoso!');
        navigate('/');
      } else {
        toast.error('Credenciales incorrectas, por favor intenta nuevamente.');
      }
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1b1f38] to-[#252940]">
      <Toaster position="top-right" reverseOrder={false} />
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-[#252940] rounded-lg shadow-lg text-center relative overflow-hidden"
      >
        <motion.div 
          className="absolute inset-0 bg-purple-600 opacity-10"
          animate={{ 
            scale: [1, 1.2, 1.2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        />
        <div className="mb-6 relative z-10">
          <motion.div 
            className="text-6xl mb-4"
            animate={{ rotateY: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span role="img" aria-label="shield">🛡️</span>
          </motion.div>
          <h2 className="text-white text-3xl font-bold mb-2">Portal del Aventurero</h2>
          <p className="text-[#9a8df2]">Ingresa tus runas arcanas para acceder</p>
        </div>
        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <input
              type="text"
              placeholder="Pergamino de Identidad (Email)"
              className="w-full p-3 mb-4 rounded-md border border-gray-400 bg-[#1b1f38] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <input
              type="password"
              placeholder="Palabra de Poder (Contraseña)"
              className="w-full p-3 mb-6 rounded-md border border-gray-400 bg-[#1b1f38] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 mb-4 bg-purple-600 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300 relative overflow-hidden"
            disabled={isLoading}
          >
            <span className="relative z-10">
              {isLoading ? 'Invocando...' : 'Invocar Portal'}
            </span>
            <motion.div
              className="absolute inset-0 bg-purple-700"
              initial={{ x: "100%" }}
              animate={isLoading ? { x: "0%" } : { x: "100%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </form>
        <motion.div 
          className="flex justify-between text-[#9a8df2]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <a href="#" className="hover:underline hover:text-purple-400 transition-colors duration-300">Olvidaste tu runa?</a>
          <a href="#" className="hover:underline hover:text-purple-400 transition-colors duration-300">Unirse a la hermandad</a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
