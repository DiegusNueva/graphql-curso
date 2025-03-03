import { v4 as uuidv4 } from "uuid";

const Mutation = {
  createUser: (parent, args, { db }, info) => {
    const isEmailTaken = db.users.some((user) => user.email === args.email);

    if (isEmailTaken) {
      throw new Error("Email taken");
    }

    const user = {
      id: uuidv4(),
      ...args,
    };

    db.users.push(user);

    return user;
  },
  updateUser: (parent, args, { db }, info) => {
    const { id, ...data } = args;
    const userExist = db.users.find((user) => user.id === id);

    if (!userExist) {
      throw new Error("User not found");
    }

    const isEmailTaken = db.users.some((user) => user.email === data.email);

    if (isEmailTaken) {
      throw new Error("Email taken");
    }

    db.users = db.users.map((user) => {
      if (user.id === id) {
        user = {
          ...user,
          ...data,
        };
        return user;
      }

      return user;
    });

    return { ...userExist, ...data };
  },

  createAuthor: (parent, args, { db }, info) => {
    const author = {
      id: uuidv4(),
      ...args,
    };

    db.authors.push(author);

    return author;
  },
  updateAuthor: (parent, args, { db }, info) => {
    const { id, ...data } = args;
    const authorExist = db.authors.find((author) => author.id === id);

    if (!authorExist) {
      throw new Error("Author not found");
    }

    db.authors = db.authors.map((author) => {
      if (author.id === id) {
        author = {
          ...author,
          ...data,
        };
        return author;
      }

      return author;
    });

    return { ...authorExist, ...data };
  },
  createBook: (parent, args, { db }, info) => {
    const book = {
      id: uuidv4(),
      ...args,
    };

    db.books.push(book);

    return book;
  },
  updateBook: (parent, args, { db }, info) => {
    const { id, ...data } = args;
    const bookExist = db.books.find((book) => book.id === id);

    if (!bookExist) {
      throw new Error("Book not found");
    }

    db.books = db.books.map((book) => {
      if (book.id === id) {
        book = {
          ...book,
          ...data,
        };
        return book;
      }

      return book;
    });

    return { ...bookExist, ...data };
  },
  deleteBook: (parent, args, { db }, info) => {
    const bookIndex = db.books.findIndex((book) => book.id === args.id);

    if (bookIndex === -1) {
      throw new Error("Book not found");
    }

    const [book] = db.books.splice(bookIndex, 1);

    return book;
  },
};

export default Mutation;
