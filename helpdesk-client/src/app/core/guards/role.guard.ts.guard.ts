import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { jwtDecoderFunc } from "../../utils/jwtDecoder";

@Injectable({providedIn:'root'})
export class RoleGuard implements CanActivate{

  canActivate(route:ActivatedRouteSnapshot){
    debugger
    const expectedRoles = route.data['roles'];
    const user = jwtDecoderFunc(localStorage.getItem('accessToken'))

    return expectedRoles.includes(user.role);
  }
}
