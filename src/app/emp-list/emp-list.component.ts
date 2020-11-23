import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {
  empList = [];
  constructor() {
    this.empList = JSON.parse(localStorage.getItem('empList'));
    console.log('emp', this.empList);

  }

  ngOnInit() {
  }

  deleteEmp(index) {
    this.empList.splice(index, 1);
    console.log('emp delete', this.empList, index);

    localStorage.removeItem('empList');
    localStorage.setItem('empList', JSON.stringify(this.empList));
  }
}
