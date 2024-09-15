import { Component } from '@angular/core';
import { TareasService } from '../services/tareas.service';
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
  constructor(private tareasService:TareasService){}

  onSubmit() {
    this.tareasService.crearTarea(this.nuevaTarea).subscribe(
      (respuesta:Tarea) => {
        console.log('Tarea creada:', respuesta);
        
        this.nuevaTarea = {
          id: 0,
          titulo: '',
          descripcion: '',
          estado: 'Pendiente'
        };
      },
      (error) => {
        console.error('Error al crear la tarea:', error);
      }
    );
  }
  
}
