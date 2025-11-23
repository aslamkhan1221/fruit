'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Calendar, Activity, Utensils } from 'lucide-react';

interface PlannerWizardProps {
  onComplete: (data: any) => void;
}

export default function PlannerWizard({ onComplete }: PlannerWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: '',
    duration: '',
    preference: '',
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onComplete(formData);
  };

  const updateData = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 border border-stone-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-stone-100">
        <motion.div 
          className="h-full bg-orange-500"
          initial={{ width: '0%' }}
          animate={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <div className="mt-8">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-3xl font-bold text-stone-800 mb-6 flex items-center gap-3">
              <Activity className="text-orange-500" /> What is your goal?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Weight Loss', 'Maintenance', 'Muscle Gain'].map((option) => (
                <button
                  key={option}
                  onClick={() => updateData('goal', option)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${
                    formData.goal === option 
                      ? 'border-orange-500 bg-orange-50 text-orange-700' 
                      : 'border-stone-100 hover:border-orange-200'
                  }`}
                >
                  <span className="font-bold text-lg block mb-2">{option}</span>
                  <span className="text-sm text-stone-500">Optimized fruit selection for {option.toLowerCase()}.</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-3xl font-bold text-stone-800 mb-6 flex items-center gap-3">
              <Calendar className="text-orange-500" /> Duration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Weekly', 'Monthly'].map((option) => (
                <button
                  key={option}
                  onClick={() => updateData('duration', option)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${
                    formData.duration === option 
                      ? 'border-orange-500 bg-orange-50 text-orange-700' 
                      : 'border-stone-100 hover:border-orange-200'
                  }`}
                >
                  <span className="font-bold text-lg block mb-2">{option} Plan</span>
                  <span className="text-sm text-stone-500">Get a complete schedule for {option === 'Weekly' ? '7 days' : '30 days'}.</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-3xl font-bold text-stone-800 mb-6 flex items-center gap-3">
              <Utensils className="text-orange-500" /> Preferences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Fruits Only', 'Mixed with Veggies'].map((option) => (
                <button
                  key={option}
                  onClick={() => updateData('preference', option)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${
                    formData.preference === option 
                      ? 'border-orange-500 bg-orange-50 text-orange-700' 
                      : 'border-stone-100 hover:border-orange-200'
                  }`}
                >
                  <span className="font-bold text-lg block mb-2">{option}</span>
                  <span className="text-sm text-stone-500">Select your dietary preference.</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-12 flex justify-end">
        <button
          onClick={handleNext}
          disabled={
            (step === 1 && !formData.goal) ||
            (step === 2 && !formData.duration) ||
            (step === 3 && !formData.preference)
          }
          className="px-8 py-3 bg-stone-800 text-white rounded-full font-bold flex items-center gap-2 hover:bg-stone-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {step === 3 ? 'Generate Plan' : 'Next Step'}
          {step === 3 ? <Check className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
