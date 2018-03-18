import { Component, OnDestroy } from '@angular/core';
import { LoadersService }       from './loader/loaders.service';
import { Subscription }         from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  estado:boolean=false;
  subscription:Subscription;
  constructor(private loaderService:LoadersService) {
    this.subscription = this.loaderService.observableEstado.subscribe((data:boolean)=>{
      this.estado=data;
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
