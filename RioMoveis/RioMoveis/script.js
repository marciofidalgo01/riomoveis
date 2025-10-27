const currentTheme = localStorage.getItem("theme") || "light";
const initialClass = currentTheme + "-mode";
const oppositeClass = currentTheme === "dark" ? "light-mode" : "dark-mode";

document.body.classList.remove(oppositeClass);
document.body.classList.add(initialClass);

function updateButtonIcon(theme) {
  const toggleButton = document.getElementById("toggle-theme");
  toggleButton.textContent = theme === "dark" ? "☀️" : "🌙";
  toggleButton.setAttribute(
    "aria-label",
    theme === "dark" ? "Modo claro" : "Modo escuro"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-theme");
  updateButtonIcon(currentTheme);

  toggleButton.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-mode");

    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");

    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    updateButtonIcon(newTheme);
  });
});

// ---------------------------------------------------------------------------------------------------------

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bubbles = Array.from(
  {
    length: 60,
  },
  () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    speed: Math.random() * 1 + 0.1,
    color: `rgba(8,206,8,${Math.random() * 0.5 + 0.3})`,
  })
);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach((b) => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = b.color;
    ctx.fill();
    b.y -= b.speed;
    if (b.y < -b.r) b.y = canvas.height + b.r;
  });
  requestAnimationFrame(draw);
}
draw();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ---------------------------------------------------------------------

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');

let slidesToShow = window.innerWidth <= 768 ? 1 : 2;
let currentIndex = 0;

function getMaxIndex() {
  return Math.ceil(slides.length / slidesToShow) - 1;
}

function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width + 20; 
  const offset = currentIndex * slideWidth * slidesToShow;
  track.style.transform = `translateX(-${offset}px)`;
}

nextButton.addEventListener('click', () => {
  if (currentIndex < getMaxIndex()) {
    currentIndex++;
  } else {
    currentIndex = 0; 
  }
  updateCarousel();
});

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = getMaxIndex(); 
  }
  updateCarousel();
});


window.addEventListener('resize', () => {
  slidesToShow = window.innerWidth <= 768 ? 1 : 2;
  currentIndex = 0;
  updateCarousel();
});

let startX = 0;
let endX = 0;

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    nextButton.click();
  } else if (endX - startX > 50) {
    prevButton.click();
  }
});
