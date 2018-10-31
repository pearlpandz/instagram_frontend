import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('userLogin') formValues;
 
  cookieEmail = '';
  cookieToken = '';
  cookieName = '';
  cookieProfilepic = '';
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private toastrService: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.cookieEmail = this.cookieService.get('email');
    this.cookieToken = this.cookieService.get('token');
    this.cookieName = this.cookieService.get('name');
    this.cookieProfilepic = this.cookieService.get('profilepic');
    if (this.cookieEmail) {
      this.router.navigate(['/home']);
    }
  }

  Submit(userdata: any) {
    // console.log('hihihihi', userdata.value);

    this.http.post('http://localhost:3000/userlogin', userdata.value).subscribe(data => {

      // console.log(data);
      this.cookieService.set('email', data['email']);
      this.cookieService.set('token', data['token']);
      this.cookieService.set('boolen', 'true');
      this.cookieService.set('name', data['name']);
      this.cookieService.set('profilepic', data['profilepic']);
      this.cookieService.set('id', data['id']);

      this.cookieEmail = this.cookieService.get('email');
      this.cookieToken = this.cookieService.get('token');
      this.cookieName = this.cookieService.get('name');
      this.cookieProfilepic = this.cookieService.get('profilepic');
      // console.log(data);

      // console.log('status chkjkkkk', data['success']);

      if (data['success']) {
        this.router.navigate(['/home']);
        this.toastrService.success('Have a great day!', 'Welcome Back!');
        //  console.log( data);

      } else {


        this.formValues.resetForm();
        this.router.navigate(['/login']);

        this.toastrService.warning('sry!', 'incorrect login!');


        // console.log( data);
      }


    });
  }

}
