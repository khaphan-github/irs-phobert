import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from './search.service';


interface SearchResult {
  title: string;
  snippet: string;
  url: string;
  source: string;
  time: string;
  score: any
}

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
  results: SearchResult[] = [];
  showSearchModal = false;
  showNoResult = false;
  isLoading = false;
  recentSearches: string[] = [];

  constructor(private searchService: SearchService) { }
  ngOnInit() {
    const saved = localStorage.getItem('recentSearches');
    this.recentSearches = saved ? JSON.parse(saved) : [];
  }

  search() {
    const keyword = this.query.trim();
    if (!keyword) {
      this.results = [];
      this.showNoResult = true;
      return;
    }
    this.recentSearches = [keyword, ...this.recentSearches.filter(k => k !== keyword)].slice(0, 10);
    localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));

    this.isLoading = true;

    this.searchService.search(keyword, 1, 10).subscribe({
      next: (res) => {
        const rawResults = res.results || [];

        if (rawResults.length === 0) {
          this.results = [];
          this.showNoResult = true;
          this.isLoading = false;
          return;
        }

        this.results = rawResults.map((doc: any) => ({
          title: doc.title,
          snippet: this.generateSnippet(doc.text || doc.content || ''),
          url: doc.url || '#',
          source: doc.source || 'Không rõ nguồn',
          score: doc.score || 0,
          time: new Date(doc.pubxlish_time || doc.updatetime).toLocaleString('vi-VN'),
        }));

        this.showNoResult = false;
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

  generateSnippet(text: string): string {
    const clean = text.replace(/\s+/g, ' ').trim();
    return clean.length > 200 ? clean.slice(0, 200) + '...' : clean;
  }

  openUrl(url: string) {
    window.open(url, '_blank');
  }

  presentSearchModal() {
    this.showSearchModal = true;
  }

  dismissModal() {
    this.showSearchModal = false;
  }

  onRecentSearch(term: string) {
    this.query = term;
    this.results = []
    this.search();
  }
}
