import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Telescope } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-block mb-6"
        >
          <Telescope className="w-20 h-20 text-blue-400 mx-auto" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Exoplanet Detection AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-blue-200 mb-12 leading-relaxed"
        >
          Harness the power of machine learning to discover distant worlds.
          Analyze transit data and predict exoplanet candidates with confidence.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: 'spring' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/predict')}
          className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold px-12 py-4 rounded-full shadow-2xl transition-all duration-300 hover:shadow-blue-500/50"
        >
          Start Prediction
        </motion.button>
      </motion.div>
    </div>
  );
}
