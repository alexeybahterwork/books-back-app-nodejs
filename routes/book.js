import {Router} from 'express';
import * as authController from "../controllers/auth";
import * as booksController from "../controllers/book";

module.exports = Router({mergeParams: true})
    .get('/books', authController.checkAuth, booksController.getBooks)
    .get('/books/:bookId', authController.checkAuth, booksController.getBook)
    .post('/books/new', authController.checkAuth, booksController.createBook);