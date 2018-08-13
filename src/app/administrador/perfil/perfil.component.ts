import { Component, OnInit ,OnDestroy,Input,Output,EventEmitter,DoCheck } from '@angular/core';
import { ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Persona} from '../modelos/persona';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {AdministradorService} from '../administrador.service';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import {Global} from '../../config/global'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'es'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class PerfilComponent implements OnInit,OnDestroy,DoCheck {

  edit:boolean=false;
  @Input() persona:Persona;
  @Input() action:string;
  @Input() tipo:string;

  @Input() qrCode:string;

  @Output() EnviarPersona=new EventEmitter();
  startDate = new Date(1999,1, 1);

  form: FormGroup;
  loading: boolean = false;
  headerAction:string;

  expedidos: any[] = [
    {value: 'LP', viewValue: 'La Paz'},
    {value: 'OR', viewValue: 'Oruro'},
    {value: 'CB', viewValue: 'Cochabamba'},
    {value: 'SC', viewValue: 'Santa Cruz'},
    {value: 'BN', viewValue: 'Beni'},
    {value: 'PA', viewValue: 'Pando'},
    {value: 'TJ', viewValue: 'Tarija'},
    {value: 'CH', viewValue: 'Chuquisaca'},
  ];

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private http:AdministradorService
        ) {
    this.createForm()
  }
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      avatar: null
    });
  }

  ngOnInit() {

    this.cancel();
    console.log("inicio")
    if(this.action==='editar' || this.action==='nuevo' ){
      this.edit=true;
    }
    if(this.action==='editar'){
      this.headerAction="Editar datos"
    }
    if(this.action==='nuevo'){
      this.headerAction="Registrar nuevo"
    }
  }
  ngOnDestroy(){
    this.persona=null;
  }
  ngDoCheck(){
    if(this.action==='ver'){
      this.edit=false;

    }else{
      if(this.action==='editar' || this.action==='nuevo' ){
        this.edit=true;
      }
    }

  }

  cancel(){

  }

  onFileChange(event) {
    console.log("CAMBIO DE IMAGEN");
  }
  private prepareSave(): any {
    let input = new FormData();
    // This can be done a lot prettier; for example automatically assigning values by looping through `this.form.controls`, but we'll keep it as simple as possible here
    //input.append('foto', "subiendo");

    input.append('avatar', this.fileInput.nativeElement.files.item(0));

    console.log(input.get('avatar'))
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;
    // In a real-world app you'd have a http request / service call here like
    // this.http.post('apiUrl', formModel)
    this.http.postPersonaImg(formModel,this.persona.id).subscribe(data=>{
      console.log("echo")
      console.log(data)
      this.persona.img= Global.BASE_URL+":"+Global.port +'/'+data.img;
      alert('hecho')
      this.loading=false;
    },err=>{
      alert('error')
      console.error(err)
    })

  }
  clearFile() {
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }



}
