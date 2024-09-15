import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Tarea} from '../models/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private apiUrl = 'http://localhost:5181';
  constructor(private http: HttpClient) { }

  getTareas():Observable<Tarea[]>{
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  getTarea(id:number):Observable<Tarea>{
    return this.http.get<Tarea>('${this.apiUrl}/${id}');
  }

  crearTarea(tarea:Tarea):Observable<Tarea>{
    return this.http.post<Tarea>(this.apiUrl,tarea);
  }

  actualizarTarea(id:number, tarea:Tarea):Observable<Tarea>{
    return this.http.put<Tarea>(`${this.apiUrl}/${id}`, tarea);
  }

  eliminarTarea(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
