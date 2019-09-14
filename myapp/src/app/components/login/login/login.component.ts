import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Ilogin} from '../../../shared/model/userLogin';
import { UserRegisterServices } from '../../../shared/user.register.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public Login: FormGroup;
  public submitted:boolean = false;
  public validateError:string;

  constructor(private fb: FormBuilder, private userServices : UserRegisterServices, private router : Router) { }

  ngOnInit() {
    this.Login = this.fb.group({
      'UserLogin': this.fb.group({
        UserName:['', [Validators.required]],
        Password:['',[Validators.required]]
      })
    })
  }

  Save(data: Ilogin){
    this.submitted = true;
    if(!this.Login.valid)
    {return;}
    console.log(data); //input data
    this.userServices.userLogin(data)
    .subscribe(data => {
      if(data.UserIdentity){
      alert('Login successfull..!')
      this.router.navigateByUrl('/home');
      //location.reload();
      console.log(data); // for getting response 
      }else{
        console.log(data.Error);
        this.validateError = data.Error;
      }
    })
  }

   
}
