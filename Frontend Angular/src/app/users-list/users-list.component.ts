import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {

  users: any[] = [];

  ngOnInit(): void {
    this.getUsers();
  }

  constructor(private http: HttpClient, private router: Router) {}

  getUsers(): void {
    this.http.get<any[]>('https://localhost:7090/api/User')
      .subscribe(
        (response) => {
          this.users = response;
          console.log('Users fetched successfully', this.users);
        },
        (error) => {
          console.error('Error fetching users', error);
        }
      );
  }

  
  getUserName(email: string): string {
    return email.split('@')[0];
  }
}

