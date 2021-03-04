import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NasaData } from '../../models/nasa-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NasaService {

  private apiKey = 'api_key=isvpL0r3Tiium1vhyE2uzy6W0gUGXJftU5AscYgY';
  private api = environment.nasaApi;

  constructor(private http: HttpClient) { }

  getThreeData(query: string): Observable<NasaData[]>{
    const url = this.api + 'start_date=' + query + this.apiKey;
    return this.http.get<NasaData[]>(url);
  }

}
