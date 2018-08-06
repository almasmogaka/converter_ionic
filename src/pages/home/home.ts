import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SqlitehelperProvider } from '../../providers/sqlitehelper/sqlitehelper';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { DataApiProvider } from '../../providers/data-api/data-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  error: any = null;
  amount: number = 1;
  toAmount: any = 0;
  fromCurrency: string = null;
  toCurrency: string = null;
  rates: Array<any> = [];
  fromRates: Object = {};


  //private ListUser : any;  
  private todo: FormGroup;
  ListUser: any;

  constructor(public navCtrl: NavController, private database: SqlitehelperProvider, 
    private formBuilder: FormBuilder, public alertCtrl: AlertController, private data: DataApiProvider) {

    this.todo = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      lname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      amount: ['', [Validators.required]]
    });

  }

  CreateUser(){
    console.log(this.todo);
    
    this.database.CreateUser(this.todo.value.fname, this.todo.value.lname, this.todo.value.amount ).then( (data) => {
      console.log(data);
      if(data) {
        const alert = this.alertCtrl.create({
          title: "CONGRATULATIONS!",
          subTitle: "successfully Added",
          buttons: ['ok']
        });
        alert.present();
      }
      
    }, (error) => {
      console.log(error);
    })
  }

  GetAllUser(){
    this.database.GetAllUsers().then((data: any) => {
      console.log('users',data);
      this.ListUser = data;
    }, (error) => {
      console.log(error);
    })
  }

  convert() {
    this.data.getRates().subscribe(response => {
      console.log('home api service',response)
      if (response.rates) {
        const items: Array<any> = this.parseData(response.rates);
        this.rates = items;
        this.fromRates = response.rates;

        this.calculate();
      } else {
        this.error = 'Unable to get data from API';
      }
    }, (error) => {
      this.error = 'There was an error: ' + error.status + ' - ' + error.statusText;
    });
  }
  private handleErrors() {
    this.error = null;

    if (!this.amount) {
      this.error = 'Please enter the amount';

    }

    if (!this.fromCurrency) {
      this.fromCurrency = this.rates[149].id;

    }
    if (!this.toCurrency) {
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
  calculate() {
    this.handleErrors();

    if (!this.error) {
      this.toAmount = ((this.amount / this.fromRates[this.fromCurrency] * this.fromRates[this.toCurrency] * 100) / 100).toFixed(2);      
    }
  }

}
