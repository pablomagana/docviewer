import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumentDto } from '../models/document.dto';
import { ResponseDocuments } from '../models/documents-response';

const entity = 'documents';
@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  constructor(private http: HttpClient) {}

  getDocuments(
    filter = '0',
    page = 1,
    limit = 4
  ): Observable<ResponseDocuments> {
    let urlRequest = `${environment.apiUrl}/${entity}?_page=${page}&_limit=${limit}`;
    if (filter !== '0') {
      urlRequest += `&filter=${filter}`;
    }
    return this.http.get(urlRequest, { observe: 'response' }).pipe(
      map((response) => {
        const totalCount: string = response.headers.get('X-Total-Count') || '0';
        return {
          lastPage: this.getLastPage(parseInt(totalCount), limit),
          documents: response.body,
        } as ResponseDocuments;
      })
    );
  }

  getDocument(id: string): Observable<DocumentDto> {
    return this.http.get<DocumentDto>(`${environment.apiUrl}/${entity}/${id}`);
  }

  deleteDocumet(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${entity}/${id}`);
  }

  getLastPage(totalRegisters: number, limit: number): number {
    return Math.ceil(totalRegisters / limit);
  }
}
