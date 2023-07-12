const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(bodyParser.json());

let playlist = [
  {
    id: 1,
    judul: "Kota hujan salju",
    artis: ["Aimer"],
    url: "https://open.spotify.com/track/3sAyTNkMmHHYMVffFn0N7N?si=28a584a8cd9b4a6b",
  },
];

// Menambahkan lagu
app.post("/playlist", (req, res) => {
  const { judul, artis, url } = req.body;

  const laguBaru = {
    id: playlist.length + 1,
    judul,
    artis,
    url,
  };

  playlist.push(laguBaru);

  res.status(201).json({
    message: "Lagu telah ditambahkan ke daftar putar",
    lagu: laguBaru,
  });
});

// Memutar lagu
app.get("/playlist/:id", (req, res) => {
  const laguId = parseInt(req.params.id);

  const lagu = playlist.find((lagu) => lagu.id === laguId);

  if (!lagu) {
    res.status(404).json({ message: "Lagu tidak ditemukan" });
  } else {
    res.status(200).json({ message: "Memutar lagu", lagu });
  }
});

app.get("/playlist", (req, res) => {
  res.status(200).json({ playlist });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
