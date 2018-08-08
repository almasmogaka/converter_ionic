import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DataApiProvider } from '../providers/data-api/data-api';
import { SqlitehelperProvider } from '../providers/sqlitehelper/sqlitehelper';

import { SQLite } from '@ionic-native/sqlite';
import { ReportPage } from '../pages/report/report';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ReportPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ReportPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataApiProvider,
    SqlitehelperProvider
  ]
})
export class AppModule {}
