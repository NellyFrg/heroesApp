import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heore.model';
import { HeroesService } from 'src/app/services/heroes.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  guardar(form: NgForm){
    
    if(form.invalid){
      console.log('Formulario no valido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Informacion',
      icon: 'info',  
      allowOutsideClick:false
    });
    
  Swal.showLoading();
    
  let peticion: Observable<any>;

    if (this.heroe.id){
      peticion = this.heroesService.actualizarHeroe( this.heroe );
    }else{
      peticion = this.heroesService.crearHeroe( this.heroe);  
    }

    peticion.subscribe(resp =>{
      Swal.fire({
         title: this.heroe.nombre,
         text: 'Se actualizo correctamente',
         icon: 'success'
      });
   });  
   
  }

}
