import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useEffect } from 'react';

interface ResultData {
  prediction: string;
  confidence: number;
}

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state as ResultData;

  useEffect(() => {
    if (!result) {
      navigate('/predict');
    }
  }, [result, navigate]);

  if (!result) {
    return null;
  }

  const isExoplanet = result.prediction === 'Exoplanet';

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        isExoplanet
          ? 'bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900'
          : 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          {isExoplanet ? (
            <CheckCircle className="w-32 h-32 text-green-400 mx-auto" />
          ) : (
            <XCircle className="w-32 h-32 text-red-400 mx-auto" />
          )}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`text-5xl md:text-7xl font-bold mb-6 ${
            isExoplanet ? 'text-green-300' : 'text-red-300'
          }`}
        >
          {isExoplanet ? 'Hurray! Congrats!' : 'Oh nooo!'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl md:text-4xl text-white mb-8"
        >
          {isExoplanet ? "It's a planet!" : 'Not a planet.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-10 border border-white/20"
        >
          <p className="text-blue-200 text-lg mb-2">Confidence Score</p>
          <p className="text-5xl font-bold text-white">
            {(result.confidence * 100).toFixed(1)}%
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/predict')}
          className={`${
            isExoplanet
              ? 'bg-green-500 hover:bg-green-600 shadow-green-500/50'
              : 'bg-red-500 hover:bg-red-600 shadow-red-500/50'
          } text-white text-lg font-semibold px-12 py-4 rounded-full shadow-2xl transition-all duration-300 flex items-center mx-auto`}
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Try Again
        </motion.button>
      </motion.div>
    </div>
  );
}
