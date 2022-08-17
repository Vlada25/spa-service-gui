import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthenticationService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isAuthorized()){
            req = req.clone({
                setHeaders: {
                    Authorization: this.authService.getToken()
                }
            })
        }
        return next.handle(req)
    }
}