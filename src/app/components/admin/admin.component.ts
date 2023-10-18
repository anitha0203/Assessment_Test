import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/util.service';
import { Answers } from '../interfaces/answers.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  studentDetails: any
  answers: Answers[] = []
  records = 10
  totalRecords: any
  constructor(private util: UtilService, private route: Router) { }

  ngOnInit() {
    this.studentsData();
    this.util.getStudent().subscribe((response) => {
      var data = JSON.parse(JSON.stringify(response))
      this.totalRecords = data[0].count
    });

    this.studentsData();

    this.util.getAnswer().subscribe((response) => {
      var data = JSON.stringify(response)
      this.answers = JSON.parse(data)
    });
  }

  score(email: string) {
    var s = 0;
    for (var i = 0; i < this.answers.length; i++) {
      if (this.answers[i].email == email) {
        if (this.answers[i].correct == this.answers[i].selected)
          s = s + 1;
      }
    }
    return s;
  }

  record(r: number) {
    this.records = r
    this.studentsData();
  }

  studentsData() {
    this.studentDetails = []
    this.util.getStudents(this.records).subscribe((response) => {
      var data = JSON.stringify(response)
      this.studentDetails = JSON.parse(data)
    });
  }

  saveEmail(email: string) {
    localStorage.setItem('Email', email)
  }

  logout() {
    this.util.logout();
    this.route.navigate(['login'])
  }

}
