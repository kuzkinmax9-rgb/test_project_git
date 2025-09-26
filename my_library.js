class Library {
    constructor(libTitle) {
        this.name = libTitle;
        this.books = [];
    }


 //Добавляем новую книгу если 'isbn' уже есть в базе то увеличим кол-во книг 
 addBook(title, author, year, isbn, quantity = 1) {
        const newBook = {
            title: title,
            author: author,
            year: year,
            isbn: isbn,
            totalQuantity: quantity,
            availbleQuantity: quantity,
            borrowedBy: []
        }
        const findBook = this.books.filter(book => book.isbn == isbn)
        if (findBook.length) {
            for (var i = 0; i <= this.books.length; i++) {
                if (this.books[i] == findBook[0]) {
                    this.books[i].totalQuantity += quantity;
                    this.books[i].availbleQuantity += quantity;
                }
            }
            // this.books.map(book => {if (book == findBook[0])
            // {return book.totalQuantity += quantity} else
            // {book.totalQuantity}
            // })
        } else{
            this.books.push(newBook)
        }
        return newBook;
    }

    findBook(searchTerm) {
        let foundBooks = this.books.filter(book => book.title.includes(searchTerm));
        if (foundBooks.length) {
            return foundBooks;  
        } else {
            foundBooks = this.books.filter(book => book.isbn == searchTerm);
            return foundBooks;
        }
    }
    getBookStats() {
    const totalQuantity = this.books.reduce((accum, val) => accum + val.totalQuantity, 0);
    const availbleQuantity = this.books.reduce((accum, val) => accum + val.availbleQuantity, 0);
    const statistic = {
        totalQuantity: totalQuantity,
        availbleQuantity: availbleQuantity,
        issued: totalQuantity - availbleQuantity,
        mostPopularBooks: this.books.sort((a, b) => b.borrowedBy.length - a.borrowedBy.length).slice(0, 2)
    }
    return statistic;    

    }
}

const library = new Library("Тестовая библиотека");
library.addBook("JavaScript для начинающих", "Иван Петров", 2023, "JS-001", 5);
library.addBook("React продвинутый", "Мария Сидорова", 2024, "REACT-002", 3);
library.addBook("React продвинутый", "Мария Сидорова", 2024, "REACT-002", 1);
console.log(library.books); 

// Ищем книги
const foundBooks = library.findBook("JavaScript");
console.log(foundBooks.length); // Должно вернуть 1
