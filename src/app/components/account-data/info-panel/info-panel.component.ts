import { Component, OnInit } from '@angular/core';
import { NasaService } from '../../../services/api-rest/nasa.service';
import { Observable } from 'rxjs';
import { NasaData } from '../../../models/nasa-data';
import {  Pokemon } from 'src/app/models/poke-data';
import { PokeapiService } from '../../../services/api-rest/pokeapi.service';


@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.css']
})
export class InfoPanelComponent implements OnInit {

  nasaData$ = new Observable<NasaData[] | null>();

  maxPokemon: number = 150;
  allPokemons: Pokemon[] = [];
  seletedPokemon: string | undefined;

  constructor(private nasaService: NasaService,
    private pokeApiService :PokeapiService) { }

  ngOnInit(): void {
  this.getNasaData()
  this.getPokemonData()

  }



  getPokemonData(): void{
    for (let i = 0 ; i< this.maxPokemon ; i++){
      this.pokeApiService.getPokemons(i+1)
      .subscribe(
        data=>{

        let pokemonData = new Pokemon(data.name, data.sprite);
        console.log(data.sprite,data.name)
        this.allPokemons.push(pokemonData);
        } );
    }
  }

  pokemonSelected(pokemon: string): void{
    this.seletedPokemon = pokemon;
  }


  getNasaData(): void{
    this.nasaData$ =  this.nasaService.getThreeData(this.twoDaysDateAgo());
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
