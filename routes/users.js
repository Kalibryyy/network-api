const router = require('express').Router();
const { getUsers, createUser } = require('../controllers/users');
const { validateCreateUser } = require('../middlewares/validations');

// возвращает информацию о пользователе (email и name)
router.get('/', getUsers);

// создаёт пользователя с переданными в теле name, password, email, (image)
router.post('/', validateCreateUser, createUser);

// // удаляет пользователя  по _id
// router.delete('/:userId', validateDeleteUser, deleteUser);

module.exports = router;
