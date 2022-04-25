import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DocumentDto } from 'src/app/models/document.dto';

@Component({
  selector: 'app-doc-card',
  templateUrl: './doc-card.component.html',
  styleUrls: ['./doc-card.component.scss'],
})
export class DocCardComponent implements OnInit {
  @Input() doc: DocumentDto;
  @Output() onDelete = new EventEmitter<DocumentDto>();
  constructor() {}

  ngOnInit(): void {
    if (!this.doc.image) this.doc.image = 'assets/default-doc.png';
  }

  deleteDoc(doc: DocumentDto, event: any): void {
    event.stopPropagation();
    this.onDelete.emit(doc);
  }
}
