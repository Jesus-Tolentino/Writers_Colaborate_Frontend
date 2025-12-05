import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  ruta_servidor:string="http://localhost:8080/upc/proyectos";
  constructor(private http:HttpClient){}
  findAll()
  {
    return this.http.get<Project[]>(this.ruta_servidor);
  }
  findById(id:number)
  {
    return this.http.get<Project>(this.ruta_servidor+"/"+id.toString())
  }
  update(project:Project)
  {
    return this.http.put<Project>(this.ruta_servidor,project);
  }
  new(project:Project)
  {
    return this.http.post<Project>(this.ruta_servidor,project);
  }
  deleteById(id:number)
  {
    return this.http.delete(this.ruta_servidor+"/"+id.toString());
  }
  listByAutorId(autorId:number)
  {
    return this.http.get<Project>(this.ruta_servidor+"/autor/"+autorId.toString());
  }
}
