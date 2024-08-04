import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KorisnikModel } from 'src/app/models/korisnik.model';
import { AuthService } from 'src/app/services/auth.service';
import { emailValidator, imePrezimeValidator } from 'src/app/validators/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerForma: FormGroup;

  constructor(private fb: FormBuilder, private _authService: AuthService){}

  ngOnInit(): void {
    this.createRegisterForm();
  }

 
  createRegisterForm(){
    this.registerForma = this.fb.group({
      ime: ['', Validators.compose([Validators.required, imePrezimeValidator])],
      prezime: ['', Validators.compose([Validators.required, imePrezimeValidator])],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      username: ['', Validators.compose([Validators.required, imePrezimeValidator])],
      lozinka: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }


  registrujSe(){
    const ime = this.registerForma.controls['ime'].value;
    const prezime = this.registerForma.controls['prezime'].value;
    const email = this.registerForma.controls['email'].value;
    const username = this.registerForma.controls['username'].value;
    const lozinka = this.registerForma.controls['lozinka'].value;

    this._authService.register(ime, prezime, email, username, lozinka);
  }
}
