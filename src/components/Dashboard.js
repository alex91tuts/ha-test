import React, { useEffect, useState } from 'react';
import { initDB, getAllIngredients } from '../services/db';

function Dashboard() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const setupDB = async () => {
      await initDB();
      const items = await getAllIngredients();
      setIngredients(items);
    };

    setupDB();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Nutrition Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredients.map((ingredient) => (
            <div key={ingredient.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{ingredient.name}</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Calories</span>
                    <span className="font-medium text-indigo-600">{ingredient.calories} kcal</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Proteins</span>
                    <span className="font-medium text-green-600">{ingredient.proteins}g</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Carbs</span>
                    <span className="font-medium text-yellow-600">{ingredient.carbs}g</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Fats</span>
                    <span className="font-medium text-red-600">{ingredient.fats}g</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" 
                       style={{ width: `${(ingredient.proteins + ingredient.carbs + ingredient.fats) / 100 * 100}%` }}>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
