import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesModulesApp } from 'src/app/core/config/routes/routes-modules-app';
import { UserUseCases } from 'src/app/domain/use_cases/user-use-case/user-use-cases';
import { AuthService } from 'src/app/infraestructure/services/auth.service';
import Swal from 'sweetalert2'


@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router );
  private userUseCase = inject( UserUseCases );


  public myForm: FormGroup = this.fb.group({
    email:    ['fernando@google.com', [ Validators.required, Validators.email ]],
    password: ['123456', [ Validators.required, Validators.minLength(6) ]],
  });


  login() {
    const { email, password } = this.myForm.value;

    this.userUseCase.login({email: email, password: password}).subscribe({
      next: ( data: { token: string }) => {
        this.authService.login(data.token);
        this.router.navigate([RoutesModulesApp.DASHBOARD]);
      },
      error: (message) => {
        Swal.fire('Error', message, 'error' )
      }
    });
  }
}
