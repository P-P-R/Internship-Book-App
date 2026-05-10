import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuoteService, Quote } from '../../services/quote.service';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './quote-form.component.html',
  styleUrl: './quote-form.component.css'
})
export class QuoteFormComponent implements OnInit {
  quote: Quote = { text: '', author: '' };
  isEditMode = false;

  constructor(
    private quoteService: QuoteService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.quoteService.getQuote(+id).subscribe({
        next: (data) => {
          this.quote = data;
          this.cdr.detectChanges(); 
        },
        error: (err) => console.error('Kunde inte ladda citat', err)
      });
    }
  }

  saveQuote(): void {
    if (this.isEditMode && this.quote.id) {
      this.quoteService.updateQuote(this.quote.id, this.quote).subscribe({
        next: () => this.router.navigate(['/quotes']),
        error: (err) => console.error('Kunde inte uppdatera citat', err)
      });
    } else {
      this.quoteService.addQuote(this.quote).subscribe({
        next: () => this.router.navigate(['/quotes']),
        error: (err) => console.error('Kunde inte spara citat', err)
      });
    }
  }
}