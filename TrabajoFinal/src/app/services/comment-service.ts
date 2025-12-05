import { CommentDTO } from './../models/commentDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  ruta_servidor:string = "http://localhost:8080/upc";
  recurso:string="commentss";

  constructor(private http:HttpClient){}

  getAll(){
    return this.http.get<CommentDTO[]>(this.ruta_servidor+"/"+this.recurso);
  }

  getById(id: number){
    return this.http.get<CommentDTO>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  deleteById(id: number){
    return this.http.delete(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  new(commentDTO: CommentDTO){
    return this.http.post<CommentDTO>(this.ruta_servidor+"/"+this.recurso,commentDTO);
  }

  edit(commentDTO: CommentDTO){
    return this.http.put<CommentDTO>(this.ruta_servidor+"/"+this.recurso,commentDTO);
  }

  getByAutorId(autorId:number){
    return this.http.get<CommentDTO[]>(this.ruta_servidor+"/"+this.recurso+"/"+"faculty"+"/"+autorId.toString());
  }

  getByProjectId(projectId:number){
    return this.http.get<CommentDTO[]>(this.ruta_servidor+"/"+this.recurso+"/"+"faculty"+"/"+projectId.toString());
  }
}
