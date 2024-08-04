import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { emailValidator, imePrezimeValidator } from 'src/app/validators/validators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForma: FormGroup;

  constructor(private fb: FormBuilder, private _authService: AuthService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }


  createLoginForm() {
    this.loginForma = this.fb.group({
      username: ['', Validators.compose([Validators.required, imePrezimeValidator])],
      lozinka: ['', Validators.required]
    })
  }


  ulogujSe() {
    if (!this.loginForma.valid) {
      return;
    }

    const username = this.loginForma.controls['username'].value;
    const lozinka = this.loginForma.controls['lozinka'].value;

    this._authService.login(username, lozinka);

    return false;
  }

}
