'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import PlannerWizard from '@/components/DietPlanner/PlannerWizard';
import Timeline from '@/components/DietPlanner/Timeline';
import { motion, AnimatePresence } from 'framer-motion';

export default function Planner() {
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [planId, setPlanId] = useState<number | null>(null);

  const generatePlan = async (data: any) => {
    setLoading(true);
    // Simulate AI generation delay for effect
    await new Promise(resolve => setTimeout(resolve, 2000));

    const days = data.duration === 'Weekly' ? 7 : 30;
    const generatedPlan = Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      meals: [
        { time: 'Breakfast', item: 'Oatmeal with Berries', calories: 350 },
        { time: 'Snack', item: 'Fresh Apple', calories: 95 },
        { time: 'Lunch', item: 'Grilled Chicken Salad with Avocado', calories: 450 },
        { time: 'Snack', item: 'Banana', calories: 105 },
        { time: 'Dinner', item: 'Salmon with Asparagus', calories: 500 },
      ]
    }));

    // Save to API
    try {
      const res = await fetch('/api/diet-plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${data.goal} Plan`,
          duration: data.duration,
          goal: data.goal,
          plan_data: generatedPlan
        })
      });
      const result = await res.json();
      if (result.success) {
        setPlanId(result.id);
      }
    } catch (error) {
      console.error('Failed to save plan', error);
    }

    setPlan(generatedPlan);
    setLoading(false);
  };

  const saveChanges = async () => {
    if (!planId) return;
    try {
      await fetch('/api/diet-plans', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: planId,
          plan_data: plan
        })
      });
      alert('Plan updated successfully!');
    } catch (error) {
      console.error('Failed to update plan', error);
      alert('Failed to update plan');
    }
  };

  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
            Smart <span className="text-orange-500">Diet Planner</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            Generate a personalized nutrition schedule tailored to your goals using our advanced AI algorithm.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!plan && !loading && (
            <motion.div
              key="wizard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <PlannerWizard onComplete={generatePlan} />
            </motion.div>
          )}

          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4"></div>
              <p className="text-stone-500 font-medium animate-pulse">Generating your personalized plan...</p>
            </motion.div>
          )}

          {plan && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex justify-center mb-8 gap-4">
                <button 
                  onClick={() => setPlan(null)}
                  className="text-stone-500 hover:text-orange-500 underline"
                >
                  Create New Plan
                </button>
                <button 
                  onClick={saveChanges}
                  className="px-6 py-2 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-colors shadow-lg"
                >
                  Save Changes
                </button>
              </div>
              <Timeline plan={plan} onUpdatePlan={setPlan} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
