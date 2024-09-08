const qrTextInput = document.getElementById("qr-text");
const qrCodeDiv = document.getElementById("qr-code");
const downloadBtn = document.getElementById("download-btn");

qrTextInput.addEventListener("input", function () {
  const qrText = qrTextInput.value.trim(); // Menghilangkan spasi kosong
  qrCodeDiv.innerHTML = ""; // Kosongkan QR Code sebelumnya

  // Cek apakah input kosong
  if (qrText !== "") {
    console.log("Generating QR Code for:", qrText);

    // Buat elemen <canvas> secara manual dan tambahkan ke qrCodeDiv
    const canvas = document.createElement("canvas");
    qrCodeDiv.appendChild(canvas); // Masukkan canvas ke dalam div

    // Menghasilkan QR code dengan ukuran lebih besar (misal: 300px x 300px)
    QRCode.toCanvas(
      canvas,
      qrText,
      { width: 300, height: 300, errorCorrectionLevel: "H" },
      function (error) {
        if (error) {
          console.error("Error generating QR code:", error);
          alert("Terjadi kesalahan saat membuat QR code.");
          return;
        }

        console.log("QR Code generated successfully!");

        // Tampilkan tombol download
        downloadBtn.style.display = "block";

        // Set fungsi download
        downloadBtn.onclick = function () {
          const image = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = image;
          link.download = "qr-code.png";
          link.click();
        };
      }
    );
  } else {
    // Sembunyikan tombol download jika input kosong
    downloadBtn.style.display = "none";
  }
});
