import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../module/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  ruta_servidor:string="http://localhost:8081/api/projects";
  constructor(private http:HttpClient){}
  findAll()
  {
    return this.http.get<Project[]>(this.ruta_servidor);
  }
  findById(id:number)
  {
    return this.http.get<Project>(this.ruta_servidor+"/"+id.toString())
  }
  update(Project:Project)
  {
    return this.http.put<Project>(this.ruta_servidor,Project);
  }
  new(Project:Project)
  {
    return this.http.post<Project>(this.ruta_servidor,Project);
  }
  deleteById(id:number)
  {
    return this.http.delete(this.ruta_servidor+"/"+id.toString());
  }
  
}
