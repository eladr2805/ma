import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImagesSrvService } from './images-srv.service';
import { ReactiveFormsModule } from '@angular/forms';
import {Ng2Webstorage} from 'ngx-webstorage';

 
@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    Ng2Webstorage
  ],
  providers: [ImagesSrvService],
  bootstrap: [AppComponent]
})
export class AppModule { }
