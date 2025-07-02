import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from './search.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HttpClientModule
  ]
})
export class HomePage {
  query = '';
  results: {
    title: string;
    content: string;
    author: string;
    wordcount: number;
    tags: string[];
    id: number;
    publication: number;
    updatetime: number;
  }[] = [];

  showNoResult = false;
  isLoading = false;

  constructor(private searchService: SearchService) { }

  search() {
    const keyword = this.query.trim();
    if (!keyword) {
      this.results = [];
      this.showNoResult = true;
      return;
    }

    this.isLoading = true;
    this.searchService.search(keyword, 1, 10).subscribe({
      next: (res) => {
        this.results = res.results;
        this.showNoResult = res.results.length === 0;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Search error', err);
        this.results = [];
        this.showNoResult = true;
        this.isLoading = false;
      }
    });
  }

}
