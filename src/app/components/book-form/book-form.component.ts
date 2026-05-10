import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // La till ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService, Book } from '../../services/book.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './book-form.component.html'
})
export class BookFormComponent implements OnInit {
  book: Book = { title: '', author: '', publishDate: '' };
  isEditMode = false;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.bookService.getBook(+id).subscribe({
        next: (data: Book) => {
          this.book = data;
          
          if (this.book.publishDate) {
            this.book.publishDate = this.book.publishDate.split('T')[0];
          }
          
          this.cdr.detectChanges(); 
        },
        error: (err: any) => {
          console.error('Kunde inte ladda boken för redigering', err);
        }
      });
    }
  }

  saveBook(): void {
    if (this.isEditMode && this.book.id) {
      this.bookService.updateBook(this.book.id, this.book).subscribe({
        next: () => {
          alert('Boken har uppdaterats!');
          this.router.navigate(['/']);
        }
      });
    } else {
      this.bookService.addBook(this.book).subscribe({
        next: () => {
          alert('Boken har sparats!');
          this.router.navigate(['/']);
        }
      });
    }
  }
}