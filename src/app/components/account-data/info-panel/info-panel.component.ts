import { Component, OnInit } from '@angular/core';
import { NasaService } from '../../../services/api-rest/nasa.service';
import { Observable } from 'rxjs';
import { NasaData } from '../../../models/nasa-data';
import { PokeData } from 'src/app/models/poke-data';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.css']
})
export class InfoPanelComponent implements OnInit {

  nasaData$ = new Observable<NasaData[] | null>();
  pokeData$= new Observable<PokeData[] | null>();

  constructor(private nasaService: NasaService) { }

  ngOnInit(): void { this.getNasaData()}

  getNasaData(): void{
    this.nasaData$ =  this.nasaService.getThreeData(this.twoDaysDateAgo());
    this.nasaData$.subscribe(res => console.log(res));
  }

  twoDaysDateAgo(): string{
    const todaydate = new Date();

    // Two days in miliseconds.
    const threeDays= 1000 * 60 * 60 * 24 * 2;
    const dateTwoDaysAgo= todaydate.getTime() - threeDays;
    const newDate = new Date(dateTwoDaysAgo);

    // In the collection the months start from 0, add one to achieve the current month,
    // if nasa returns 400 please delete the one. Maybe it's my system. :c
    return newDate.getFullYear()+'-'+ (newDate.getMonth() + 1 )+'-'+ newDate.getDate()+ '&'
  }

}
