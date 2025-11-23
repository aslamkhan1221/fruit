const { openDb } = require('./db');

async function setup() {
  const db = await openDb();
  await db.exec('DROP TABLE IF EXISTS fruits');
  await db.exec('CREATE TABLE IF NOT EXISTS fruits (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, description TEXT, image TEXT, category TEXT)');
  await db.exec('CREATE TABLE IF NOT EXISTS diet_plans (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, duration TEXT, goal TEXT, plan_data TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)');
  
  const fruits = [
    { name: 'Organic Apple', price: 2.5, description: 'Fresh organic apples from the valley.', image: '/fruits/apple.png', category: 'Fresh' },
    { name: 'Banana Bunch', price: 1.2, description: 'Sweet and ripe bananas.', image: '/fruits/banana.png', category: 'Fresh' },
    { name: 'Exotic Dragonfruit', price: 5.0, description: 'Vibrant and delicious dragonfruit.', image: '/fruits/dragonfruit.png', category: 'Exotic' },
    { name: 'Juicy Orange', price: 3.0, description: 'Vitamin C packed oranges.', image: '/fruits/orange.png', category: 'Citrus' },
    { name: 'Fresh Berries', price: 4.5, description: 'Mixed berries for your smoothie.', image: '/fruits/berries.png', category: 'Berries' },
    { name: 'Mango', price: 3.5, description: 'King of fruits, sweet and juicy.', image: '/fruits/mango.png', category: 'Tropical' },
    { name: 'Avocado', price: 2.8, description: 'Creamy and perfect for toast.', image: '/fruits/avocado.png', category: 'Fresh' },
    { name: 'Pineapple', price: 4.0, description: 'Tropical sweetness in every bite.', image: '/fruits/pineapple.png', category: 'Tropical' },
  ];

  const stmt = await db.prepare('INSERT INTO fruits (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)');
  for (const fruit of fruits) {
    await stmt.run(fruit.name, fruit.price, fruit.description, fruit.image, fruit.category);
  }
  await stmt.finalize();

  console.log('Database seeded!');
}

setup().catch(err => {
    console.error(err);
    process.exit(1);
});
