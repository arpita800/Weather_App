import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, User, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/authservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] 
})
export class LoginComponent {
  email: string='';
  password: string = '';
  errorMessage: string | undefined;
  adminData: any;
  isadmin = true;
  userData : any;
  constructor(private router: Router, private authService: AuthService, private http : HttpClient) {}


 
  onlogin() {
    console.log("working");

    this.http.get(`https://localhost:7090/api/Admins/${this.email}/${this.password}`)
    .subscribe(data => {
      this.adminData = data;
      console.log(this.adminData);


      console.log(this.isadmin);

      if (data) {
        
        localStorage.clear();
        localStorage.setItem("name","admin");
        console.log("Admin login successful");
        this.router.navigate(['/admin']);
        Swal.fire({
          title: "Logged In!",
          text: "You are logged in as a Admin!",
          icon: "success"
        });
      } else {
        // Admin does not exist, proceed with user sign-in
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then(res => {
            console.log("sign in, ",res.user);
          
            localStorage.setItem("uid", res.user.uid);
            localStorage.setItem("email",res.user.email || "");
            
            this.http.get(`https://localhost:7090/api/User/uid`).subscribe((data) => {
              this.userData = data;
              localStorage.setItem("name", this.userData[0].name);
              localStorage.setItem("email", this.userData[0].email);
           
              localStorage.setItem("uid", this.userData[0].uid);
              
            })
            this.router.navigate(['/weather']);
            Swal.fire({
              title: "Success!",
              text: "You are logged in!",
              icon: "success"
            });
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Credentials are not correct!",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
          }
        );
      }
    });
  }
 
  registerPage(): void {
    this.router.navigate(['/register']);
  }
}
