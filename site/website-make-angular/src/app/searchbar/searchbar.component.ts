import { Component } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { FormsModule } from '@angular/forms';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  private apiUrl = 'http://127.0.0.1:8000/search/';
  public name: string = '';
  public results: string[] = [];

  search(): Observable<string[]> {
    return from(axios.get<string[]>(`${this.apiUrl}?name=${this.name}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      }));
  }

  onSearch() {
    this.search().subscribe(results => {
      this.results = results;
    });
  }
}
