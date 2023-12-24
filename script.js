var video = document.getElementById("myVideo");
var overlay = document.getElementById("overlay");
var durationElement = document.getElementById("duration");

video.controls = false;

var isDoubleClick = false;
var doubleClickTime = 0;

video.onclick = function () {
  var currentTime = video.currentTime;

  if (isDoubleClick) {
    if (currentTime - doubleClickTime < 1) {
      // Deteksi double-click
      video.currentTime -= 5; // Mundur 5 detik
    }
    isDoubleClick = false;
  } else {
    isDoubleClick = true;
    doubleClickTime = currentTime;
    setTimeout(function () {
      isDoubleClick = false;
    }, 500); // Timeout untuk batas waktu double-click
  }

  if (video.paused) {
    video.play();
    overlay.style.display = "none";
  } else {
    video.pause();
    overlay.style.display = "block";
  }
};

document.addEventListener("keydown", function (event) {
  // Event listener tombol panah
  if (event.key === "ArrowLeft") {
    video.currentTime -= 5; // Mundur 5 detik
  } else if (event.key === "ArrowRight") {
    video.currentTime += 5; // Maju 5 detik
  }
});

var isAccelerated = false;

document.addEventListener("mousedown", function (event) {
  // Event listener mousedown untuk sisi kiri dan kanan video
  var x = event.clientX;
  var videoWidth = video.offsetWidth;

  if (x < videoWidth * 0.2) {
    // Klik pada sisi kiri (20% dari video dari kiri)
    isAccelerated = true;
    video.playbackRate = 2; // Percepat 2x
  } else if (x > videoWidth * 0.8) {
    // Klik pada sisi kanan (20% dari video dari kanan)
    isAccelerated = true;
    video.playbackRate = 2; // Percepat 2x
  }
});

document.addEventListener("mouseup", function () {
  // Event listener mouseup untuk mereset playback rate saat mouse dilepas
  if (isAccelerated) {
    isAccelerated = false;
    video.playbackRate = 1; // Kembalikan ke kecepatan normal
  }
});

video.addEventListener("timeupdate", function () {
  var progress = (video.currentTime / video.duration) * 100;
  durationElement.style.width = progress + "%";
});

video.addEventListener("dblclick", function (event) {
  event.preventDefault(); // Mencegah tindakan default double-click (fullscreen)
});

// Event listener saat video selesai (mencapai akhir)
video.addEventListener("ended", function () {
  video.currentTime = 0; // Setel posisi waktu video ke awal
  video.play(); // Putar ulang video secara otomatis
});

function toggleHeartColor() {
  var heartIcon = document.getElementById('heartIcon');
  heartIcon.classList.toggle('red-heart');
  heartIcon.classList.toggle('heart-animation');
  
  // Hapus kelas setelah animasi selesai
  setTimeout(function() {
    heartIcon.classList.remove('heart-animation');
  }, 300);
}

function toggleBookmarkColor() {
  var bookmarkIcon = document.getElementById('bookmarkIcon');
  bookmarkIcon.classList.toggle('yellow-bookmark');
  bookmarkIcon.classList.toggle('bookmark-animation');
  
  // Hapus kelas setelah animasi selesai
  setTimeout(function() {
    bookmarkIcon.classList.remove('bookmark-animation');
  }, 300);
}