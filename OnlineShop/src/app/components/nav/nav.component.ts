import { Component, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements DoCheck{

  isLogged: boolean;
  isAdmin: boolean;

  constructor(private _authService: AuthService, private _storageService: StorageService){

  }

  ngDoCheck(): void {
    this.isLogged = this._storageService.isLoggedIn();
    this.isAdmin = this._storageService.isAdminLoggedIn();
  }

  logout(){
    this._authService.logout();
  }

}
