import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/util.service';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {

  constructor(private service: UtilService) { }

  ngOnInit() {
    this.service.logout();
  }
}
