import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../module/author';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  ruta_servidor:string="http://localhost:8081/api/authors";
  constructor(private http:HttpClient){}
  findAll()
  {
    return this.http.get<Author[]>(this.ruta_servidor);
  }
  findById(id:number)
  {
    return this.http.get<Author>(this.ruta_servidor+"/"+id.toString())
  }
  update(author:Author)
  {
    return this.http.put<Author>(this.ruta_servidor,author);
  }
  new(author:Author)
  {
    return this.http.post<Author>(this.ruta_servidor,author);
  }
  deleteById(id:number)
  {
    return this.http.delete(this.ruta_servidor+"/"+id.toString());
  }
}
