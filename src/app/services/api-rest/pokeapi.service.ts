import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from 'src/app/models/poke-data';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private pokeApiUrl = environment.pokeApi;

  constructor(private http: HttpClient) {}

  getPokemons(pokemonId: number){
    let url =this.pokeApiUrl + pokemonId;

    return this.http.get<Pokemon>(url);

  }

}
