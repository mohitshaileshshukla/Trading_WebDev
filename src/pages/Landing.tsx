import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart4, TrendingUp, Shield, Zap } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import ThemeToggle from '../components/shared/ThemeToggle';
import Button from '../components/shared/Button';

const Landing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-animated-gradient dark:from-blue-900 dark:to-blue-700 relative flex flex-col">
      {/* Animated Background Circles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0.1 + Math.random() * 0.3,
            scale: 0.5 + Math.random() * 2,
          }}
          animate={{
            y: [null, Math.random() * 100 - 50, null],
            x: [null, Math.random() * 100 - 50, null],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            width: `${50 + Math.random() * 150}px`,
            height: `${50 + Math.random() * 150}px`,
          }}
        />
      ))}

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Main container */}
      <div className="container mx-auto px-4 py-12 relative z-10 flex-grow">
        <div className="flex flex-col items-center justify-center text-white text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            ProfNITT Task
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg mb-2"
          >
            Made by Mohit Shukla
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl max-w-3xl mb-12"
          >
            Your intelligent virtual trading platform that helps you make smarter trading decisions with powerful tools, real-time insights and advanced
            technical indicators.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white/30 dark:bg-gray-900/70 backdrop-blur-md rounded-xl border border-white/20 dark:border-gray-700 shadow-lg p-8 text-gray-900 dark:text-white"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {activeTab === 'login'
                    ? 'Sign in to access your portfolio and continue trading'
                    : 'Join us to start your virtual trading journey'}
                </p>
              </div>

              <div className="flex border-b border-gray-300 dark:border-gray-600 mb-6">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-2 text-center ${
                    activeTab === 'login'
                      ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 py-2 text-center ${
                    activeTab === 'register'
                      ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  Register
                </button>
              </div>

              {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col justify-center"
            >
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="mb-3 bg-indigo-800/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                    <BarChart4 className="h-6 w-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Advanced Stock Screening</h3>
                  <p className="text-white/90">
                    Filter and analyze NIFTY 50 stocks with technical indicators like RSI and moving averages to identify potential buying and selling opportunities.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="mb-3 bg-sky-400/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                    <TrendingUp className="h-6 w-6 text-sky-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Real-time Portfolio Tracking</h3>
                  <p className="text-white/90">
                    Monitor your holdings, track performance, and visualize your portfolio allocation with interactive charts.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="mb-3 bg-blue-300/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="h-6 w-6 text-blue-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Trade Simulation</h3>
                  <p className="text-white/90">
                    Practice trading strategies without risk using virtual money, based on real-time market data and technical indicators for better decision making.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* How It Works Section - full width */}
      <section className="w-full py-16 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get started with your virtual trading journey in just a few simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative flex flex-col"
            >
              <div className="card p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md flex-grow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mr-4">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Create an Account</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Sign up for a free account to access all features and start your virtual trading journey.
                </p>
              </div>
              {/* Arrow to Step 2 */}
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M39.5303 6.53033C39.8232 6.23744 39.8232 5.76256 39.5303 5.46967L34.7574 0.696699C34.4645 0.403806 33.9896 0.403806 33.6967 0.696699C33.4038 0.989593 33.4038 1.46447 33.6967 1.75736L37.9393 6L33.6967 10.2426C33.4038 10.5355 33.4038 11.0104 33.6967 11.3033C33.9896 11.5962 34.4645 11.5962 34.7574 11.3033L39.5303 6.53033ZM0 6.75H39V5.25H0V6.75Z" fill="#D1D5DB"/>
                </svg>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative flex flex-col"
            >
              <div className="card p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md flex-grow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mr-4">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Explore Features</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Use advanced stock screening, real-time portfolio tracking, and trade simulations to practice trading.
                </p>
              </div>
              {/* Arrow to Step 3 - **correct direction** */}
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M39.5303 6.53033C39.8232 6.23744 39.8232 5.76256 39.5303 5.46967L34.7574 0.696699C34.4645 0.403806 33.9896 0.403806 33.6967 0.696699C33.4038 0.989593 33.4038 1.46447 33.6967 1.75736L37.9393 6L33.6967 10.2426C33.4038 10.5355 33.4038 11.0104 33.6967 11.3033C33.9896 11.5962 34.4645 11.5962 34.7574 11.3033L39.5303 6.53033ZM0 6.75H39V5.25H0V6.75Z" fill="#D1D5DB"/>
                </svg>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative flex flex-col"
            >
              <div className="card p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md flex-grow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mr-4">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Start Trading</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Begin trading virtually with real-time market data and develop your strategies risk-free.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 mt-auto">
        <div className="container mx-auto px-4 flex items-center">

          {/* Left: Website Name and Made by Mohit */}
          <div className="flex flex-col text-left space-y-1">
            <div className="text-2xl font-extrabold">Profnitt Task</div>
            <div className="text-sm">Made by Mohit</div>
          </div>

          {/* Center: Copyright */}
          <div className="flex-grow text-center text-xs md:text-sm">
            &copy; {new Date().getFullYear()} Profnitt Task. All rights reserved.
          </div>

          {/* Right: Email icon, GitHub icon, Privacy & Terms */}
          <div className="flex items-center space-x-6 text-sm">

            {/* Email Link with Envelope Icon */}
            <a
              href="mailto:mohitshaileshshukla@gmail.com"
              className="flex items-center hover:text-white"
              aria-label="Email"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V8a2 2 0 00-2-2H3a2 2 0 00-2 2v6a2 2 0 002 2z"
                />
              </svg>
              <span> </span>
            </a>

            {/* GitHub Icon */}
            <a
              href="https://github.com/mohitshaileshshukla"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="GitHub"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12a10 10 0 006.837 9.488c.5.093.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.104-.254-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025a9.564 9.564 0 012.5-.336 9.56 9.56 0 012.5.336c1.91-1.294 2.75-1.025 2.75-1.025.546 1.376.204 2.392.1 2.646.64.7 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.565 4.935.359.31.678.922.678 1.858 0 1.34-.012 2.42-.012 2.75 0 .268.18.58.688.48A10.002 10.002 0 0022 12c0-5.523-4.477-10-10-10z"
                />
              </svg>
            </a>

            {/* Privacy Policy */}
            <a href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </a>

            {/* Terms of Service */}
            <a href="/terms-of-service" className="hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>


    </div>
  );
};

export default Landing;
