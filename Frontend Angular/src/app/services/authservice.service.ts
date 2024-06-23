// authservice.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth, User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    onAuthStateChanged(auth, (user) => {
      this.userSubject.next(user);
    });
  }

  getCurrentUser(): User | null {
    return auth.currentUser;
  }

  getUserRole(user: User): string {
    const adminEmails = ['admin@gmail.com', 'admin@example.com'];
    return user.email && adminEmails.includes(user.email) ? 'admin' : 'user';
  }
}
