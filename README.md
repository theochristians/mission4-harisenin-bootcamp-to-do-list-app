# To-Do List

Aplikasi To-Do List sederhana dengan tampilan responsif untuk mencatat, mengatur, dan menyelesaikan tugas harian.

## Fitur

- Menambahkan tugas baru.
- Memilih prioritas tugas: **Low**, **Medium**, atau **High**.
- Menambahkan tenggat tugas.
- Menandai tugas sebagai selesai atau belum selesai.
- Menghapus tugas satu per satu.
- Menghapus seluruh tugas dengan tombol **Delete All**.
- Menampilkan jumlah tugas yang belum selesai dan sudah selesai.
- Memberi tanda **Terlambat** pada tugas yang melewati tenggat.
- Menyimpan data secara otomatis di `localStorage` browser.
- Menampilkan hari dan tanggal saat ini dalam bahasa Indonesia.
- Tampilan avatar profil berbentuk lingkaran.

## Teknologi

- HTML5
- CSS3
- JavaScript vanilla
- Browser Local Storage

## Struktur Folder

```text
mission4/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── anna.jpg
```

## Cara Menjalankan

### Opsi 1: Membuka langsung di browser

1. Buka folder project.
2. Klik dua kali file `index.html`.
3. Aplikasi akan terbuka di browser.

### Opsi 2: Menggunakan Live Server

Jika menggunakan Visual Studio Code:

1. Buka folder project di Visual Studio Code.
2. Pasang extension **Live Server** jika belum tersedia.
3. Klik kanan file `index.html`.
4. Pilih **Open with Live Server**.

## Cara Menggunakan

1. Tulis tugas pada kolom **Tugas baru**.
2. Pilih level prioritas.
3. Pilih tenggat jika diperlukan.
4. Klik **Submit**.
5. Klik kotak centang pada tugas untuk memindahkannya ke bagian **Done**.
6. Klik ikon tempat sampah untuk menghapus tugas tertentu.
7. Klik **Delete All** untuk menghapus semua tugas.

## Penyimpanan Data

Daftar tugas disimpan di `localStorage` dengan kunci:

```text
todo-list-v1
```

Data tetap tersedia ketika halaman dimuat ulang selama penyimpanan browser belum dihapus.

## Catatan

Aplikasi ini berjalan sepenuhnya di sisi client dan tidak membutuhkan server atau database.
