import { CommentDTO } from './../../../models/commentDTO';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepicker } from '@angular/material/datepicker';
import { CommentService } from '../../../services/comment-service';
import { AuthorService } from '../../../services/author-service';
import { Author } from '../../../models/author';
import { Project } from '../../../models/project';

@Component({
  selector: 'app-comments-add-edit',
  standalone: false,
  templateUrl: './comments-add-edit.html',
  styleUrl: './comments-add-edit.css',
})

export class CommentsAddEdit {
    @ViewChild('pickerCreation') pickerCreation!: MatDatepicker<Date>;
  @ViewChild('pickerPublication') pickerPublication!: MatDatepicker<Date>;
  crudForm!:FormGroup;
  commentId:number=0;
  authors!:Author[];
  projects!:Project[];

  constructor(private commentService: CommentService,
    private authorService:AuthorService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute){}

ngOnInit(): void {
    this.CargarFormulario();
  }

CargarAutores() {
      this.authorService.findAll().subscribe({
      next: (data:Author[])=>{
        this.authors=data;
      },
      error: (err)=>{
          console.log(err);
      }
    });
  }

  CargarProyectos() {
      this.projectService.findAll().subscribe({
      next: (data:Project[])=>{
        this.projects=data;
      },
      error: (err)=>{
          console.log(err);
      }
    });
  }

CargarFormulario() {
    this.crudForm = this.formBuilder.group(
      {
        id:[""],
        content:["",[Validators.required, Validators.minLength(5)]],
        publicationDate:["",[Validators.required]],
        authorId:["",[Validators.required]],
        projectId:["",[Validators.required]]
      }
    );

    this.commentId = parseInt(this.activatedRoute.snapshot.params["id"]);

    if (this.commentId>0 && this.commentId!=undefined) {

        this.commentService.getById(this.commentId).subscribe({
            next:(data:CommentDTO)=>{
              this.crudForm.get("id")?.setValue(data.id);
              this.crudForm.get("content")?.setValue(data.content);
              this.crudForm.get("publicationDate")?.setValue(data.publicationDate+"T00:00:00");
              this.crudForm.get("autorid")?.setValue(data.autorId);
              this.crudForm.get("proyectoid")?.setValue(data.proyectoId);
            }
        })
    }
  }

  Grabar(){

    if (this.crudForm.valid) {

      const commentDTO:CommentDTO= {
          id:this.crudForm.get("id")?.value,
          content:this.crudForm.get("content")?.value,
          publicationDate:this.crudForm.get("publicationDate")?.value,
          autorId:this.crudForm.get("majorId")?.value,
          autorName:"",
          proyectoId:this.crudForm.get("projectId")?.value,
          proyectoTitle:""
        };

        if (commentDTO.id>0) {
          this.commentService.edit(commentDTO).subscribe({
              next:(data:CommentDTO)=>{
                this.snack.open("Se actualizó el Comentario con el Id "+data.id.toString(),"OK",{duration:2000});
                this.router.navigate(["/comment-list"]);
              },
                error: (http_error)=>{
                        this.snack.open("ERROR: No se actualizó el registro solicitado. "+http_error.error.message,"OK",{duration:5000});
                        console.log(http_error);
              }
          })
        } else {
            this.commentService.new(commentDTO).subscribe({
            next:(data:CommentDTO)=>{
              this.snack.open("Se registró el Comentario y se asignó el Id "+data.id.toString(),"OK",{duration:2000});
              this.router.navigate(["/comment-list"]);
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
