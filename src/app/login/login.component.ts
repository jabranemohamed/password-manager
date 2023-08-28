import {Component} from '@angular/core';
import {PasswordManagerService} from "../password-manager.service";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isError !: boolean

  constructor(private passwordManager: PasswordManagerService, private router: Router, private authService: AuthService) {
  }

  onSubmit(value: any) {
    console.log(value)
    this.authService.login(value.email, value.password);
  }


}
