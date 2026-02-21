import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    CommonModule,
    FormsModule
  ],
})
export class HomePage implements OnInit {

  produkList: any[] = [];

  namaBaru: string = '';
  hargaBaru: number | null = null;

  editMode: boolean = false;
  editId: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.ambilData();
  }

  ambilData() {
    this.apiService.getProduk().subscribe({
      next: (data) => {
        this.produkList = data;
      },
      error: (err) => {
        console.error('Error ambil data:', err);
      }
    });
  }

  tambahProduk() {

    if (!this.namaBaru || !this.hargaBaru) {
      alert("Isi semua field dulu!");
      return;
    }

    const data = {
      nama: this.namaBaru,
      harga: this.hargaBaru
    };

    // 🔥 JIKA SEDANG EDIT
    if (this.editMode && this.editId !== null) {

      this.apiService.updateProduk(this.editId, data).subscribe({
        next: () => {
          alert("Produk berhasil diupdate!");
          this.resetForm();
          this.ambilData();
        },
        error: (err) => {
          console.error("Gagal update:", err);
        }
      });

    } else {

      // 🔥 JIKA TAMBAH BARU
      this.apiService.tambahProduk(data).subscribe({
        next: () => {
          alert("Produk berhasil ditambahkan!");
          this.resetForm();
          this.ambilData();
        },
        error: (err) => {
          console.error("Gagal tambah:", err);
        }
      });

    }
  }

  editProduk(item: any) {
    this.editMode = true;
    this.editId = item.id;
    this.namaBaru = item.nama;
    this.hargaBaru = item.harga;
  }

  hapusProduk(id: number) {
    this.apiService.hapusProduk(id).subscribe({
      next: () => {
        alert("Produk berhasil dihapus!");
        this.ambilData();
      },
      error: (err) => {
        console.error("Gagal hapus:", err);
      }
    });
  }

  resetForm() {
    this.namaBaru = '';
    this.hargaBaru = null;
    this.editMode = false;
    this.editId = null;
  }

}
