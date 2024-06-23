// home.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { AuthService } from '../services/authservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  currentUser: User | null = null; // Initialize currentUser as User type or null
  userId: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
      this.userId = user ? user.uid : null;

      if (this.userId) {
        localStorage.setItem('userId', this.userId);
      } else {
        localStorage.removeItem('userId');
      }
      console.log(this.userId);
    });
  }

  navigateWithSpinner() {
    this.isLoading = true;
    // Simulate loading delay (e.g., API call, timeout)
    setTimeout(() => {
      this.isLoading = false;
      // Navigate to desired route after loading
      this.router.navigate(['/login']);
    }, 2000); // Adjust delay time as needed
  }
}
