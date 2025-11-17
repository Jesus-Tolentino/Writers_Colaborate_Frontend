import { Component } from '@angular/core';
import { AuthorService } from '../../../services/author-service';
import { MatTableDataSource } from '@angular/material/table';
import { Author } from '../../../module/author';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmation } from '../../confirmations/delete-confirmation/delete-confirmation';

@Component({
  selector: 'app-author-list',
  standalone: false,
  templateUrl:'./author-list.html',
  styleUrl: './author-list.css',
})
export class AuthorList {
  dsAuthorities= new MatTableDataSource<Author>();
displayedColumns: string[] = ['id', 'firstname','lastname', 'birthdate', 'email','opciones'];
constructor(private authorService:AuthorService,private dialog: MatDialog, private snack: MatSnackBar){}
ngOnInit()
{
 this.CargarLista();
}
applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsAuthorities.filter = filterValue.trim().toLowerCase();
  }
CargarLista()
{
  this.authorService.findAll().subscribe
  (
    {
      next:(data:Author[])=>
      {
        this.dsAuthorities=new MatTableDataSource(data);
      },
      error:(err)=>
      {
        console.log(err);
      }
    }
  )
}
Borrar(id:number){
    let dialogReference = this.dialog.open(DeleteConfirmation);

    dialogReference.afterClosed().subscribe(
      opcionSelecionada=>{

        if(opcionSelecionada) {
          this.authorService.deleteById(id).subscribe({
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
