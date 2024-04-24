// EVENT LISTENER UNTUK SETIAP MENU
document
  .getElementById("home-link")
  .addEventListener("click", function (event) {
    // event.preventDefault();
    event.setActiveMenu("home-link");
  });

const pokemonActive = document
  .getElementById("pokemon-link")
  .addEventListener("click", function (event) {
    // event.preventDefault();
    event.setActiveMenu(pokemonActive);
  });

document
  .getElementById("item-link")
  .addEventListener("click", function (event) {
    // event.preventDefault();
    event.setActiveMenu("item-link");
  });

document
  .getElementById("forum-link")
  .addEventListener("click", function (event) {
    // event.preventDefault();
    event.setActiveMenu("forum-link");
  });

// Transparansi Navigasi ketika discroll
window.addEventListener("scroll", function () {
  var header = document.querySelector(".nav-container");
  if (window.scrollY > 50) {
    header.classList.add("translucent");
  } else {
    header.classList.remove("translucent");
  }
});

// Animasi untuk perpindahan button start-journey
var startJourneyButton = document.getElementById("start-journey");
startJourneyButton.addEventListener("click", function (event) {
  event.preventDefault();
  var introSection = document.getElementById("find");
  introSection.scrollIntoView({ behavior: "smooth" });
});

// Fungsi untuk mengatur menu yang aktif
function setActiveMenu(linkId) {
  var menuLinks = document.querySelectorAll(".nav-container li a");
  menuLinks.forEach(function (link) {
    link.classList.remove("active");
  });

  var activeLink = document.getElementById(linkId);
  activeLink.classList.add("active");
}

// Panggil fungsi ini saat halaman dimuat
window.addEventListener("load", function () {
  // Sematkan kode berikut untuk menyembunyikan semua gambar kecuali gambar pertama saat halaman dimuat.
  images.forEach(function (image, index) {
    if (index !== 0) {
      image.style.display = "none";
    }
  });

  // Panggil fungsi ini saat halaman dimuat
  if (window.location.pathname === "/home.html") {
    setActiveMenu("home-link");
  }
});

// Fungsi untuk mengatur menu yang aktif
function setActiveMenu(linkId) {
  var menuLinks = document.querySelectorAll(".nav-container li a");
  menuLinks.forEach(function (link) {
    link.classList.remove("active");
  });

  var activeLink = document.getElementById(linkId);
  activeLink.classList.add("active");
}

// Fungsi untuk mengatur slideshow
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs((slideIndex += n));
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";
}

// Fungsi untuk mengatur scroll on top
var scrollToTopBtnVisible = false;

window.addEventListener("scroll", function () {
  var scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (
    (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) &&
    !scrollToTopBtnVisible
  ) {
    scrollToTopBtn.style.display = "block";
    setTimeout(function () {
      scrollToTopBtn.style.opacity = "1";
    }, 10);
    scrollToTopBtnVisible = true;
  } else if (
    !(
      document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
    ) &&
    scrollToTopBtnVisible
  ) {
    scrollToTopBtn.style.opacity = "0";
    setTimeout(function () {
      scrollToTopBtn.style.display = "none";
    }, 300);
    scrollToTopBtnVisible = false;
  }
});

// Fungsi untuk scroll lebih smooth
function scrollToTopSmoothly() {
  var currentScroll =
    document.documentElement.scrollTop || document.body.scrollTop;

  if (currentScroll > 0) {
    window.requestAnimationFrame(scrollToTopSmoothly);
    window.scrollTo(0, currentScroll - currentScroll / 35);
  }
}

function scrollToTop() {
  scrollToTopSmoothly();
}
