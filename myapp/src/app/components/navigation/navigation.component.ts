import { Component, OnInit } from '@angular/core';
import { UserRegisterServices } from 'src/app/shared/user.register.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public userName;
  user:any = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private userServices : UserRegisterServices, private router : Router) { }

  ngOnInit() {

    this.userServices.currentuser.subscribe(x  => {
      this.userName = x;
    })
 
    // console.log(user);
    // this.userName = user;
  }

  Logout(){
    this.userServices.userLogout();
   // this.router.navigateByUrl('/login');
  }

}
