import * as Book from '../models/book'

export const listOfBooks = (req, res) => {
    const {page, per_page, sortItem='id', sortMethod='desc'} = req.query;
    let totalItems;

    return Book.findAllBooks({page, per_page, sortItem:sortItem, sortMethod:sortMethod})
        .then((booksWithCount) => {
            const books = JSON.parse(JSON.stringify(booksWithCount.rows));
            totalItems = JSON.stringify(booksWithCount.count);

            const total = Math.ceil(totalItems/per_page);
            const response = {pagination: {page, per_page, total}, books};

            return res.status(200).json(response);
        })
        .catch((error) => res.status(400).send(error.message));
};

export const oneBook = (req, res) => {
    const {bookId} = req.params;
    return Book.findOneBook(bookId)
        .then((rez) => res.status(200).send(rez))
        .catch((error) => res.status(400).send(error));
};

export const createBook = (req, res) => {
    const params = req.body;
    return Book.createBook(params)
            .then((rez) => {
                console.log('asdasd')
                return res.status(200).send(rez)
            })
            .catch((error) => res.status(400).send(error));
};
