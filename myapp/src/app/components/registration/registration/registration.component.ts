import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Iregistration } from '../../../shared/model/userRegistration';
import { UserRegisterServices } from 'src/app/shared/user.register.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public Register: FormGroup;
  public submitted : boolean = false;
  public validateError : string;

  constructor(private fb : FormBuilder, private userServices : UserRegisterServices, private router : Router) { }

  ngOnInit() {
    this.Register = this.fb.group({
      'FirstName' : ['', [Validators.required]],
      'LastName' : ['', [Validators.required]],
      'MobileNo' : ['', [Validators.required]],
      'EmailId' : ['', [Validators.required]],
      'Address' : ['', [Validators.required]],
      'UserLogin' : this.fb.group({
        UserName : ['', [Validators.required]],
        Password : ['', [Validators.required]]
      }) 
    })
  }

  Save(data : Iregistration){
    this.submitted = true;
    if(!this.Register.valid){
      return;
    }
    console.log(data);
    this.userServices.userRegister(data) //this will go to api and post the given data which is in parameter
    .subscribe(data =>{ // after data has been post we will receive response here in subscribe(data)
      if(data.Error){
        console.log(data.Error);
        this.validateError = data.Error;
      }else{
        this.router.navigateByUrl('/login');
        console.log(data);
      } 
    })
  }

}
