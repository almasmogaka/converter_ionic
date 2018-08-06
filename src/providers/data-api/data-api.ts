import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class DataApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DataApiProvider Provider');
  }

}
