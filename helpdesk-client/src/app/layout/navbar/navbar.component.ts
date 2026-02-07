import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { jwtDecoderFunc } from '../../utils/jwtDecoder';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router){}

  // Logout function
  logOutFunc = () => {
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")
    const data = jwtDecoderFunc(accessToken)
    this.authService.logout(data?.id, refreshToken).subscribe({
      next: (res) => {
        if(res)
          localStorage.clear()
        this.router.navigate(['/auth/login'])
      }
    })
  }
}
