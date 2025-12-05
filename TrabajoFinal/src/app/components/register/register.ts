import { Component } from '@angular/core';
import { Userdtoservice } from '../../services/userdtoservice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDTO } from '../../models/userDTO';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
crudForm!:FormGroup;
  authorId: number = 0;
  constructor(private userService:Userdtoservice, private formBuilder: FormBuilder, private snack: MatSnackBar, private router: Router,
     private activatedRoute: ActivatedRoute) { }

ngOnInit(){
    this.CargarFormulario();
  }
  CargarFormulario()
  {
    this.crudForm = this.formBuilder.group(
      {
        id:[""],
        username:["",[Validators.required]],
        password:["",[Validators.required]],
        authorities:["ROLE_WRITER"],

      }
    );
  }

  Grabar(){

      if (this.crudForm.valid) {


        const userDTO:UserDTO= {
            id:this.crudForm.get("id")?.value,
            username:this.crudForm.get("username")?.value,
            password:this.crudForm.get("password")?.value,
            authorities:this.crudForm.get("authorities")?.value,

          };
        this.userService.register(userDTO).subscribe({
          next:(data:UserDTO)=>{
             this.snack.open("Se registró correctamente y se asignó el Id "+data.id.toString(),"OK",{duration:2000});
                this.router.navigate(["/login"]);
           },
           error: (http_error)=>{
               this.snack.open("ERROR: No se agregó el registro solicitado. "+http_error.error.message,"OK",{duration:5000});
               console.log(http_error);
           }
        })
      }
      else {
        this.crudForm.markAllAsTouched();
      }
    }
}
