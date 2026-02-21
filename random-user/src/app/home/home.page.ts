import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonTextarea,
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/angular/standalone';

import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { GeminiService } from '../services/gemini.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonTextarea,
    IonHeader,
    IonToolbar,
    IonTitle
  ]
})
export class HomePage {

  inputText: string = '';
  result: any = null;
  isLoading: boolean = false;

  private textSubject = new Subject<string>();

  constructor(private geminiService: GeminiService) {

    this.textSubject.pipe(
      debounceTime(1000),
      switchMap(text => {
        this.isLoading = true;

        return this.geminiService.generateText(
          `Check grammar for: "${text}".
Respond ONLY with pure JSON (no markdown, no explanation):
{
  "status": "Correct or Incorrect",
  "correction": "correct sentence here"
}`
        );
      })
    ).subscribe({
      next: (response: any) => {
        try {
          const rawText =
            response?.candidates?.[0]?.content?.parts?.[0]?.text;

          if (!rawText) {
            throw new Error('Invalid response structure');
          }

        
          const cleanedText = rawText
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

          this.result = JSON.parse(cleanedText);

        } catch (error) {
          console.error('JSON Parsing Error:', error);

          this.result = {
            status: "Error",
            correction: "AI response format invalid"
          };
        } finally {
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('HTTP Error:', err);

        this.result = {
          status: "Error",
          correction: "Failed to connect to AI service"
        };

        this.isLoading = false;
      }
    });
  }

  onTyping(event: any) {
    const value = event.target.value;
    this.inputText = value;

    if (value && value.trim().length > 0) {
      this.textSubject.next(value);
    } else {
      this.result = null;
    }
  }
}
