import { Component, OnInit } from '@angular/core';
import {Tarea} from '../models/tarea';
import { TareasService } from '../services/tareas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarea-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarea-list.component.html',
  styleUrl: './tarea-list.component.css'
})
export class TareaListComponent implements OnInit{
tareas: Tarea[]=[];
constructor(private tareasService:TareasService){}

ngOnInit(): void {
  this.getTareas();
}

getTareas():void{
  this.tareasService.getTareas().subscribe(
    (data:Tarea[])=>{
      this.tareas=data;
    },
    (error)=>{
      console.error('Error al obtener tareas',error);
    }
  );
}

actualizarEstado(tarea: Tarea):void{
  tarea.estado=tarea.estado==='En progreso'?'Completada':'En progreso';
  this.tareasService.actualizarTarea(tarea.id,tarea).subscribe(
    (tareaActualizada)=>{
      console.log('Estado de la tarea actualizado', tareaActualizada);
    },
    (error)=>{
      console.log("Error al actualizar la tarea",error);
    }
  );
}
}
