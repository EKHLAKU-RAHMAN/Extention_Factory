import React from 'react';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  CodeBracketIcon, 
  RocketLaunchIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: CodeBracketIcon,
      title: 'AI-Powered Generation',
      description: 'Transform your ideas into fully functional Chrome extensions using advanced AI technology.'
    },
    {
      icon: SparklesIcon,
      title: 'No Coding Required',
      description: 'Simply describe what you want, and our AI will generate clean, production-ready code.'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Instant Download',
      description: 'Get your extension as a ready-to-install ZIP file in seconds, not hours.'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Describe Your Extension',
      description: 'Write a simple prompt describing what you want your Chrome extension to do.'
    },
    {
      step: '02',
      title: 'AI Generates Code',
      description: 'Our AI analyzes your request and creates all necessary files with clean, optimized code.'
    },
    {
      step: '03',
      title: 'Download & Install',
      description: 'Get your extension as a ZIP file and install it directly in your Chrome browser.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gradient leading-tight">
                  Extension Factory
                </h1>
                <p className="text-xl text-muted leading-relaxed">
                  Transform your ideas into powerful Chrome extensions with AI. 
                  No coding required. Just describe what you want, and we'll build it for you.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn-primary px-8 py-4 text-lg"
                >
                  Start Creating
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </button>
                <button
                  onClick={() => navigate('/demo')}
                  className="btn-secondary px-8 py-4 text-lg"
                >
                  View Demo
                </button>
              </div>

              <div className="flex items-center gap-8 text-sm text-subtle">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-success-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-success-500" />
                  <span>Free to start</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <div className="card p-8 glass-effect">
                  <div className="space-y-4">
                    <div className="loading-skeleton h-4 w-3/4"></div>
                    <div className="loading-skeleton h-4 w-full"></div>
                    <div className="loading-skeleton h-4 w-2/3"></div>
                    <div className="flex gap-2">
                      <div className="loading-skeleton h-8 flex-1"></div>
                      <div className="loading-skeleton h-8 flex-1"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-2xl transform rotate-6 opacity-20"></div>
            </motion.div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-gentle"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Everything you need to create professional Chrome extensions without writing a single line of code.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card interactive>
                  <Card.Body>
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                      <feature.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-muted">{feature.description}</p>
                  </Card.Body>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-secondary-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Create your Chrome extension in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="gradient-bg text-white p-12">
              <h2 className="text-4xl font-bold mb-4">Ready to Build Your Extension?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of developers creating Chrome extensions with AI
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-white text-primary-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-lg flex items-center justify-center mx-auto group"
              >
                Get Started Free
                <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
