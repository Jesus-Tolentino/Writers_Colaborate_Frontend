import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../models/project';
import { MatDatepicker } from '@angular/material/datepicker';
@Component({
  selector: 'app-project-add-edit',
  standalone: false,
  templateUrl: './project-add-edit.html',
  styleUrl: './project-add-edit.css'
})
export class ProjectAddEdit {
    @ViewChild('pickerCreation') pickerCreation!: MatDatepicker<Date>;
  @ViewChild('pickerPublication') pickerPublication!: MatDatepicker<Date>;
  crudForm!:FormGroup;
  projectId:number=0;
  constructor(private projectService: ProjectService, private formBuilder: FormBuilder, private snack: MatSnackBar, private router: Router,
     private activatedRoute: ActivatedRoute){}

ngOnInit(): void {
    this.CargarFormulario();
  }
CargarFormulario() {
    this.crudForm = this.formBuilder.group(
      {
        id:[""],
        title:["",[Validators.required, Validators.minLength(2)]],
        description:["",[Validators.required, Validators.minLength(6)]],
        creationDate:["",[Validators.required]],
        publicationDate:["",[Validators.required]],
        state:["",[Validators.required]],
        meetingsEnabled:[""]
      }
    );

    this.projectId = parseInt(this.activatedRoute.snapshot.params["id"]);

    if (this.projectId>0 && this.projectId!=undefined) {

        this.projectService.findById(this.projectId).subscribe({
            next:(data:Project)=>{
              this.crudForm.get("id")?.setValue(data.id);
              this.crudForm.get("title")?.setValue(data.title);
              this.crudForm.get("description")?.setValue(data.description);
              this.crudForm.get("creationDate")?.setValue(data.creationDate+"T00:00:00");
              this.crudForm.get("publicationDate")?.setValue(data.publicationDate+"T00:00:00");
              this.crudForm.get("state")?.setValue(data.state);
              this.crudForm.get("meetingsEnabled")?.setValue(data.meetingsEnabled);
            }
        })

    }
  }

  Grabar(){

    if (this.crudForm.valid) {

      const project:Project= {
          id:this.crudForm.get("id")?.value,
          title:this.crudForm.get("title")?.value,
          description:this.crudForm.get("description")?.value,
          creationDate:this.crudForm.get("creationDate")?.value,
          publicationDate:this.crudForm.get("publicationDate")?.value,
          state:this.crudForm.get("state")?.value,
          meetingsEnabled:this.crudForm.get("meetingsEnabled")?.value
        };


        if (project.id>0) {
          this.projectService.update(project).subscribe({
              next:(data:Project)=>{
                this.snack.open("Se actualizó el Proyecto con el Id "+data.id.toString(),"OK",{duration:2000});
                this.router.navigate(["/project-list"]);
              },
                error: (http_error)=>{
                        this.snack.open("ERROR: No se actualizó el registro solicitado. "+http_error.error.message,"OK",{duration:5000});
                        console.log(http_error);
              }
          })
        } else {
            this.projectService.new(project).subscribe({
            next:(data:Project)=>{
              this.snack.open("Se registró el Proyecto y se asignó el Id "+data.id.toString(),"OK",{duration:2000});
              this.router.navigate(["/project-list"]);
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
