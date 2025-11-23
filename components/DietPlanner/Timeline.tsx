'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Save, X } from 'lucide-react';

interface Meal {
  time: string;
  item: string;
  calories: number;
}

interface PlanDay {
  day: number;
  meals: Meal[];
}

interface TimelineProps {
  plan: PlanDay[];
  onUpdatePlan: (newPlan: PlanDay[]) => void;
}

export default function Timeline({ plan, onUpdatePlan }: TimelineProps) {
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [editedMeals, setEditedMeals] = useState<Meal[]>([]);

  const startEditing = (day: number, meals: Meal[]) => {
    setEditingDay(day);
    setEditedMeals([...meals]);
  };

  const cancelEditing = () => {
    setEditingDay(null);
    setEditedMeals([]);
  };

  const saveEditing = (dayIndex: number) => {
    const newPlan = [...plan];
    newPlan[dayIndex].meals = editedMeals;
    onUpdatePlan(newPlan);
    setEditingDay(null);
  };

  const updateMeal = (index: number, field: keyof Meal, value: string | number) => {
    const newMeals = [...editedMeals];
    newMeals[index] = { ...newMeals[index], [field]: value };
    setEditedMeals(newMeals);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <h3 className="text-2xl font-bold text-stone-800 mb-8 text-center">Your Personalized Schedule</h3>
      <div className="space-y-6">
        {plan.map((day, dayIndex) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: dayIndex * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-stone-100 flex flex-col md:flex-row gap-6 items-start md:items-center relative group"
          >
            <div className="flex-shrink-0 w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 font-bold text-xl">
              Day {day.day}
            </div>
            
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {editingDay === day.day ? (
                editedMeals.map((meal, i) => (
                  <div key={i} className="bg-stone-50 rounded-xl p-4 border border-orange-300">
                    <input 
                      value={meal.time}
                      onChange={(e) => updateMeal(i, 'time', e.target.value)}
                      className="text-xs font-bold text-stone-400 uppercase mb-1 bg-transparent w-full focus:outline-none"
                    />
                    <input 
                      value={meal.item}
                      onChange={(e) => updateMeal(i, 'item', e.target.value)}
                      className="font-bold text-stone-800 bg-transparent w-full focus:outline-none border-b border-stone-200 mb-1"
                    />
                    <div className="flex items-center gap-1">
                      <input 
                        type="number"
                        value={meal.calories}
                        onChange={(e) => updateMeal(i, 'calories', parseInt(e.target.value) || 0)}
                        className="text-sm text-orange-500 bg-transparent w-16 focus:outline-none"
                      />
                      <span className="text-sm text-orange-500">kcal</span>
                    </div>
                  </div>
                ))
              ) : (
                day.meals.map((meal, i) => (
                  <div key={i} className="bg-stone-50 rounded-xl p-4">
                    <div className="text-xs font-bold text-stone-400 uppercase mb-1">{meal.time}</div>
                    <div className="font-bold text-stone-800">{meal.item}</div>
                    <div className="text-sm text-orange-500">{meal.calories} kcal</div>
                  </div>
                ))
              )}
            </div>

            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              {editingDay === day.day ? (
                <>
                  <button 
                    onClick={() => saveEditing(dayIndex)}
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 shadow-lg"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={cancelEditing}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => startEditing(day.day, day.meals)}
                  className="p-2 bg-stone-800 text-white rounded-full hover:bg-stone-900 shadow-lg"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
