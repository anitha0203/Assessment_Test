import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { AdminComponent } from './components/admin/admin.component';
import { ViewallComponent } from './components/viewall/viewall.component';
import { SubmitComponent } from './components/submit/submit.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'instructions', component: InstructionsComponent, canActivate: [AuthGuard], data: { role: 'User' } },
  { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard], data: { role: 'User' } },
  { path: 'submit', component: SubmitComponent, canActivate: [AuthGuard], data: { role: 'User' } },

  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'viewall', component: ViewallComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },

  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
