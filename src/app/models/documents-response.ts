import { DocumentDto } from './document.dto';

export interface ResponseDocuments {
  lastPage: number;
  documents: DocumentDto[];
}
