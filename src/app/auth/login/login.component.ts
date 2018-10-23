import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from "@angular/router";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cookieEmail = '';
  cookieToken = '';
  cookieName = '';
  cookieProfilepic= '';
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private toastrService: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.cookieEmail = this.cookieService.get('email'); 
    this.cookieToken = this.cookieService.get('token');
    this.cookieName =  this.cookieService.get('name');
    this.cookieProfilepic = this.cookieService.get('profilepic');
    if(this.cookieEmail) {
      this.router.navigate(['/home']);
    }
  }

  Submit(userdata: any){
    // console.log(userdata.value);
    this.http.post('http://localhost:3000/userlogin', userdata.value).subscribe(data => {
        // console.log(data);
        this.cookieService.set('email',data['email']); 
        this.cookieService.set('token', data['token']);
        this.cookieService.set('boolen', 'true');
        this.cookieService.set('name', data['name']);
        this.cookieService.set('profilepic', data['profilepic']);
        

        this.cookieEmail = this.cookieService.get('email');
        this.cookieToken = this.cookieService.get('token');
        this.cookieName = this.cookieService.get('name');
        this.cookieProfilepic = this.cookieService.get('profilepic');
        
        // console.log(this.cookieName);

        if(this.cookieEmail){
          this.router.navigate(['/home']);
          this.toastrService.success('Have a great day!','Welcome Back!');
        }
        
    });
  }

}
