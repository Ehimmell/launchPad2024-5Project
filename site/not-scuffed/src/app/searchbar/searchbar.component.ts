import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // Import CommonModule
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import {ProfessorCardComponent} from '../professor-card/professor-card.component';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ProfessorCardComponent
  ],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements AfterViewInit {
  searchInput: HTMLElement | null = null;
  private apiUrl = 'http://127.0.0.1:8000/';
  public name: string = '';
  results: string[] = [];
  professorInfo: any[] = [];
  classInfo: any[] = [];
  gpas: number[] = [];
  classes: string[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  ngAfterViewInit(): void {}

  onEnter() {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Search Query:', this.name);
      this.search().subscribe(results => {
        this.results = results;
        console.log('Search Results:', this.results);
      });
    }
  }

  search(): Observable<string[]> {
    const encodedName = encodeURIComponent(this.name);
    return this.http.get<string[]>(`${this.apiUrl}search/?name=${encodedName}`)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of([]);
        })
      );
  }

  getProfessor(): Observable<any[]> {
    const encodedName = encodeURIComponent(this.name);
    return this.http.get<any[]>(`${this.apiUrl}professorFind/professor/?name=${encodedName}`)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of([]);
        })
      );
  }

  getClasses(): Observable<any[]> {
    const uuid = this.professorInfo[3] ? this.removeDashes(this.professorInfo[3]) : '';
    return this.http.get<any[]>(`${this.apiUrl}professorFind/classes/?uuid=${uuid}`)
      .pipe(
        catchError(error => {
          this.handleError(error);
          return of([]);
        })
      );
  }

  removeDashes(str: string): string {
    return str.replace(/-/g, '');
  }

  replaceSpaces(str: string): string {
    return str.replace(/ /g, '%20');
  }

  onNameClick(name: string) {
    this.name = name;
    this.getProfessor().subscribe(professorInfo => {
      this.professorInfo = professorInfo;
      this.getClasses().subscribe(classInfo => {
        this.classInfo = classInfo;
        this.gpas = this.classInfo.map(info => parseFloat(info[2]));
        this.classes = this.classInfo.map(info => info[1]);
        console.log('GPA Array:', this.gpas);
        console.log('Classes Array:', this.classes);
      });
    });
  }

  handleError(error: any) {
    if (error.status === 0) {
      console.error('Network error: Please check your internet connection or backend server.');
    } else {
      console.error('An error occurred:', error.message);
    }
  }
}
