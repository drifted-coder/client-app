import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { catchError, switchMap, throwError, Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('accessToken');

    let authReq = req;

    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError(err => {

        if (err.status === 401) {

          const refreshToken = localStorage.getItem('refreshToken');

          return this.auth.refresh(refreshToken).pipe(
            switchMap((res: any) => {

              localStorage.setItem('accessToken', res.accessToken);

              // CLONE AGAIN WITH NEW TOKEN
              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${res.accessToken}`
                }
              });

              return next.handle(newReq);
            })
          );
        }

        return throwError(() => err);
      })
    );
  }
}
