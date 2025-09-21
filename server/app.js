const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// 1. Подключение к SQLite (файл базы будет создан автоматически)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './mydatabase.db', // файл базы
  logging: false, // отключаем логирование SQL-запросов
});

// 2. Определяем модель (таблицу) User
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// 3. Синхронизируем модель с базой (создаём таблицу, если её нет)
sequelize.sync();

// 4. Создаём Express-приложение
const app = express();
const cors = require('cors');
app.use(express.json(), cors);

// 5. Маршрут для добавления пользователя
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const user = await User.create({ name, email });
  res.json(user);
});

// 6. Маршрут для получения всех пользователей
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// 7. Запускаем сервер
const PORT = 3003; 
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
