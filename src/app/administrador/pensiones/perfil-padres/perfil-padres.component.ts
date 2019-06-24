import { Component, OnInit, Input } from '@angular/core';
import { Persona } from '../../modelos/persona';

@Component({
  selector: 'app-perfil-padres',
  templateUrl: './perfil-padres.component.html',
  styleUrls: ['./perfil-padres.component.css']
})
export class PerfilPadresComponent implements OnInit {

  @Input() persona:Persona;
  constructor() { }

  ngOnInit() {
  }

}
