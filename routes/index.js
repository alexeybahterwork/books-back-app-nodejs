import express from 'express';
import * as BooksController from '../controllers/book';
import * as UserController from '../controllers/user';
import * as authController from "../controllers/auth";
import userRouter from './users'
const router = express.Router();

router.get('/', ({res}) => res.send('API is OK!'));

router.post('/auth', authController.authUser);

router.get('/users', authController.checkAuth, UserController.listOfBUsers);

router.get('/books', authController.checkAuth, BooksController.listOfBooks);
router.get('/books/:bookId', authController.checkAuth, BooksController.oneBook);
router.post('/books/new', authController.checkAuth, BooksController.createBook);
userRouter
export default router;
