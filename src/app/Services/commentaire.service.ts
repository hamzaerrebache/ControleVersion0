import { Commentaire } from '../models/Commentaie.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  private apiUrl = 'http://localhost:3000/Commentaire';

  constructor(private http: HttpClient) { }

  getAllCommentaire(): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(this.apiUrl);
  }

  createCommentaire(commentaire: Commentaire): Observable<any> {
    return this.http.post<Commentaire[]>(this.apiUrl, commentaire);
  }
  
}