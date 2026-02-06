import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { catchError, switchMap, throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService){}

  intercept(req:HttpRequest<any>, next:HttpHandler){

    const token = localStorage.getItem('accessToken');

    if(token){
      req = req.clone({
        setHeaders:{
          Authorization:`Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError(err=>{
        if(err.status===401){
          return this.auth.refresh().pipe(
            switchMap((res:any)=>{
              localStorage.setItem('accessToken',res.accessToken);
              return next.handle(req);
            })
          )
        }
        return throwError(()=>err);
      })
    );
  }
}

