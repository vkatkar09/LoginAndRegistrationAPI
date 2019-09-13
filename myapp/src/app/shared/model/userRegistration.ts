import { Ilogin } from './userLogin';

export interface Iregistration{
    FirstName : string;
    LastName : string;
    MobileNo : string;
    EmailId : string;
    Address : string;
    UserLogin : Ilogin;
    Error?: string;
}