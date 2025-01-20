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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Ingredients Dashboard</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Calories</th>
              <th className="px-6 py-3 text-left">Proteins (g)</th>
              <th className="px-6 py-3 text-left">Carbs (g)</th>
              <th className="px-6 py-3 text-left">Fats (g)</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient) => (
              <tr key={ingredient.id} className="border-b">
                <td className="px-6 py-4">{ingredient.name}</td>
                <td className="px-6 py-4">{ingredient.calories}</td>
                <td className="px-6 py-4">{ingredient.proteins}</td>
                <td className="px-6 py-4">{ingredient.carbs}</td>
                <td className="px-6 py-4">{ingredient.fats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
