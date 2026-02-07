import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  // variable declarations
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.setRegisterForm();
  }

  setRegisterForm = (): void => {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: [''],
    });
  }

  submit() {
    let payload = {
      "name": this.registerForm.get('name')?.value,
      "email": this.registerForm.get('email')?.value,
      "password": this.registerForm.get('password')?.value,
      "role": this.registerForm.get('role')?.value
    }
    this.auth.register(payload).subscribe({
      next: (res: any) => {
        if (res)
          this.router.navigate(['auth/login']);
      },
      error: (error) => {
        console.log(error)
      }
    }
    );
  }
}
