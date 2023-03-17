import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Moment } from '../Moments';
import { Response } from '../Response';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  private baseApiUrl = 'http://localhost:3333/';
  private apiUrl = `${this.baseApiUrl}api/moments`;

  constructor(private http: HttpClient) {}

  getMoments(): Observable<Response<Moment[]>> {
    return this.http.get<Response<Moment[]>>(this.apiUrl);
  }

  getMoment(id: number): Observable<Response<Moment>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<Moment>>(url);
  }

  createMomentService(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  removeMomentService(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  updateMomentService(id: number, formData: FormData): Observable<FormData> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<FormData>(url, formData);
  }
}
