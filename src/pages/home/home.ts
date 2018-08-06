import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SqlitehelperProvider } from '../../providers/sqlitehelper/sqlitehelper';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //private ListUser : any;  
  private todo: FormGroup;
  ListUser: any;

  constructor(public navCtrl: NavController, private database: SqlitehelperProvider, 
    private formBuilder: FormBuilder, public alertCtrl: AlertController) {

    this.todo = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      lname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]]
    });

  }

  CreateUser(){
    console.log(this.todo);
    
    this.database.CreateUser(this.todo.value.fname, this.todo.value.lname ).then( (data) => {
      console.log(data);
      if(data) {
        const alert = this.alertCtrl.create({
          title: "success",
          subTitle: "Information added successfully",
          buttons: ['ok']
        });
        alert.present();
      }
      this.GetAllUser();
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
  DeleteUser(idUser){
    console.log(idUser);

  }

}
