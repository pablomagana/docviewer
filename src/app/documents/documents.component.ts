import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take, takeUntil } from 'rxjs';
import { DocumentDto } from '../models/document.dto';
import { DocumentsService } from '../services/documents.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent {
  documentsSubs: Observable<DocumentDto[]>;
  documents: DocumentDto[];
  currentPage = 2;
  lastPage = 1;
  filters = [
    { id: '0', name: 'todos' },
    {
      id: '1',
      name: 'simple',
    },
    {
      id: '2',
      name: 'personalizado',
    },
    {
      id: '3',
      name: 'avanzado',
    },
  ];

  filterValue: { id: string; name: string } = this.filters[0];
  constructor(
    public documentService: DocumentsService,
    private router: Router
  ) {
    this.getDocuments();
  }

  updateSearch(): void {
    console.log(this.filterValue);
    this.getDocuments();
  }
  setPage(page: number): void {
    this.currentPage += page;
    this.getDocuments();
  }

  getDocuments(): void {
    this.documentService
      .getDocuments(this.filterValue.id, this.currentPage)
      .pipe(take(1))
      .subscribe((data) => {
        this.documents = data.documents;
        this.lastPage = data.lastPage;
      });
  }

  deleteDocument(doc: DocumentDto) {
    if (confirm('¿Está seguro de eliminar el documento?')) {
      this.documentService
        .deleteDocumet(doc.id)
        .pipe(take(1))
        .subscribe(() => {
          alert('Documento eliminado !');
          this.getDocuments();
        });
    }
  }

  goToDocumentDetail(doc: DocumentDto) {
    console.log(doc);
    this.router.navigate([`/documents/${doc.id}`, doc]);
  }

  trackByCode(index: number, item: any): string {
    return item.id;
  }
}
