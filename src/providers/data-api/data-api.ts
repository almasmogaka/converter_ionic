import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class DataApiProvider {

  constructor(public http: HttpClient) {
  }
  private apiKey = "0622e72efb6f80aafdf7dacb782fc243";
  private serverUrl = "http://data.fixer.io/api/";
  
  getRates(): Observable<any> {
    const url = `${this.serverUrl}/latest`;    
    return this.http.get(url, { params: { access_key: this.apiKey } }).pipe(
      map(res => res));
  } 

}
