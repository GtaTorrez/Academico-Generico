import {MediaMatcher} from '@angular/cdk/layout';
import { Component, OnInit,OnDestroy,ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadersService } from '../../loader/loaders.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit,OnDestroy{

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  estado:boolean=false;
  subscription:Subscription;
  
  

  openside:boolean=true;
  btn:boolean=false;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private loaderService:LoadersService  
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 650px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    if(this.mobileQuery.matches){
      this.openside=false;
    }
    
    this.subscription = this.loaderService.observableEstado.subscribe((data:boolean)=>{
      this.estado=data;
    })
    this.loaderService.cambiarEstado(false);
  }
  ngOnInit() {
    this.loaderService.cambiarEstado(false);
  
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subscription.unsubscribe();
  }
  cambio(){
    
  }
  
  cambiodePantalla(){
    console.log("cambio de tamanho " +screen.width)
    
  }
  

  

}
