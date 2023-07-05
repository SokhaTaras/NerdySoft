import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGetQuestionsResponse } from '../interfaces/get-questions-response.interface';
import { IGetCategoriesResponse } from '../interfaces/get-categories-response.interface';

@Injectable({
  providedIn: 'root',
})
export class TriviaApiService {
  private apiUrl = 'https://opentdb.com';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<IGetCategoriesResponse> {
    return this.http.get<IGetCategoriesResponse>(
      `${this.apiUrl}/api_category.php`
    );
  }

  getQuestions(
    amount: number,
    category: string
  ): Observable<IGetQuestionsResponse> {
    const params = new HttpParams()
      .set('amount', amount)
      .set('category', category);

    return this.http.get<IGetQuestionsResponse>(`${this.apiUrl}/api.php`, {
      params,
    });
  }
}
