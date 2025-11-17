import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AuthorList } from './components/authorities/author-list/author-list';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModuleModule } from './modules/material-module/material-module-module';
import { AuthorAddEdit } from './components/authorities/author-add-edit/author-add-edit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatAnchor } from "@angular/material/button";
import { DeleteConfirmation } from './components/confirmations/delete-confirmation/delete-confirmation';
import { ProjectList } from './components/projects/project-list/project-list';
@NgModule({
  declarations: [
    App,
    AuthorList,
    AuthorAddEdit,
    DeleteConfirmation,
    ProjectList
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
    provideNativeDateAdapter()
  ],
  bootstrap: [App]
})
export class AppModule { }
