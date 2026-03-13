// ==========================================
// 1. FUNGSI ZOOM GAMBAR (MODAL)
// ==========================================
function zoomImage(src) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalContent");
  if (modal && modalImg) {
    modal.classList.remove("hidden");
    modalImg.src = src;
    document.body.style.overflow = "hidden";
  }
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

// ==========================================
// 2. FUNGSI MENU MOBILE (HP) - BOTTOM NAV
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const btnLainnya = document.getElementById("btnLainnya");
  const iconLainnya = document.getElementById("iconLainnya"); // Ambil elemen ikon
  const lainnyaMenu = document.getElementById("lainnyaMenu");
  const lainnyaLinks = document.querySelectorAll(".lainnya-link");

  // Fungsi untuk mereset tombol ke kondisi awal (tertutup)
  const closeMenu = () => {
    lainnyaMenu.classList.add("translate-y-[150%]");
    lainnyaMenu.classList.remove("translate-y-0");
    btnLainnya.classList.add("text-gray-400");
    btnLainnya.classList.remove("text-emerald-600"); // Pastikan kembali abu-abu

    // Kembalikan ikon ke mode Hamburger
    if (iconLainnya) {
      iconLainnya.classList.remove("fa-times", "rotate-90");
      iconLainnya.classList.add("fa-bars");
    }
  };

  if (btnLainnya && lainnyaMenu) {
    // Toggle menu saat tombol 'Lainnya' ditekan
    btnLainnya.addEventListener("click", (e) => {
      e.stopPropagation(); // Cegah klik tembus ke document
      lainnyaMenu.classList.toggle("translate-y-[150%]");
      lainnyaMenu.classList.toggle("translate-y-0");

      // Jika menu sedang terbuka
      if (lainnyaMenu.classList.contains("translate-y-0")) {
        btnLainnya.classList.remove("text-gray-400");
        btnLainnya.classList.add("text-emerald-600"); // Ubah teks jadi hijau

        // Ubah ikon ke X dan putar
        if (iconLainnya) {
          iconLainnya.classList.remove("fa-bars");
          iconLainnya.classList.add("fa-times", "rotate-90");
        }
      } else {
        closeMenu(); // Panggil fungsi tutup jika di-toggle mati
      }
    });

    // Tutup popup secara otomatis saat salah satu link diklik
    lainnyaLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    // Tutup popup jika layar area mana saja di-tap (di luar menu)
    document.addEventListener("click", (event) => {
      if (
        !lainnyaMenu.contains(event.target) &&
        !btnLainnya.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }
});

// ==========================================
// 3. ANIMASI SCROLL (REVEAL)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.1 },
  );

  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach((el) => observer.observe(el));
});

// ==========================================
// 4. FUNGSI GRAFIK HASIL CAPAIAN PROGRAM
// ==========================================
let hasilChartInstance = null;

function initHasilChart() {
  const ctx = document.getElementById("hasilChart");
  if (!ctx) return;

  const data = {
    labels: [
      "Literasi Cerdas Gizi",
      "Literasi Tani Jaya",
      "Literasi Hijau Lestari",
      "Literasi UMKM Jaya",
    ],
    datasets: [
      {
        label: "Pre Test",
        data: [0, 0, 0, 0],
        backgroundColor: [
          "rgba(248, 113, 113, 0.6)",
          "rgba(16, 185, 129, 0.6)",
          "rgba(59, 130, 246, 0.6)",
          "rgba(245, 158, 11, 0.6)",
        ],
        borderColor: [
          "rgb(239, 68, 68)",
          "rgb(21, 128, 61)",
          "rgb(37, 99, 235)",
          "rgb(217, 119, 6)",
        ],
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: "Post Test",
        data: [0, 0, 0, 0],
        backgroundColor: [
          "rgba(239, 68, 68, 0.9)",
          "rgba(21, 128, 61, 0.9)",
          "rgba(37, 99, 235, 0.9)",
          "rgba(217, 119, 6, 0.9)",
        ],
        borderColor: [
          "rgb(220, 38, 38)",
          "rgb(22, 101, 52)",
          "rgb(29, 78, 216)",
          "rgb(180, 83, 9)",
        ],
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: { display: true, text: "Nilai" },
        },
      },
      plugins: {
        legend: {
          position: "top",
          labels: { usePointStyle: true, padding: 20 },
        },
      },
    },
  };

  hasilChartInstance = new Chart(ctx, config);
}

function updateChartType(type) {
  if (!hasilChartInstance) return;

  const btns = document.querySelectorAll(".chart-toggle-btn");
  btns.forEach((btn) => {
    btn.classList.remove("bg-[#8b5cf6]", "text-white", "shadow-md");
    btn.classList.add("border-2", "border-[#8b5cf6]", "text-[#8b5cf6]");
  });

  let activeBtn;
  if (type === "bar") activeBtn = document.getElementById("btnBar");
  else if (type === "line") activeBtn = document.getElementById("btnLine");
  else if (type === "pie") activeBtn = document.getElementById("btnPie");

  if (activeBtn) {
    activeBtn.classList.remove(
      "border-2",
      "border-[#8b5cf6]",
      "text-[#8b5cf6]",
    );
    activeBtn.classList.add("bg-[#8b5cf6]", "text-white", "shadow-md");
  }

  hasilChartInstance.config.type = type;
  hasilChartInstance.update();
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    if (typeof Chart === "undefined") {
      console.warn(
        "Library Chart.js belum terpasang di HTML. Grafik dilewati agar web tidak blank.",
      );
      return;
    }
    initHasilChart();
  } catch (error) {
    console.error("Gagal memuat grafik:", error);
  }
});
