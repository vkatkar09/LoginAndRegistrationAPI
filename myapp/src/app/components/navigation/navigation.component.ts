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
  constructor(private userServices : UserRegisterServices, private router : Router) { }

  ngOnInit() {
    let user:any = JSON.parse(localStorage.getItem('currentUser'));
    console.log(user);
    this.userName = user.FirstName +" "+ user.LastName;
    
  }

  Logout(){
    this.userServices.userLogout();
   // this.router.navigateByUrl('/login');
  }

}
