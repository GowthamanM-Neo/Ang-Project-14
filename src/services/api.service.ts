import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { City } from 'src/model/city';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  public getCountries():Observable<any>{
    return this.http.get<any>('https://restcountries.eu/rest/v2/all');
  }

  public getCities(data:City):Observable<any>{
    return this.http.post<any>('https://countriesnow.space/api/v0.1/countries/cities',data);
  }

  public getUsers():Observable<any>{
    return this.http.get<any>('https://api.mocki.io/v1/50b6e912/getUsers');
  }
}
