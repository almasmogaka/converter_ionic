import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SqlitehelperProvider {

  private db: SQLiteObject;
  private isOpen: boolean;

  constructor(
    public http: HttpClient, 
    private storage: SQLite) {
   
      if (!this.isOpen) {
        this.storage = new SQLite();
        this.storage.create({ name: "data.db", location: "default" }).then((db: SQLiteObject) => {
          this.db = db;
          db.executeSql("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, fname TEXT, lname TEXT)", []);
          this.isOpen = true;
        }).catch((error) => {
          console.log('create issues',error);
        })
      }
   
  }
  CreateUser(fname:string, lname:string){
    return new Promise ((resolve, reject) => {
      let sql = "INSERT INTO users ( fname, lname) VALUES (?, ?)";
      this.db.executeSql(sql, [fname, lname]).then((data) =>{
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  GetAllUsers(){
    return new Promise ((resolve, reject) => {
      this.db.executeSql("SELECT * FROM users", []).then((data) => {
        let arrayUsers = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            arrayUsers.push({
              id: data.rows.item(i).id,
              fname: data.rows.item(i).fname,
              lname: data.rows.item(i).lname
            });            
          }          
        }
        resolve(arrayUsers);
      }, (error) => {
        reject(error);
      })
    })
  }
  DeleteUser(idUser){
  }

}
