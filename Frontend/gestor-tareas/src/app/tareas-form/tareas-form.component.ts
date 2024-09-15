import { Component } from '@angular/core';
import { TareasService } from '../services/tareas.service';
import { TareasEstadoService } from '../services/tareas-estado.service';
import { Tarea } from '../models/tarea';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tareas-form',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './tareas-form.component.html',
  styleUrl: './tareas-form.component.css'
})
export class TareasFormComponent {
  nuevaTarea: Tarea = {
    id: 0,
    titulo: '',
    descripcion: '',
    estado: 'Pendiente',
  };
  constructor(private tareasEstadoService:TareasEstadoService){}

  onSubmit() {
    this.tareasEstadoService.agregarTarea(this.nuevaTarea);
    this.nuevaTarea = { id: 0, titulo: '', descripcion: '', estado: 'Pendiente' };
  }
  
}
