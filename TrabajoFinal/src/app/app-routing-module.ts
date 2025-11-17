import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorList } from './components/authorities/author-list/author-list';
import { AuthorAddEdit } from './components/authorities/author-add-edit/author-add-edit';
import { ProjectList } from './components/projects/project-list/project-list';

const routes: Routes = [
  {path:"author-list",component:AuthorList},
  {path:"author-add", component:AuthorAddEdit},
  {path:"author-edit/:id", component:AuthorAddEdit},
  {path:"project-list", component:ProjectList},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
