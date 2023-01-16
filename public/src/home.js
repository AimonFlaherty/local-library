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
  return limit(popularBooks, 5);
}

function getMostPopularAuthors(books, authors) {
  let popularAuthors = [];
  authors.forEach((author) =>{
    const{id, name} = author;
    const{first, last} = name;
    let authName = first + " " + last;
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
  return limit(popularAuthors, 5);
}

function limit(arr, limit){
  arr.length = Math.min(arr.length, limit);
  return arr
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
