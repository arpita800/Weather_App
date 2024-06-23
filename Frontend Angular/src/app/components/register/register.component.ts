import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { HttpClient } from '@angular/common/http';

// Import SweetAlert2
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  fullName: string = '';
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit() {
    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid)
        const userData = {
          fullName: this.fullName,
          email: this.email,
          password: this.password,
          uid: user.uid,
          role: this.role
        };

        this.http.post('https://localhost:7090/api/User/Register', userData)
          .subscribe(
            response => {
              console.log('User data posted successfully', userData);

              // Show SweetAlert2 success message
              Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: 'You have successfully registered.',
                confirmButtonText: 'OK'
              }).then(() => {
                this.router.navigate(['/login']);
              });

            },
            error => {
              console.error('Error posting user data', error);
            }
          );
      })
      .catch((error) => {
        console.error('Error creating user', error);
      });
  }
}
