import React, { useEffect, useState } from 'react';
import { initDB, getAllIngredients, addIngredient, updateIngredient, deleteIngredient } from '../services/db';

function Dashboard() {
  const [ingredients, setIngredients] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0
  });

  useEffect(() => {
    const setupDB = async () => {
      await initDB();
      const items = await getAllIngredients();
      setIngredients(items);
    };

    setupDB();
  }, []);

  const handleAddNew = async () => {
    try {
      await addIngredient(newIngredient);
      const updatedIngredients = await getAllIngredients();
      setIngredients(updatedIngredients);
      setIsAddingNew(false);
      setNewIngredient({
        name: '',
        calories: 0,
        proteins: 0,
        carbs: 0,
        fats: 0
      });
    } catch (error) {
      console.error('Error adding ingredient:', error);
    }
  };

  const handleUpdate = async (ingredient) => {
    try {
      await updateIngredient(ingredient);
      const updatedIngredients = await getAllIngredients();
      setIngredients(updatedIngredients);
      setEditingId(null);
    } catch (error) {
      console.error('Error updating ingredient:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this ingredient?')) {
      try {
        await deleteIngredient(id);
        const updatedIngredients = await getAllIngredients();
        setIngredients(updatedIngredients);
      } catch (error) {
        console.error('Error deleting ingredient:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Nutrition Dashboard</h1>
          <button
            onClick={() => setIsAddingNew(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Add New Ingredient
          </button>
        </div>

        {isAddingNew && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Add New Ingredient</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="border p-2 rounded"
                value={newIngredient.name}
                onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
              />
              <input
                type="number"
                placeholder="Calories"
                className="border p-2 rounded"
                value={newIngredient.calories}
                onChange={(e) => setNewIngredient({...newIngredient, calories: Number(e.target.value)})}
              />
              <input
                type="number"
                placeholder="Proteins"
                className="border p-2 rounded"
                value={newIngredient.proteins}
                onChange={(e) => setNewIngredient({...newIngredient, proteins: Number(e.target.value)})}
              />
              <input
                type="number"
                placeholder="Carbs"
                className="border p-2 rounded"
                value={newIngredient.carbs}
                onChange={(e) => setNewIngredient({...newIngredient, carbs: Number(e.target.value)})}
              />
              <input
                type="number"
                placeholder="Fats"
                className="border p-2 rounded"
                value={newIngredient.fats}
                onChange={(e) => setNewIngredient({...newIngredient, fats: Number(e.target.value)})}
              />
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={handleAddNew}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsAddingNew(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredients.map((ingredient) => (
            <div key={ingredient.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
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
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div className="bg-blue-600 h-2.5 rounded-full" 
                       style={{ width: `${(ingredient.proteins + ingredient.carbs + ingredient.fats) / 100 * 100}%` }}>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingId(ingredient.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ingredient.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {editingId === ingredient.id && (
                <div className="absolute inset-0 bg-white p-6">
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      className="border p-2 rounded"
                      value={ingredient.name}
                      onChange={(e) => {
                        const updated = {...ingredient, name: e.target.value};
                        setIngredients(ingredients.map(i => i.id === ingredient.id ? updated : i));
                      }}
                    />
                    <input
                      type="number"
                      className="border p-2 rounded"
                      value={ingredient.calories}
                      onChange={(e) => {
                        const updated = {...ingredient, calories: Number(e.target.value)};
                        setIngredients(ingredients.map(i => i.id === ingredient.id ? updated : i));
                      }}
                    />
                    <input
                      type="number"
                      className="border p-2 rounded"
                      value={ingredient.proteins}
                      onChange={(e) => {
                        const updated = {...ingredient, proteins: Number(e.target.value)};
                        setIngredients(ingredients.map(i => i.id === ingredient.id ? updated : i));
                      }}
                    />
                    <input
                      type="number"
                      className="border p-2 rounded"
                      value={ingredient.carbs}
                      onChange={(e) => {
                        const updated = {...ingredient, carbs: Number(e.target.value)};
                        setIngredients(ingredients.map(i => i.id === ingredient.id ? updated : i));
                      }}
                    />
                    <input
                      type="number"
                      className="border p-2 rounded"
                      value={ingredient.fats}
                      onChange={(e) => {
                        const updated = {...ingredient, fats: Number(e.target.value)};
                        setIngredients(ingredients.map(i => i.id === ingredient.id ? updated : i));
                      }}
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdate(ingredient)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
