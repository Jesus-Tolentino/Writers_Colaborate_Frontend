import { Component } from '@angular/core';
import { Userdtoservice } from '../../services/userdtoservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
constructor(private userService:Userdtoservice, private router:Router){}
Logout() {
  this.userService.logout();
  this.router.navigate(["/login"]);
}

HayUsuario() {
  return this.userService.isLogged()
}

}
