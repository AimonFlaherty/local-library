function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter((book) => !book.borrows[0].returned).length;
}

function getMostCommonGenres(books) {
  let genres = [];
  books.forEach((book) =>{
    let bookGenre = book.genre;
    let test = genres.find((genre) => genre.name === bookGenre);
    if(test != undefined) test.count += 1;
    else genres.push({name: bookGenre, count: 1});
  });
  let genreLimit = genres.sort((genre1, genre2) => genre1.count < genre2.count ? 1 : -1);
  genreLimit.length = Math.min(genreLimit.length, 5);
  return genreLimit;
}

function getMostPopularBooks(books) {
  let popularBooks = [];
  books.forEach((book) => popularBooks.push({name: book.title, count: book.borrows.length}));
  let popularBooksLimit = popularBooks.sort((bookOne, bookTwo) => bookOne.count < bookTwo.count ? 1 : -1);
  popularBooksLimit.length = Math.min(popularBooksLimit.length, 5);
  return popularBooksLimit;
}

function getMostPopularAuthors(books, authors) {
  let popularAuthors = [];
  authors.forEach((author) =>{
    let id = author.id;
    let authName = author.name.first + " " + author.name.last;
    books.forEach((book) => {
      if(id === book.authorId){
        let popCount = book.borrows.length;
        let test = popularAuthors.find((popAuth) => popAuth.name === authName);
        if(test != undefined) test.count += popCount;
        else popularAuthors.push({name: authName, count: popCount});
      }
    });
  });
  popularAuthors = popularAuthors.sort((author1, author2) => author1.count < author2.count ? 1 : -1);
  popularAuthors.length = Math.min(popularAuthors.length, 5);
  return popularAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
