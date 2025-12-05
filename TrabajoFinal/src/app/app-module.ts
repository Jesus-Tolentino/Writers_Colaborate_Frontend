import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AuthorList } from './components/authorities/author-list/author-list';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { MaterialModuleModule } from './modules/material-module/material-module-module';
import { AuthorAddEdit } from './components/authorities/author-add-edit/author-add-edit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatAnchor } from "@angular/material/button";
import { DeleteConfirmation } from './components/confirmations/delete-confirmation/delete-confirmation';
import { ProjectList } from './components/projects/project-list/project-list';
import { Header } from './components/header/header';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { ProjectAddEdit } from './components/projects/project-add-edit/project-add-edit';
import { Register } from './components/register/register';
//import { Comments } from './components/comments/comments';
import { ProjectCollection } from './components/project-collection/project-collection';
import { Collection } from './components/collection/collection';
import { CommentsAddEdit } from './components/comments/comments-add-edit/comments-add-edit';
import { CommentsList } from './components/comments/comments-list/comments-list';
import { provideAnimations } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    App,
    AuthorList,
    AuthorAddEdit,
    DeleteConfirmation,
    ProjectList,
    Header,
    Home,
    Login,
    ProjectAddEdit,
    Register,
    Comment,
    ProjectCollection,
    Collection,
    CommentsAddEdit,
    CommentsList
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MatAnchor
],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideNativeDateAdapter(),
    provideHttpClient(
      withInterceptors([autorizacionInterceptor])
    )
  ],
  bootstrap: [App]
})
export class AppModule { }
