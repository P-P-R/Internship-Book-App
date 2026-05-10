import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { QuoteListComponent } from './components/quote-list/quote-list.component';
import { QuoteFormComponent } from './components/quote-form/quote-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: BookListComponent, canActivate: [authGuard] },
  { path: 'add', component: BookFormComponent, canActivate: [authGuard] },
  { path: 'edit/:id', component: BookFormComponent, canActivate: [authGuard] },
  
  { path: 'quotes', component: QuoteListComponent, canActivate: [authGuard] },
  { path: 'quotes/add', component: QuoteFormComponent, canActivate: [authGuard] },
  { path: 'quotes/edit/:id', component: QuoteFormComponent, canActivate: [authGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];