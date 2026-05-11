import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id?: number;
  title: string;
  author: string;
  publishDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // OBS: Dubbelkolla att 7145 är rätt port för din Swagger!
  private apiUrl = 'https://paulus-bookapi.runasp.net/api/Books';
  constructor(private http: HttpClient) {}

  // Hämtar ALLA böcker (används av listan)
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  // Hämtar EN bok (används vid redigering)
  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  // Skapar ny bok
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  // Uppdaterar befintlig bok
  updateBook(id: number, book: Book): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, book);
  }

  // Raderar bok
  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}