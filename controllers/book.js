import * as Book from '../middlewares/book'

export const getBooks = async (req, res) => {
    const {page=1, per_page=3, sortItem='id', sortMethod='desc'} = req.query;
    let totalItems;

    try {

        if (!page) {
            throw new Error({status: 400, message: 'Page is empty'})
        }

        const booksWithCount = await Book.findAllBooks({page, per_page, sortItem: sortItem, sortMethod: sortMethod});
        const books = JSON.parse(JSON.stringify(booksWithCount.rows));
        totalItems = JSON.stringify(booksWithCount.count);

        const total = Math.ceil(totalItems / per_page);
        const response = {pagination: {page, per_page, total}, books};

        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

export const getBook = async (req, res) => {
    const {bookId} = req.params;

    try {
        if (!bookId) {
            throw new Error({status: 400, message: 'bookId is empty'})
        }

        const oneBook = await Book.findOneBook(bookId);
        return res.status(200).json(oneBook)
    } catch (error) {
        return res.status(400).json(error);
    }
};

export const createBook = async (req, res) => {
    const params = req.body;

    try {
        if (!params) {
            throw new Error({status: 400, message: 'params for creating book is empty'})
        }

        const createdBook = await Book.createBook(params);
        return res.status(200).json(createdBook)
    } catch (error) {
        return res.status(400).json(error.message);
    }
};
