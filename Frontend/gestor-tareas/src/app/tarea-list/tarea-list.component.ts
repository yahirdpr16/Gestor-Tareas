import { Component, OnInit } from '@angular/core';
import {Tarea} from '../models/tarea';
import { TareasEstadoService } from '../services/tareas-estado.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tarea-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarea-list.component.html',
  styleUrl: './tarea-list.component.css'
})
export class TareaListComponent implements OnInit{
tareas$:Observable<Tarea[]>;

constructor(private tareasEstadoService:TareasEstadoService){
  this.tareas$ = this.tareasEstadoService.tareas$;
}

ngOnInit(): void {
}

actualizarEstado(tarea: Tarea):void{
  tarea.estado = tarea.estado === 'En progreso' ? 'Completada' : 'En progreso';
    this.tareasEstadoService.actualizarTarea(tarea); 
}
}
