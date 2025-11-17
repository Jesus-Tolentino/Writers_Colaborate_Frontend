import { Component } from '@angular/core';
import { ProjectService } from '../../../services/project-service';
import { Project } from '../../../module/project';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmation } from '../../confirmations/delete-confirmation/delete-confirmation';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-project-list',
  standalone: false,
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList {
dsProjects= new MatTableDataSource<Project>();
columnsToDisplay: string[] = ['id', 'authorId', 'authorName', 'title'];
columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
expandedElement: Project | null=null;
constructor(private projectService:ProjectService,private dialog: MatDialog, private snack: MatSnackBar){}
ngOnInit()
{
 this.CargarLista();
}
CargarLista()
{
  this.projectService.findAll().subscribe
  (
    {
      next:(data:Project[])=>
      {
        this.dsProjects=new MatTableDataSource(data);
      },
      error:(err)=>
      {
        console.log(err);
      }
    }
  )
}
applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsProjects.filter = filterValue.trim().toLowerCase();
  }
isExpanded(element: Project) {
    return this.expandedElement === element;
  }
 toggle(element: Project) {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }
Borrar(id:number){
    let dialogReference = this.dialog.open(DeleteConfirmation);

    dialogReference.afterClosed().subscribe(
      opcionSelecionada=>{

        if(opcionSelecionada) {
          this.projectService.deleteById(id).subscribe({
            next:()=>{
                    this.snack.open("Se eliminó el registro solicitado","OK",{duration:2000});
                      this.CargarLista();
                    },
            error: (http_error)=>{
                    this.snack.open("ERROR: No se eliminó el registro solicitado. "+http_error.error.message,"OK",{duration:5000});
                    console.log(http_error);
            }   
          })
        }
      }
    );
    
  }



}
