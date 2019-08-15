import {Router} from 'express';
import * as AuthController from "../controllers/auth";
import * as BooksController from "../controllers/book";

module.exports = Router({mergeParams: true})
    .get('/books', AuthController.checkAuth, BooksController.getBooks)
    .get('/books/:bookId', AuthController.checkAuth, BooksController.getBook)
    .post('/books/new', AuthController.checkAuth, BooksController.createBook);