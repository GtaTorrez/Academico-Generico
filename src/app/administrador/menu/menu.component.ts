import {MediaMatcher} from '@angular/cdk/layout';
import { Component, OnInit,ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  

  openside:boolean=true;
  btn:boolean=false;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 959px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    if(this.mobileQuery.matches){
      this.openside=false;
    }
  }
  constructore() {

    
    
   }

  ngOnInit() {
    let a;
  
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  cambio():boolean{
    if(this.openside){
      this.openside=false;
    }else{
      this.openside=true;
    }
    
    console.log("cambio"+"" +this.openside)
    return this.openside 
  }
  
  cambiodePantalla(){
    console.log("cambio de tamanho " +screen.width)
    
  }
  

  

}
