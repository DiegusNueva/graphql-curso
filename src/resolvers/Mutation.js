import { v4 as uuidv4 } from "uuid";

const Mutation = {
  createUser: (parent, { data }, { db }, info) => {
    const isEmailTaken = db.users.some((user) => user.email === data.email);

    if (isEmailTaken) {
      throw new Error("Email taken");
    }

    const user = {
      id: uuidv4(),
      ...data,
    };

    db.users.push(user);
    return user;
  },

  updateUser: (parent, { id, data }, { db }, info) => {
    const userExist = db.users.find((user) => user.id === id);

    if (!userExist) {
      throw new Error("User not found");
    }

    const isEmailTaken = db.users.some(
      (user) => user.email === data.email && user.id !== id
    );

    if (isEmailTaken) {
      throw new Error("Email taken");
    }

    db.users = db.users.map((user) =>
      user.id === id ? { ...user, ...updateData } : user
    );

    return { ...userExist, ...updateData };
  },

  createAuthor: (parent, { data }, { db }, info) => {
    const author = {
      id: uuidv4(),
      ...data,
    };

    db.authors.push(author);
    return author;
  },

  updateAuthor: (parent, { id, data }, { db }, info) => {
    const authorExist = db.authors.find((author) => author.id === id);

    if (!authorExist) {
      throw new Error("Author not found");
    }

    db.authors = db.authors.map((author) => {
      if (author.id === id) {
        author = { ...author, ...data };
        return author;
      }
      return author;
    });

    return { ...authorExist, ...data };
  },

  createBook: (parent, { data }, { db }, info) => {
    const book = {
      id: uuidv4(),
      ...data,
    };

    db.books.push(book);
    return book;
  },

  updateBook: (parent, { id, data }, { db }, info) => {
    const bookExist = db.books.find((book) => book.id === id);

    if (!bookExist) {
      throw new Error("Book not found");
    }

    db.books = db.books.map((book) =>
      book.id === id ? { ...book, ...data } : book
    );

    return { ...bookExist, ...data };
  },

  deleteBook: (parent, { id }, { db }, info) => {
    const bookIndex = db.books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      throw new Error("Book not found");
    }

    const deletedBook = db.books[bookIndex];
    db.books = db.books.filter((book) => book.id !== id);

    return deletedBook;
  },
};

export default Mutation;
