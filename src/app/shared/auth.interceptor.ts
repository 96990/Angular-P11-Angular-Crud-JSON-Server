import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "../auth/auth.service";

@Injectable()
export class authInterceptor implements HttpInterceptor {
    private authService = inject(LoginService);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();
        if(token){
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${token}`}
            });
        }
        return next.handle(req);
    }
}