const DB_NAME = 'nutritionDB';
const DB_VERSION = 1;
const STORE_NAME = 'ingredients';

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject('Error opening database');
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('name', 'name', { unique: true });
        
        // Add some initial ingredients
        const initialIngredients = [
          { name: 'Chicken Breast', calories: 165, proteins: 31, carbs: 0, fats: 3.6 },
          { name: 'Brown Rice', calories: 216, proteins: 5, carbs: 45, fats: 1.8 },
          { name: 'Broccoli', calories: 55, proteins: 3.7, carbs: 11.2, fats: 0.6 },
          { name: 'Salmon', calories: 208, proteins: 22, carbs: 0, fats: 13 },
          { name: 'Sweet Potato', calories: 103, proteins: 2, carbs: 24, fats: 0.2 }
        ];

        initialIngredients.forEach(ingredient => {
          store.add(ingredient);
        });
      }
    };
  });
};

export const getAllIngredients = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME);
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        resolve(getAllRequest.result);
      };

      getAllRequest.onerror = () => {
        reject('Error getting ingredients');
      };
    };
  });
};
