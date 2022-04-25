import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { DocumentsComponent } from './documents/documents.component';

const routes: Routes = [
  {
    path: 'documents',
    component: DocumentsComponent,
  },
  {
    path: 'documents/:id',
    component: DocumentDetailComponent,
  },
  {
    path: '',
    redirectTo: '/documents',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/documents',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
