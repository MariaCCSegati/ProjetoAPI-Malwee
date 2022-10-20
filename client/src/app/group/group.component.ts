import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  description:string = '';
  group:Array<any> = []


  constructor(private http : HttpClient ) { }


  ngOnInit(): void {
  }

  teste(){
    this.group.push({description : this.description})
    console.log(this.group)
  }

  list(){
    this.http.get('http://localhost:3012/group',{}).toPromise().then((response: any) => {
      this.group = response;    
      this.teste();
    });
  }

  insert(){
    this.http.post('http://localhost:3012/group', {description : this.description}).toPromise().then((response: any) => {
        console.log('Passou aqui');
        this.list();
      }); 
  }
}
