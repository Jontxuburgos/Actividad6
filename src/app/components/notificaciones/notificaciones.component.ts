import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent {
  @Input() msg: string = "";
  notificacion: string = "";
  visible: boolean = false;
  @Input() type: string = "";

  constructor(private router: Router){
    
  }

  ngDoCheck(): void{
    if(this.msg !== "") {
      this.notificacion = this.msg
      this.visible = true;
    }
  }

  cerrar(){
    this.notificacion ="";
    this.visible = false;
    this.router.navigate(['home'])

  }

}
