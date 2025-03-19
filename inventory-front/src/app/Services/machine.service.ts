import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../config';
import { Observable } from 'rxjs';
import { ResponseMachine } from '../Interfaces/responseMachine';
import { Machine } from '../Interfaces/machines';

@Injectable({
  providedIn: 'root'
})
export class machineService {

  private url: string = environment.apiURL;
  private api: string = this.url + "machines/";
  constructor(private http: HttpClient) { }

  getMachines(): Observable<ResponseMachine> {
    return this.http.get<ResponseMachine>(`${this.api}list`);
  }

  add(request: Machine): Observable<Machine> {
    return this.http.post<Machine>(`${this.api}add`, request);
  }

  update(id: number, request: Machine): Observable<Machine> {
    return this.http.put<Machine>(`${this.api}update/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}Delete/${id}`);
  }
}
