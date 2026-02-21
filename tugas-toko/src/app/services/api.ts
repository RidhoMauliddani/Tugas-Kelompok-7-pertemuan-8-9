import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProduk(): Observable<any> {
    return this.http.get(`${this.apiUrl}/produk`);
  }
  
  tambahProduk(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/produk`, data);
  }

  hapusProduk(id: number) {
  return this.http.delete(`${this.apiUrl}/produk/${id}`);
  }
  updateProduk(id: number, data: any) {
  return this.http.put(`${this.apiUrl}/produk/${id}`, data);
  }

}
