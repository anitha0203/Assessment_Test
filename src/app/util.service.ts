import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Answers } from './components/interfaces/answers.model';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:3000/'
  roleAs!: string | null;

  //////////////////             Quiz Page         ///////////////////////////////////

  getQuestions() {
    return this.http.get(this.url + 'getQuestions')
  }

  postAnswers(data: Answers[]) {
    return this.http.post(this.url + 'postAnswers', data, { responseType: 'text' })
  }

  //////////////////             Signup Page         ///////////////////////////////////

  signup(data: string) {
    return this.http.post(this.url + 'postStudents', data, { responseType: 'text' });
  }

  checkEmail(email: string) {
    return this.http.post(this.url + 'checkEmail', email)
  }

  //////////////////             Signin Page         ///////////////////////////////////

  signin(data: string) {
    return this.http.post(this.url + 'checkStudents', data, { responseType: 'text' });
  }

  checkTest(email: any) {
    return this.http.post(this.url + 'checkTestAttempted', { email: email })
  }

  //////////////////             Admin Page         ///////////////////////////////////

  getStudent() {
    return this.http.get(this.url + 'getStudent')
  }

  getStudents(records: number) {
    return this.http.post(this.url + 'getStudents', { records: records })
  }

  getAnswer() {
    return this.http.get(this.url + 'getAnswer')
  }

  getAnswers(email: any) {
    return this.http.post(this.url + 'getAnswers', { email: email })
  }


  getRole() {
    this.roleAs = localStorage.getItem('role');
    return this.roleAs;
  }

  saveToken(token: string) {
    localStorage.setItem('jwt_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('role');
    localStorage.removeItem('Email');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;
  }
}
