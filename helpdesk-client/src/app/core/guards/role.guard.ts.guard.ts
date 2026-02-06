import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate } from "@angular/router";

@Injectable({providedIn:'root'})
export class RoleGuard implements CanActivate{

  canActivate(route:ActivatedRouteSnapshot){

    const expectedRoles = route.data['roles'];
    const user = JSON.parse(localStorage.getItem('user')!);

    return expectedRoles.includes(user.role);
  }
}
