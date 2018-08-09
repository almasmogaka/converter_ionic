import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SqlitehelperProvider } from '../../providers/sqlitehelper/sqlitehelper';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { DataApiProvider } from '../../providers/data-api/data-api';
import { ReportPage } from '../report/report';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  error: any = null;
  amount: number =1;
  toAmount: any=0;
  fromCurrency: string = null;
  toCurrency: string = null;
  rates: Array<any> = [];
  fromRates: Object = {};
  myDate: any = new Date();
  
  

  //private ListUser : any;  
  private todo: FormGroup;
  

  constructor(public navCtrl: NavController, private database: SqlitehelperProvider, 
    private formBuilder: FormBuilder, public alertCtrl: AlertController, private data: DataApiProvider) {

    this.todo = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      lname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      amount: ['', [Validators.required]],
      fromCurrency: ['', [Validators.required]],
      toCurrency: ['', [Validators.required]],
      toAmount: ['', [Validators.required]],
      myDate: [new Date(), [Validators.required]]
    });
    this.convert();
  }

  CreateUser(){
    console.log(this.todo);
    
    this.database.CreateUser(this.todo.value.fname, this.todo.value.lname, this.todo.value.amount,this.todo.value.fromCurrency, this.todo.value.toCurrency, this.todo.value.toAmount, this.todo.value.myDate ).then( (data) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    })
  }
  convert() {
    this.data.getRates().subscribe(response => {
      if (response.rates) {
        const items: Array<any> = this.parseData(response.rates);
        this.rates = items;
        this.fromRates = response.rates;
      
        this.calculate();
      } else {
        this.error = 'Unable to get data from API';
      }
    }, (error) => {
      this.error = 'Internet connectivity problem';
    });
  }
  calculate() {
    this.handleErrors();

    if (!this.error) {
      this.toAmount = ((this.amount / this.fromRates[this.fromCurrency] * this.fromRates[this.toCurrency] * 100) / 100).toFixed(2);      
    }
  }
  private handleErrors() {
    this.error = null;

    if (!this.amount) {
      this.error = 'Please enter the amount';
    }

    if (!this.fromCurrency && this.rates[149]) {
      this.fromCurrency = this.rates[149].id;

    }
    if (!this.toCurrency && this.rates[74]) {
      this.toCurrency = this.rates[74].id;

    }

    if (this.toCurrency === this.fromCurrency) {
      this.amount = this.toAmount;
      this.error = 'N/A to covert same currency';
    }
  }

  private parseData(data) {
    const arr: Array<any> = [];

    for (const key in data) {
      if (key) {
        const obj = {
          id: key,
          value: data[key]
        };
        arr.push(obj);
      }
    }

    return arr;
  }
 
  reportPage() {
    this.navCtrl.push(ReportPage);
  }

}
