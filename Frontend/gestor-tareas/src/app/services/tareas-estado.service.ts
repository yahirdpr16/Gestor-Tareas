import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tarea } from '../models/tarea';
import { TareasService } from './tareas.service';


@Injectable({
  providedIn: 'root'
})
export class TareasEstadoService {
  private tareasSubject = new BehaviorSubject<Tarea[]>([]);
  tareas$: Observable<Tarea[]> = this.tareasSubject.asObservable();

  constructor(private tareasService: TareasService) {
    this.cargarTareas(); 
  }

  cargarTareas() {
    this.tareasService.getTareas().subscribe((tareas) => {
      this.tareasSubject.next(tareas);
    });
  }

  
  agregarTarea(nuevaTarea: Tarea) {
    this.tareasService.crearTarea(nuevaTarea).subscribe((tarea) => {
      const tareasActuales = this.tareasSubject.value;
      this.tareasSubject.next([...tareasActuales, tarea]);
    });
  }


  actualizarTarea(tareaActualizada: Tarea) {
    this.tareasService.actualizarTarea(tareaActualizada.id, tareaActualizada).subscribe(() => {
      const tareasActuales = this.tareasSubject.value.map(tarea =>
        tarea.id === tareaActualizada.id ? tareaActualizada : tarea
      );
      this.tareasSubject.next(tareasActuales);
    });
  }


  eliminarTarea(id: number) {
    this.tareasService.eliminarTarea(id).subscribe(() => {
      const tareasActuales = this.tareasSubject.value.filter(tarea => tarea.id !== id);
      this.tareasSubject.next(tareasActuales);
    });
  }
}
