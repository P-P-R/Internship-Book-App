import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookService, Book } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        console.log('BÖCKER FRÅN DATABASEN:', data);
        this.books = data;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Kunde inte hämta böcker', err);
      }
    });
  }

  deleteBook(id: number | undefined): void {
    if (id && confirm('Är du säker på att du vill radera denna bok?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          console.log('Bok raderad');
          this.loadBooks();
        },
        error: (err) => console.error('Kunde inte radera bok', err)
      });
    }
  }
}