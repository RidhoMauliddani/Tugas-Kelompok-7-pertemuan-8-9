import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  // API KEY 
  private apiKey = 'api-key';


    private apiUrl =
  'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';


  constructor(private http: HttpClient) {}

  generateText(prompt: string): Observable<any> {

    const url = `${this.apiUrl}?key=${this.apiKey}`;

    const body = {
      contents: [{
        parts: [{ text: prompt }]
      }]
    };

    return this.http.post<any>(url, body);
  }
}
