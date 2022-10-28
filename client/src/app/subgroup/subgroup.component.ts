import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalSubgroupComponent } from '../modal-subgroup/modal-subgroup.component';

@Component({
  selector: 'app-subgroup',
  templateUrl: './subgroup.component.html',
  styleUrls: ['./subgroup.component.scss']
})
export class SubgroupComponent implements OnInit {

  description:string = '';
  subgroup:Array<any> = []
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
    const dialogRef = this.dialog.open(ModalSubgroupComponent, {
      width: '550px',
      data: {idGrupo : this.id, description: this.description}
    });
   

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.grupinho = result;
    });
  }


  teste(){
    this.subgroup.push({description : this.description})
    console.log(this.subgroup)
  }

  async list(){
    this.subgroup = await this.httpService.get('subgroup');
    console.log(this.subgroup)
  }

}


