import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Ilogin}from './model/userLogin';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Iregistration } from './model/userRegistration';

@Injectable({providedIn : 'root'})
export class UserRegisterServices{

    private loginEndPoint : string ='http://mobile.test.acorsociety.com/ideators/api/users/userloginasync';
    private registerEndPoint : string = 'http://mobile.test.acorsociety.com/ideators/api/users/userregistrationasync';
    public header : HttpHeaders;

    constructor(private http : HttpClient){

        this.header = new HttpHeaders({'Content-Type' : 'application/json'})
    }
    userLogin(item:Ilogin):Observable<Ilogin>{
        return this.http.post<Ilogin>(this.loginEndPoint, JSON.stringify(item), {headers : this.header}
        ).pipe(map(item => {
            if(item && item.UserIdentity){
                localStorage.setItem('currentUser', JSON.stringify(item)) 
                return item;
            }
            return item;
        } ))
    }

    userRegister(data:Iregistration):Observable<Iregistration>{
        return this.http.post<Iregistration>(this.registerEndPoint, JSON.stringify(data), {headers : this.header})
    }
    
}