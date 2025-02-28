import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

export interface userDetails{
    id?:number,
    username: string,
    password: string
}

@Injectable({
    providedIn: 'root'
})
export class LoginService{
    API_URL = "http://localhost:3000/users";
    private http = inject(HttpClient);

    login(userDetails: userDetails){
        return this.http.get<userDetails[]>(this.API_URL).pipe(
            map(users => users.find(user =>  user.username == userDetails.username && user.password == userDetails.password))
        );
    }
}