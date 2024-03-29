import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TimeagoIntl, TimeagoModule, TimeagoCustomFormatter, TimeagoFormatter } from 'ngx-timeago';

export class MyIntl extends TimeagoIntl {
  // do extra stuff here...
  }

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    TimeagoModule.forRoot({
      intl: {provide: TimeagoIntl, useClass: MyIntl },
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
