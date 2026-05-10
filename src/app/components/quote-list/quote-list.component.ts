import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QuoteService, Quote } from '../../services/quote.service';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quote-list.component.html',
  styleUrl: './quote-list.component.css'
})
export class QuoteListComponent implements OnInit {
  quotes: Quote[] = [];

  constructor(
    private quoteService: QuoteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.quoteService.getQuotes().subscribe({
      next: (data) => {
        console.log('CITAT FRÅN DATABASEN:', data);
        this.quotes = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Kunde inte hämta citat', err)
    });
  }

  deleteQuote(id: number | undefined): void {
    if (id && confirm('Är du säker på att du vill radera detta citat?')) {
      this.quoteService.deleteQuote(id).subscribe({
        next: () => {
          console.log('Citat raderat');
          this.loadQuotes();
        },
        error: (err) => console.error('Kunde inte radera citat', err)
      });
    }
  }
}