import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SqlitehelperProvider } from '../../providers/sqlitehelper/sqlitehelper';

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private database: SqlitehelperProvider) {
      this.GetAllUser();
  }

  ListUser: any;

  GetAllUser(){
    this.database.GetAllUsers().then((data: any) => {
      this.ListUser = data;
    }, (error) => {
      console.log(error);
    })
  }

}
