import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { ResponseMachine } from '../Interfaces/responseMachine';
import { Machine } from '../Interfaces/machines';

@Injectable({
  providedIn: 'root'
})
export class machineService {

  private url: string = environment.apiUrl;
  private api: string = this.url ;
  constructor(private http: HttpClient) { }

  getMachines(): Observable<ResponseMachine> {
    return this.http.get<ResponseMachine>(`${this.api}`);
  }

  add(request: Machine): Observable<Machine> {
    return this.http.post<Machine>(`${this.api}`, request);
  }

  update(id: string, request: Machine): Observable<Machine> {
    return this.http.put<Machine>(`${this.api}/${id}`, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  patch(id: string, partialData: Partial<Machine>): Observable<Machine> {
    return this.http.patch<Machine>(`${this.api}/${id}`, partialData);
  }
}
