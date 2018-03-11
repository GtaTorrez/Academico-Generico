import { Component, OnInit } from '@angular/core';
import {LoadersService} from '../loaders.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {
  isLoadingResults = true;
  isRateLimitReached = false;
  subscription:Subscription;
  constructor(
    private load:LoadersService
  ) { }

  ngOnInit() {
    this.subscription = this.load.observableEstado.subscribe(data=>{
      this.isLoadingResults=data;  
    })
  }

}
