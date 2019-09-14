import {Injectable} from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({providedIn : 'root'})
export class AuthGuard implements CanActivate{
   
    constructor(private route : Router){}

    canActivate(){
         
        let token = localStorage.getItem('currentUser');
        if(!token){
            alert('Please login first..!')
            this.route.navigateByUrl('/login');
            return false;
        } else{
            return true;
        }
    }

}

