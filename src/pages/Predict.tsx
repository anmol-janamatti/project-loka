import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Telescope, ArrowLeft, Loader2 } from 'lucide-react';

interface FormData {
  orbital_period: string;
  transit_depth: string;
  transit_duration: string;
  signal_to_noise: string;
  insolation_flux: string;
}

export default function Predict() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    orbital_period: '',
    transit_depth: '',
    transit_duration: '',
    signal_to_noise: '',
    insolation_flux: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://backend-exo.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orbital_period: parseFloat(formData.orbital_period),
          transit_depth: parseFloat(formData.transit_depth),
          transit_duration: parseFloat(formData.transit_duration),
          signal_to_noise: parseFloat(formData.signal_to_noise),
          insolation_flux: parseFloat(formData.insolation_flux)
        })
      });

      const result = await response.json();
      navigate('/result', { state: result });
    } catch (error) {
      console.error('Prediction error:', error);
      alert('Failed to connect to prediction service. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-blue-300 hover:text-blue-200 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-slate-800/50 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-700"
        >
          <div className="flex items-center justify-center mb-8">
            <Telescope className="w-12 h-12 text-blue-400 mr-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Exoplanet Prediction
            </h1>
          </div>

          <p className="text-blue-200 text-center mb-8">
            Enter the transit observation parameters below
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-blue-300 mb-2">
                Orbital Period (days)
              </label>
              <input
                type="number"
                step="any"
                name="orbital_period"
                value={formData.orbital_period}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., 3.52"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-300 mb-2">
                Transit Depth (ppm)
              </label>
              <input
                type="number"
                step="any"
                name="transit_depth"
                value={formData.transit_depth}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., 200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-300 mb-2">
                Transit Duration (hours)
              </label>
              <input
                type="number"
                step="any"
                name="transit_duration"
                value={formData.transit_duration}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., 2.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-300 mb-2">
                Signal to Noise Ratio
              </label>
              <input
                type="number"
                step="any"
                name="signal_to_noise"
                value={formData.signal_to_noise}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., 15.2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-300 mb-2">
                Insolation Flux
              </label>
              <input
                type="number"
                step="any"
                name="insolation_flux"
                value={formData.insolation_flux}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., 1.2"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Predict'
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
