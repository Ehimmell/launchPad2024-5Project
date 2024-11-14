import {AfterViewInit, Component, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, NgForOf, NgIf} from '@angular/common';
import {from, Observable} from 'rxjs';
import axios from 'axios';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
  searchInput: HTMLElement | null = null;
  private apiUrl = 'http://127.0.0.1:8000/';
  public name: string = '';
  results: string[] = [];
  professorInfo: string[] = [];
  classInfo: string[] = [];
  gpas: number[] = [];
  classes: string[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  onEnter() {
    if (isPlatformBrowser(this.platformId)) {
      console.log(this.name)
      this.search().subscribe(results => {
        this.results = results;
      });
    }
  }

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
