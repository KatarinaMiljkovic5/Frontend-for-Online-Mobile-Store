import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikModel } from '../models/korisnik.model';
import { KorisnikService } from './korisnik.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/auth/';

  constructor(private _korisnikService: KorisnikService, private router: Router, private _storageService: StorageService) {}

  login(username: string, password: string){
    this._korisnikService.login(username, password).subscribe({
      next: data => {
        this._storageService.saveUser(data);
        this.router.navigate(['/pocetna']);
      },
      error: err => {
        alert("Uneti podaci nisu validni");
      }
    });
  }

  register(ime: string, prezime: string, email: string, username: string, lozinka: string){
      const user = new KorisnikModel(ime, prezime, email, username, lozinka);
      this._korisnikService.register(user).subscribe((res) => {
        alert('Uspesno ste se registrovali');
        this.router.navigate(['/login']);
      })
    }


  public logout(){
    this._korisnikService.logout().subscribe({
      next: res => {
        console.log(res);
        this._storageService.clean();
        this.router.navigate(['/login']);
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
