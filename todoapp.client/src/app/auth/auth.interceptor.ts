import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private jwtHelper: JwtHelperService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); // Store your JWT token in local storage

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return next.handle(
        req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        })
      );
    }

    return next.handle(req);
  }
}
