import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/books.dto';

@Controller('books')
export class BooksController {
    constructor(private bookService: BooksService){}

    @Get()
    async getBooks(){
        const books = await this.bookService.getBooks();
        return books;
    }

    @Get(':bookID')
    async getBook(@Param('bookID') bookID){
        const books = await this.bookService.getBook(bookID);
        return books;
    }

    @Post()
    async addBooks(@Body() createBookDTO : CreateBookDTO){
        const book = await this.bookService.addBook(createBookDTO);
        return book;
    }

    @Delete()
    async deleteBooks(@Query() query){
        const books = await this.bookService.deleteBook(query.bookID);
        return books;
    }
}
