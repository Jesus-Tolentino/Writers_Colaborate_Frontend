import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserDTO } from '../../module/userDTO';
import { Router } from '@angular/router';
import { Userdtoservice } from '../../services/userdtoservice';



@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
loginForm!:FormGroup;

constructor (private userService:Userdtoservice,  private formBuilder: FormBuilder,
              private router:Router
  ){}

  ngOnInit() {
    this.CargarFormulario();
  }

  CargarFormulario(){
    this.loginForm = this.formBuilder.group(
      {
        username:[""],
        password:[""]
      }
    );
  }

  Ingresar(){
    const userDTO: UserDTO={
          id: 0,
          username: this.loginForm.get("username")?.value,
          password: this.loginForm.get("password")?.value,
          authorities: ""
    }

    this.userService.login(userDTO).subscribe({
      next:()=>{
        this.router.navigate(["/home"]);
      }
    })
  }



}
