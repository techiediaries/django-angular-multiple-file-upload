import { Component, OnInit } from '@angular/core';

import { UploadService } from '../upload.service';

import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { concat } from 'rxjs';

import {  mergeMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  DJANGO_SERVER = 'http://127.0.0.1:8000';

  public uploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;


  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }
  
  fileOverBase(event): void {
    this.hasBaseDropZoneOver = event;
  }

  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;

    });
  }
  



  upload() {
   
    let files = this.getFiles();
    console.log(files);
    let requests = [];
    files.forEach((file) => {
      let formData = new FormData();
      formData.append('file' , file.rawFile, file.name);
      requests.push(this.uploadService.upload(formData));
      
    });
 
    concat(...requests).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {  
        console.log(err);
      }
    );

    //console.log('form data variable :   '+ formData.getAll('file'));



    /*this.uploadService.upload(formData).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {  
        console.log(err);
      }
    );*/
  }


}
