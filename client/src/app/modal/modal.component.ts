import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  description:string = '';
  group:Array<any> = [];
  id: number | undefined;
  html: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>, private http : HttpClient, private httpService : HttpService
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
    this.group =  await this.httpService.post('grupo', {description : this.description});
    console.log(this.description);
    alert('adicionado')
  }

  async delete(){
    this.group =  await this.httpService.patch(`grupo/${this.id}`, {});
    alert('deletado!')
  }

  async edit(){
    this.group =  await this.httpService.put('grupo', {id: this.id, description: this.description});
    alert('editado!')
  }

}
