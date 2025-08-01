import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = 'http://localhost:8000/search';

  constructor(private http: HttpClient) {}

  search(userQuery: string, page = 1, limit = 10) {
    const body = {
      user_query: userQuery,
      page,
      limit,
    };

    return this.http.post<any>(this.apiUrl, body);
  }
}
