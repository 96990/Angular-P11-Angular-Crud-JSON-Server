import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

export interface userDetails{
    id?:number,
    username: string,
    password: string
}

@Injectable({
    providedIn: 'root'
})
export class LoginService{
    API_URL = "http://localhost:3000/login";
    private tokenKey = "auth_token";
    private authStatus = new BehaviorSubject<boolean>(this.hasToken());
    private http = inject(HttpClient);

    login(username: string, password: string){
        return this.http.get<{accessToken: string, user: any}>(this.API_URL, {username, password}).pipe(
            tap(res=> {
                if(res.accessToken){
                    localStorage.setItem(this.tokenKey, res.accessToken);
                    this.authStatus.next(true);
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        this.authStatus.next(false);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    isAuthenticated(): Observable<boolean> {
        return this.authStatus.asObservable();
    }

    hasToken(): boolean {
       return !!localStorage.getItem(this.tokenKey);
    }
}

