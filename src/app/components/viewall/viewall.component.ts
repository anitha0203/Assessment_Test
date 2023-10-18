import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/util.service';
import { Answers } from '../interfaces/answers.model';

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.css']
})
export class ViewallComponent {

  answers: Answers[] = []
  correct: number = 0
  wrong: number = 0

  constructor(private util: UtilService, private route: Router) { }

  ngOnInit() {
    var email = localStorage.getItem('Email')
    this.util.getAnswers(email).subscribe((response) => {
      var data = JSON.parse(JSON.stringify(response))
      this.answers = data
      for (var i = 0; i < this.answers.length; i++) {
        if (this.answers[i].selected == this.answers[i].correct)
          this.correct = this.correct + 1
      }
      this.wrong = this.answers.length - this.correct
    });
  }

  logout() {
    this.util.logout();
    this.route.navigate(['login'])
  }
}
