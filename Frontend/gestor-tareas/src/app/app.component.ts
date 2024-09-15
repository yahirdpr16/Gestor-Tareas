import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TareaListComponent } from './tarea-list/tarea-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TareaListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestor-tareas';
}
