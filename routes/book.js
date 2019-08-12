import {Router} from 'express';
import * as AuthController from "../controllers/auth";
import * as BooksController from "../controllers/book";

module.exports = Router({mergeParams: true})
    .get('/books', AuthController.checkAuth, BooksController.listOfBooks)
    .get('/books/:bookId', AuthController.checkAuth, BooksController.oneBook)
    .post('/books/new', AuthController.checkAuth, BooksController.createBook);