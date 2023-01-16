function findAccountById(accounts, id) {
  return accounts.find((acc) => acc.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((acc1, acc2) => acc1.name.last > acc2.name.last ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((total, book) => {
    book.borrows.forEach((entry) => entry.id === account.id ? total += 1 : total += 0);
    return total;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  let filterBooks = books.filter((book) => book.borrows.some((entry) => entry.id === account.id && !entry.returned));
  return filterBooks.map((book) => {
    book["author"] = authors.find((author) => author.id === book.authorId);
    return book;
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
