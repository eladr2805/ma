import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { ImagesSrvService } from '../images-srv.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {
  imagesList:any[];
  showCheck:number;
  public show:number = -1;

  //events emiters
  @Output() onImageEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onImageDelete: EventEmitter<any> = new EventEmitter<any>();

  constructor(private imagesSrvService:ImagesSrvService) { }

  ngOnInit() {
    this.imagesList = this.imagesSrvService.getImages();
  }
  
  showheck(ev :any,idx:number) : void{
    if(ev.type == "mouseenter")
      {
        this.showCheck = idx; 
      }
      else
      {
        this.showCheck = -1;
      }
  }

  delImage(idx:number):void{
    this.imagesSrvService.deleteImage(idx);
    this.onImageDelete.emit();
    this.show = -1; 
  }

  editImage(idx:number):void{
      var desc = this.imagesList[idx].desc;
      let obj = {desc:desc,idx:idx};
      this.onImageEdit.emit(obj);
  }

  closeActions():void
  {
    //close actions panel
    this.show = -1; 
    this.onImageDelete.emit();
  }  

  checkClicked(idx:number) : void{
    //assign variable to a number to be used in 
    this.show = idx; 
    this.onImageDelete.emit();
  }
}