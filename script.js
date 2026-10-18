const HARI = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
const BULAN = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const KUNCI = "todo-list-v1";

const form = document.getElementById("form-tugas");
const inputTugas = document.getElementById("tugas");
const inputTenggat = document.getElementById("tenggat");
const listTodo = document.getElementById("daftar-todo");
const listDone = document.getElementById("daftar-done");

let tugas = muat();

function muat() {
  try { return JSON.parse(localStorage.getItem(KUNCI)) || []; }
  catch { return []; }
}
function simpan() {
  try { localStorage.setItem(KUNCI, JSON.stringify(tugas)); } catch {}
}

function isoLokal(d) {
  const p = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
function formatTanggal(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const tgl = new Date(y, m - 1, d);
  return `${HARI[tgl.getDay()]}, ${d} ${BULAN[m - 1].slice(0, 3)} ${y}`;
}

function tampilWaktu() {
  const now = new Date();
  document.getElementById("hari").textContent = HARI[now.getDay()];
  document.getElementById("tanggal").textContent =
    `${now.getDate()} ${BULAN[now.getMonth()]} ${now.getFullYear()}`;
}

function terlambat(t) {
  return !t.selesai && t.tenggat < isoLokal(new Date());
}

function el(tag, kelas, teks) {
  const e = document.createElement(tag);
  if (kelas) e.className = kelas;
  if (teks !== undefined) e.textContent = teks;
  return e;
}

function ikonTombol(label, isi, aksi) {
  const b = el("button", "ikon");
  b.type = "button";
  b.setAttribute("aria-label", label);
  b.appendChild(isi);
  b.addEventListener("click", aksi);
  return b;
}

function buatItem(t) {
  const li = el("li", "item" + (t.selesai ? " selesai" : "") + (terlambat(t) ? " lewat" : ""));

  const kotak = el("span", "kotak" + (t.selesai ? " centang" : ""));
  if (t.selesai) {
    kotak.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>';
  }
  li.appendChild(ikonTombol(t.selesai ? "Tandai belum selesai" : "Tandai selesai", kotak, () => {
    t.selesai = !t.selesai;
    render();
  }));

  const isi = el("div", "isi");
  isi.appendChild(el("div", "teks", t.teks));
  const meta = el("div", "meta");
  meta.appendChild(el("span", "chip " + t.prioritas, t.prioritas));
  if (terlambat(t)) meta.appendChild(el("span", "chip telat", "Terlambat"));
  meta.appendChild(el("span", "tgl", "Tenggat: " + formatTanggal(t.tenggat)));
  isi.appendChild(meta);
  li.appendChild(isi);

  const sampah = el("span");
  sampah.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#05052B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>';
  li.appendChild(ikonTombol("Hapus tugas", sampah, () => {
    tugas = tugas.filter(x => x.id !== t.id);
    render();
  }));
  return li;
}

function render() {
  listTodo.replaceChildren();
  listDone.replaceChildren();
  const todo = tugas.filter(t => !t.selesai);
  const done = tugas.filter(t => t.selesai);
  // tugas terlambat tampil paling atas
  todo.sort((a, b) => a.tenggat.localeCompare(b.tenggat));
  todo.forEach(t => listTodo.appendChild(buatItem(t)));
  done.forEach(t => listDone.appendChild(buatItem(t)));
  document.getElementById("jumlah-todo").textContent = `(${todo.length})`;
  document.getElementById("jumlah-done").textContent = `(${done.length})`;
  document.getElementById("kosong-todo").hidden = todo.length > 0;
  document.getElementById("kosong-done").hidden = done.length > 0;
  simpan();
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const teks = inputTugas.value.trim();
  if (!teks) { inputTugas.focus(); return; }
  tugas.push({
    id: Date.now(),
    teks,
    prioritas: form.elements.prioritas.value,
    dibuat: isoLokal(new Date()),
    tenggat: inputTenggat.value || isoLokal(new Date()),
    selesai: false
  });
  form.reset();
  render();
});

document.getElementById("hapus-semua").addEventListener("click", () => {
  if (tugas.length && confirm("Hapus seluruh to do list yang sudah dibuat?")) {
    tugas = [];
    render();
  }
});

tampilWaktu();
render();
// perbarui hari/tanggal dan status terlambat saat tengah malam berganti
setInterval(() => { tampilWaktu(); render(); }, 60000);