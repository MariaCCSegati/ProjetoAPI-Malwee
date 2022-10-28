import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-modal-subgroup',
  templateUrl: './modal-subgroup.component.html',
  styleUrls: ['./modal-subgroup.component.scss']
})
export class ModalSubgroupComponent implements OnInit {

  description:string = '';
  subgroup:Array<any> = [];
  id: number | undefined;
  html: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalSubgroupComponent>, private http : HttpClient, private httpService : HttpService
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
    this.subgroup =  await this.httpService.post('subgroup', {description : this.description});
    console.log(this.description);
    alert('adicionado')
  }

  async delete(){
    this.subgroup =  await this.httpService.patch(`subgroup/${this.id}`, {});
    alert('deletado!')
  }

  async edit(){
    this.subgroup =  await this.httpService.put('subgroup', {id: this.id, description: this.description});
    alert('editado!')
  }


}
