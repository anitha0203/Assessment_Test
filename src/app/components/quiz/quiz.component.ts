import { Component, OnDestroy, OnInit } from '@angular/core';
import { UtilService } from 'src/app/util.service';
import { Questions } from '../interfaces/questions.models';
import { FormControl, FormGroup } from '@angular/forms';
import { Answers } from '../interfaces/answers.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit, OnDestroy {

  questions: Questions[] = []
  currentIndex: number = 0;
  quizForm!: FormGroup;
  answers: any[] = []
  answerss: Answers[] = []
  // quesType: string = 'Sychometric'
  private timer: any; 
  private quizTimeInSeconds: number = 900; 
  timeRemaining: number = this.quizTimeInSeconds;

  constructor(private util: UtilService, private route: Router){}

  ngOnInit(){
      this.quizForm = new FormGroup({});
      this.util.getQuestions().subscribe((response) => {
        var data = JSON.stringify(response)
        this.questions = JSON.parse(data)    
        for(var i=0;i<this.questions.length;i++)
            this.answers[i] = ''
      });

      this.startTimer();
  }

  previousQuestion() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
  }

  nextQuestion() {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++;
      }
  }

  selectQues(index:number){
    this.currentIndex = index
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${this.padNumber(minutes)}:${this.padNumber(remainingSeconds)}`;
  }
  
  padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }
  
  ngOnDestroy() {
    // Clear the timer when the component is destroyed to prevent memory leaks
    clearTimeout(this.timer);
  }
  
  startTimer() {
    this.timer = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        clearInterval(this.timer);
        this.submitAnswers(); // Handle quiz submission when time is up
      }
    }, 1000); // Update every 1 second
  }
  

  onSubmit() {
    this.answerss = [];
    var len = 0
    for(var i=0;i< this.answers.length;i++)
       if(this.answers[i]=='') len++;
    if(len != 0){
        const confirm = window.confirm('If you submit now, you will not be able to go back and change your answers.');
        if(confirm){
            this.submitAnswers()
        }
    } else{
        this.submitAnswers()
    }
  }

  submitAnswers(){
      for (var i = 0; i < this.questions.length; i++) {  
        const dat = {email:'',question:'',correct:'',selected:'',ques_type:''}
        dat.email = 'anitha@gmail.com';
        dat.question = this.questions[i].question;
        dat.correct = this.questions[i].correct;
        dat.ques_type = this.questions[i].ques_type;
        dat.selected = this.answers[i]
        this.answerss.push(dat)
      }
      this.util.postAnswers(this.answerss).subscribe((response) => {
        var res = JSON.parse(JSON.stringify(response))
          this.route.navigate(['/submit']);
      },(error) =>{
        console.log('Something went wrong!!!');
      });
  }


  // You have not answered all of the questions. Would you like to submit your answers now? 
  // If you submit now, you will not be able to go back and change your answers.

}




// export class QuizComponent implements OnInit {

//   questions: Questions[] = []
//   sychometric_ques: Questions[] = []
//   communication_ques: Questions[] = []
//   general_ques: Questions[] = []
//   program_ques: Questions[] = []
//   database_ques: Questions[] = []

//   currentIndex: number = 0;
//   // quizForm!: FormGroup;
//   answers: Answers[] = []
//   quesType: string = 'Sychometric'

//   constructor(private util: UtilService){}

//   ngOnInit(){
//     // this.quizForm = new FormGroup({});
//     this.util.getQuestions().subscribe((response) => {
//       var data = JSON.stringify(response)
//       this.questions = JSON.parse(data)

//       // for(var i=0; i < this.questions.length;i++){
//       //   this.answers[i].email = 'anitha@gmail.com'
//       //   this.answers[i].question = this.questions[i].question
//       //   this.answers[i].correct = this.questions[i].correct
//       //   this.answers[i].ques_type = this.questions[i].ques_type
//       // }
//       // for(var i=0; i < this.questions.length;i++){
//       //     if(this.questions[i].ques_type == 'Sychometric')
//       //       this.sychometric_ques.push(this.questions[i])
//       //       else if(this.questions[i].ques_type == 'Communication')
//       //       this.communication_ques.push(this.questions[i])
//       //       else if(this.questions[i].ques_type == 'General Aptitude')
//       //       this.general_ques.push(this.questions[i])
//       //       else if(this.questions[i].ques_type == 'Programming')
//       //       this.program_ques.push(this.questions[i])
//       //       else if(this.questions[i].ques_type == 'Database')
//       //       this.database_ques.push(this.questions[i])
//       // }

//       // console.log(this.database_ques);
//       // console.log(this.general_ques);
//       // console.log(this.communication_ques);
//       // console.log(this.program_ques);
      
      
//       // for (const question of this.questions) {
//       //   this.quizForm.addControl(`question-${question.id}`, new FormControl(''));
//       // }      
    
//     });
//   }

//   previousQuestion() {
//     if (this.currentIndex > 0) {
//       this.currentIndex--;
//     }
//   }

//   nextQuestion() {
//     if (this.currentIndex < this.questions.length - 1) {
//       this.currentIndex++;
//     }
//   }
// }

