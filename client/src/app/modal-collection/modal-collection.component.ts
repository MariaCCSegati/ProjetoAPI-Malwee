import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-modal-collection',
  templateUrl: './modal-collection.component.html',
  styleUrls: ['./modal-collection.component.scss']
})
export class ModalCollectionComponent implements OnInit {

  description:string = '';
  collection:Array<any> = [];
  id: number | undefined;
  html: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalCollectionComponent>, private http : HttpClient, private httpService : HttpService
  ) { }

  ngOnInit(): void {
    this.html = 'false';
  }
  public htmlAdd(){
    this.html = 'true';
}

  cancel(): void {
    this.dialogRef.close();
  }

  async insert(){
    this.collection =  await this.httpService.post('collection', {description : this.description});
    console.log(this.description);
    alert('adicionado')
  }

  async delete(){
    this.collection =  await this.httpService.patch(`collection/${this.id}`, {});
    alert('deletado!')
  }

  async edit(){
    this.collection =  await this.httpService.put('collection', {id: this.id, description: this.description});
    alert('editado!')
  }

}
