const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// DATA GLOBAL
let produk = [
  { id: 1, nama: "Laptop", harga: 7000000 },
  { id: 2, nama: "Mouse", harga: 150000 },
  { id: 3, nama: "Keyboard", harga: 300000 }
];

// Route test
app.get('/', (req, res) => {
  res.send('API Toko Berjalan');
});

// ======================
// GET PRODUK
// ======================
app.get('/produk', (req, res) => {
  res.json(produk);
});

// ======================
// POST PRODUK
// ======================
app.post('/produk', (req, res) => {
  const produkBaru = req.body;
  produkBaru.id = Date.now();

  produk.push(produkBaru);

  console.log("Produk masuk:", produkBaru);

  res.status(201).json(produkBaru);
});

// ======================
// UPDATE PRODUK
// ======================
app.put('/produk/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nama, harga } = req.body;

  const index = produk.findIndex(p => p.id === id);

  if (index !== -1) {
    produk[index].nama = nama;
    produk[index].harga = harga;

    console.log("Produk diupdate:", produk[index]);

    res.json(produk[index]);
  } else {
    res.status(404).json({ pesan: "Produk tidak ditemukan" });
  }
});

// ======================
// DELETE PRODUK
// ======================
app.delete('/produk/:id', (req, res) => {
  const id = parseInt(req.params.id);

  produk = produk.filter(p => p.id !== id);

  console.log("Produk dihapus dengan id:", id);

  res.json({ pesan: "Produk berhasil dihapus" });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
