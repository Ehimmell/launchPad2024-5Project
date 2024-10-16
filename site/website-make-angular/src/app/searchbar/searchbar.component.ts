import { Component } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from "@angular/common";
import { ProfessorCardComponent } from "../professor-card/professor-card.component";

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    ProfessorCardComponent
  ],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  private apiUrl = 'http://127.0.0.1:8000/';
  public name: string = '';
  public results: string[] = [];
  public professorInfo: string[] = [];
  public classInfo: string[] = [];
  public gpas: number[] = [];
  public classes: string[] = [];

  search(): Observable<string[]> {
    return from(axios.get<string[]>(`${this.apiUrl}search/?name=${this.name}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        this.handleError(error);
        throw error;
      }));
  }

  getProfessor(): Observable<string[]> {
    return from(axios.get<string[]>(`${this.apiUrl}professorFind/professor/?name=${this.replaceSpaces(this.name)}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        this.handleError(error);
        throw error;
      }));
  }

  removeDashes(str: string): string {
    const regex = new RegExp('-', 'g');
    return str.replace(regex, '');
  }

  replaceSpaces(str: string): string {
    return str.replace(/ /g, '%20');
  }

  getClasses(): Observable<string[]> {
    return from(axios.get<string[]>(`${this.apiUrl}professorFind/classes/?uuid=${this.removeDashes(this.professorInfo[3])}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        this.handleError(error);
        throw error;
      }));
  }

  onSearch() {
    this.search().subscribe(results => {
      this.results = results;
    });
  }

  onNameClick(name: string) {
    this.name = name;
    this.getProfessor().subscribe(professorInfo => {
      this.professorInfo = professorInfo;
      this.getClasses().subscribe(classInfo => {
        this.classInfo = classInfo;
        for (let i = 0; i < this.classInfo.length; i++) {
          this.gpas.push(parseFloat(this.classInfo[i][2]));
          this.classes.push(this.classInfo[i][1]);
        }
      });
    });
  }

  handleError(error: any) {
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error: Please check your internet connection or backend server.');
    } else {
      console.error('An error occurred:', error.message);
    }
  }
}
