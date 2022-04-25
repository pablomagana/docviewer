import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { DocumentDto } from '../models/document.dto';
import { DocumentsService } from '../services/documents.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss'],
})
export class DocumentDetailComponent implements OnInit {
  @Input() doc: DocumentDto;

  constructor(
    private route: ActivatedRoute,
    private documentsService: DocumentsService
  ) {}

  routeGoBack = '/documents';

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      console.log(params);
      if (!this.doc) {
        this.documentsService
          .getDocument(params['id'])
          .pipe(take(1))
          .subscribe((doc) => {
            this.doc = doc;
          });
      }
    });
  }

  isNotSimpleType() {
    return this.doc.type !== '1';
  }

  hasImage() {
    return this.doc.image;
  }
}
