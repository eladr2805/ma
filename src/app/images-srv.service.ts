import { Injectable } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Injectable()
export class ImagesSrvService {
  imagesArr:any[];

  constructor(private localSt:LocalStorageService) { 
    //init array
    this.imagesArr = [];
  }

  getImages() : any[]{
    let ret = [];
    let cats = this.localSt.retrieve('maitems');
    if(cats != undefined)
    {
      ret = JSON.parse(cats);
    }
    this.imagesArr = ret;
    return this.imagesArr;
  }

  saveImage(imgContent,desc,idx) : void{
    let obj = {desc:desc,content:imgContent};
    if(idx == -1){
        this.imagesArr.push(obj);
    }
    else//edit
      {
          for(var i = 0; i < this.imagesArr.length; i++) {
            if(i == idx){
              this.imagesArr[i].desc = desc;
              if(imgContent!= undefined){
                this.imagesArr[i].content = imgContent;
              }
            }
          }
      }
    //save in LS
    this.localSt.store('maitems', JSON.stringify(this.imagesArr));
  }

  deleteImage(idx){
    for(var i = 0; i < this.imagesArr.length; i++) {
        if(i == idx){
          this.imagesArr.splice(i, 1);
        }
      }
      this.localSt.store('maitems', JSON.stringify(this.imagesArr));
  }
}