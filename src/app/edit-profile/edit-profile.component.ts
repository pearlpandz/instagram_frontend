import { Component, OnInit } from '@angular/core';
import { ProfileService  } from "../edit-profile/edit.service";
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

   current_user ;
   current_id;
  constructor(
  private profileservices : ProfileService ,
  private cookieservice :  CookieService,
  private http: HttpClient,
    ) { }
    // edit user array and variables
  edit : {}
  // user details array and variables
  userdetails : {}
  name;
  bio;
  website;
  email;
  phonenum;
  gender;
  username;
  profilepic;
//unique user &email
errorname;
errormail;
  ngOnInit() {
    
    this.current_user = this.cookieservice.get('name');
    this.current_id = this.cookieservice.get('id');
  //  this.Submit( this.current_user);
    this. getdetail(this.current_user);
    
  }

// function for  get user
  getdetail(username){
    let names = {name : username};
    this.profileservices.getdetails(username)
    .map(Response =>Response.json ())
    .subscribe( Response =>
      
      {
        this.userdetails = Response[0];
        this.bio = Response[0].bio;
        this.name = Response[0].name;
        this.username = Response[0].name;
        this.email = Response[0].email;
        this.phonenum = Response [0].phonenumber;
        this.profilepic = Response[0].profilepic
        console.log( 'hi this is my user details',this.userdetails);
        console.log('sdsfnamessss',  this.name );

      })

  }
  
    //function for edit user api 
    Submit( updateUser :  any ) {
    // alert();
    // let names = { name : updateUser };
  
    // console.log('currentusername', updateUser.value);
    
    let names = { name : updateUser };
    this.profileservices.editusers(updateUser.value ).map(response => response.json()) .subscribe(response => {
      this.edit = response;
       
     console.log('eprofiless1' , this.edit ); 
    })
  
}
  
uniquenames(name: any){
  // console.log('success', name.value) ;
    this.http.post('http://localhost:3000/uniquename', {name: name.value, field: 'name'} ).subscribe(data =>{
      this.errorname = data['success'];
      // console.log(this.errorUsername);
      
    })
  }
  uniqueemail(email:any){
    this.http.post('http://localhost:3000/uniquename', {name: email.value, field: 'email'} ).subscribe(data =>{
      this.errormail = data['success'];
  })}
  
  
 



  
}
