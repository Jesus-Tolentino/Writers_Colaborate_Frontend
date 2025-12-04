import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorList } from './components/authorities/author-list/author-list';
import { AuthorAddEdit } from './components/authorities/author-add-edit/author-add-edit';
import { ProjectList } from './components/projects/project-list/project-list';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { ProjectAddEdit } from './components/projects/project-add-edit/project-add-edit';
import { Register } from './components/register/register';
import { AuthorRegister } from './components/author-register/author-register';

const routes: Routes = [
  {path:"author-list",component:AuthorList},
  {path:"author-add", component:AuthorAddEdit},
  {path:"author-edit/:id", component:AuthorAddEdit},
  {path:"project-list", component:ProjectList},
  {path:"project-add", component:ProjectAddEdit},
   {path:"project-edit/:id", component:ProjectAddEdit},
  {path:"home", component:Home},
   {path:"", component:Login},
  {path:"login", component:Login},
  {path:"register", component:Register},
  {path:"author-register",component:AuthorRegister}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
