function findAuthorById(authors, id) {
  return authors.find((auth) => auth.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let fin = [];
  fin.push(books.filter((book) => !book.borrows[0].returned));
  fin.push(books.filter((book) => book.borrows[0].returned));
  return fin;
}

function getBorrowersForBook(book, accounts) {
  let filter = accounts.filter((acc) => book.borrows.find((entry) => entry.id === acc.id) != undefined);
  let fin = filter.map((acc) => {
    acc["returned"] = book.borrows.find((entry) => entry.id === acc.id).returned
    return acc;
  });
  fin.length = Math.min(fin.length, 10);
  return fin;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
