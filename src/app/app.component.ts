import { Component,OnInit } from '@angular/core';
import { ImagesSrvService } from './images-srv.service';
import { FormControl, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  imageForm:FormGroup;
  mdesc:string;//description
  mIdx:number;//hold array index.-1 in case of new item
  isShowForm:boolean = false;//show hide form
  btnText:string="Send";

  constructor(private imagesSrvService:ImagesSrvService) {
    this.imageForm = new FormGroup({
      fcDesc: new FormControl(''),
      fcFile: new FormControl(''),
      fcIdx: new FormControl(0),
    });
    this.mIdx=-1;
  }

  //will hold base64 image
  private base64textString:String="";

  handleFileSelect(files:FileList) : void{
    var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();
        reader.onload =this.handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
    }
    else if(this.mIdx > -1)
    {
        let imgDesc = this.imageForm.get('fcDesc').value;
        if(imgDesc != undefined)
          this.imagesSrvService.saveImage(null,imgDesc,this.mIdx);
    }
  }
  
  reset() : void{
    this.imageForm.reset();
    this.mIdx = -1;
    this.btnText = "Send";
  }

  handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
            this.base64textString= btoa(binaryString);
            this.base64textString = this.base64textString.replace(/^data:image\/(png|jpg);base64,/, "");
            this.imagesSrvService.saveImage(this.base64textString,this.imageForm.get('fcDesc').value,this.mIdx);
            this.reset();
    }

saveImage() : void{
  var inputValue = (<HTMLInputElement>document.getElementById("galImage")).files;  
  let imgData = this.handleFileSelect(inputValue);
  if(this.mIdx > -1){
    this.reset();
  }
}

showForm(val:boolean):void{
  this.isShowForm = val;
}

public onImageDelete():void{
  this.reset();
}

public onImageEdit(val: any):void {
    this.mdesc = val.desc;
    this.mIdx = val.idx;
    this.isShowForm = true;
    this.btnText = "Update";
}
}