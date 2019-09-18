import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Ilogin}from './model/userLogin';
import { Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import { Iregistration } from './model/userRegistration';
import { Router } from '@angular/router';


@Injectable({providedIn : 'root'})
export class UserRegisterServices{

    private loginEndPoint : string ='http://mobile.test.acorsociety.com/ideators/api/users/userloginasync';
    private registerEndPoint : string = 'http://mobile.test.acorsociety.com/ideators/api/users/userregistrationasync';
    public header : HttpHeaders;
    private loggedIn: BehaviorSubject<Ilogin>
    public currentuser: Observable<Ilogin>;

    constructor(private http : HttpClient, private router : Router){

        this.header = new HttpHeaders({'Content-Type' : 'application/json'})
        this.loggedIn = new BehaviorSubject<Ilogin>(JSON.parse(localStorage.getItem('currentUser')))
        this.currentuser = this.loggedIn.asObservable();
    }
    userLogin(item:Ilogin):Observable<Ilogin>{
        return this.http.post<Ilogin>(this.loginEndPoint, JSON.stringify(item), {headers : this.header}
        ).pipe(map(item => {
            if(item && item.UserIdentity){
                localStorage.setItem('currentUser', JSON.stringify(item)) ;
                this.loggedIn.next(item);
              //  return item;
            }
            return item;
        } ))
    }

    get userLoggedIn():Ilogin{
        return this.loggedIn.value;
    }

    userRegister(data:Iregistration):Observable<Iregistration>{
        return this.http.post<Iregistration>(this.registerEndPoint, JSON.stringify(data), {headers : this.header})
    }

    userLogout(){
        localStorage.removeItem('currentUser');
        this.loggedIn.next(null);
        this.router.navigateByUrl('/login');
        //location.reload();
    }
    
}