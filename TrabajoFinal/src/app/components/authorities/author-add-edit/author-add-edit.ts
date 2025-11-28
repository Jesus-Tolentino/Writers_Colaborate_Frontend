import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router} from '@angular/router';
import { AuthorService } from '../../../services/author-service';
import { Author } from '../../../module/author';

@Component({
  selector: 'app-author-add-edit',
  standalone: false,
  templateUrl: './author-add-edit.html',
  styleUrl: './author-add-edit.css',
})
export class AuthorAddEdit {
  crudForm!: FormGroup;
  authorId: number = 0;
  constructor(private authorService: AuthorService, private formBuilder: FormBuilder, private snack: MatSnackBar, private router: Router,
     private activatedRoute: ActivatedRoute) { }

ngOnInit(){
    this.CargarFormulario();
  }

  CargarFormulario() {
    this.crudForm = this.formBuilder.group(
      {
        id:[""],
        name:["",[Validators.required, Validators.minLength(2)]],
        lastName:["",[Validators.required, Validators.minLength(2)]],
        birthdate:[""],
        email:[""],
      }
    );

    this.authorId = parseInt(this.activatedRoute.snapshot.params["id"]);

    if (this.authorId>0 && this.authorId!=undefined) {

        this.authorService.findById(this.authorId).subscribe({
            next:(data:Author)=>{
              this.crudForm.get("id")?.setValue(data.id);
              this.crudForm.get("name")?.setValue(data.name);
              this.crudForm.get("lastName")?.setValue(data.lastName);
              this.crudForm.get("birthdate")?.setValue(data.birthdate+"T00:00:00");
               this.crudForm.get("email")?.setValue(data.email);
            }
        })

    }


  }

  Grabar(){

    if (this.crudForm.valid) {


      const author:Author= {
          id:this.crudForm.get("id")?.value,
          name:this.crudForm.get("name")?.value,
          lastName:this.crudForm.get("lastName")?.value,
          birthdate:this.crudForm.get("birthdate")?.value,
          email:this.crudForm.get("email")?.value,
        };


        if (author.id>0) {
          this.authorService.update(author).subscribe({
              next:(data:Author)=>{
                this.snack.open("Se actualizó el Autor con el Id "+data.id.toString(),"OK",{duration:2000});
                this.router.navigate(["/author-list"]);
              },
                error: (http_error)=>{
                        this.snack.open("ERROR: No se actualizó el registro solicitado. "+http_error.error.message,"OK",{duration:5000});
                        console.log(http_error);
              }  
          })
        } else {
            this.authorService.new(author).subscribe({
            next:(data:Author)=>{
              this.snack.open("Se registró el autor y se asignó el Id "+data.id.toString(),"OK",{duration:2000});
              this.router.navigate(["/author-list"]);
            },
                error: (http_error)=>{
                        this.snack.open("ERROR: No se agregó el registro solicitado. "+http_error.error.message,"OK",{duration:5000});
                        console.log(http_error);
            }  
          })
        }
    } else {
      this.crudForm.markAllAsTouched();
    }

  }

}
