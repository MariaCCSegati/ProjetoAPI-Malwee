import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalCollectionComponent } from '../modal-collection/modal-collection.component';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  description:string = '';
  collection:Array<any> = []
  grupinho:string = '';
  modal: string = '';
  html:string = '';
  id: any;

  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.list();
    this.html = 'false';
    this.modal = 'false';
  }

  public htmlAdd(){
    this.html = 'true';
  }


  openDialog(){
    const dialogRef = this.dialog.open(ModalCollectionComponent, {
      width: '550px',
      data: {id : this.id, description: this.description}
    });
   

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.grupinho = result;
    });
  }


  teste(){
    this.collection.push({description : this.description})
    console.log(this.collection)
  }

  async list(){
    this.collection = await this.httpService.get('collection');
    console.log(this.collection)
  }
}
