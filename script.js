/**
 * Carousel and filtering script for De Motos y Más webpage
 */

const track = document.getElementById("carousel-track");
const dotsContainer = document.getElementById("carousel-dots");
const images = document.querySelectorAll(".carousel-image");
const leftBtn = document.getElementById("btn-left");
const rightBtn = document.getElementById("btn-right");

let currentSlide = 0;
const totalSlides = images.length;

// Create navigation dots for carousel
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("span");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
}

// Update active dot based on current slide
function updateDots() {
  dotsContainer.querySelectorAll("span").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

// Show slide at given index
function goToSlide(index) {
  currentSlide = (index + totalSlides) % totalSlides;
  images.forEach((img, i) => {
    img.style.opacity = i === currentSlide ? "1" : "0";
    img.style.zIndex = i === currentSlide ? "1" : "0";
  });
  updateDots();
}

// Show next slide
function nextSlide() {
  goToSlide(currentSlide + 1);
}

// Show previous slide
function prevSlide() {
  goToSlide(currentSlide - 1);
}

// Event listeners for carousel buttons
rightBtn.addEventListener("click", nextSlide);
leftBtn.addEventListener("click", prevSlide);

// Auto-slide with pause on hover
let autoSlide = setInterval(nextSlide, 4000);

track.addEventListener("mouseover", () => clearInterval(autoSlide));
track.addEventListener("mouseout", () => autoSlide = setInterval(nextSlide, 4000));

/**
 * Filter motorcycle types by category
 * @param {string} categoria - category to filter by
 */
function filtrar(categoria) {
  const tipos = document.querySelectorAll("#tipos .tipo");
  let anyVisible = false;
  tipos.forEach(tipo => {
    if (categoria === "" || tipo.classList.contains(categoria)) {
      tipo.style.display = "block";
      anyVisible = true;
    } else {
      tipo.style.display = "none";
    }
  });
  document.getElementById("sin-resultados").style.display = anyVisible ? "none" : "block";
}

// Search input filtering
const busquedaInput = document.getElementById("busqueda");
busquedaInput.addEventListener("input", () => {
  const texto = busquedaInput.value.toLowerCase();
  const tipos = document.querySelectorAll("#tipos .tipo");
  let anyVisible = false;
  tipos.forEach(tipo => {
    const contenido = tipo.textContent.toLowerCase();
    if (contenido.includes(texto)) {
      tipo.style.display = "block";
      anyVisible = true;
    } else {
      tipo.style.display = "none";
    }
  });
  document.getElementById("sin-resultados").style.display = anyVisible ? "none" : "block";
});

// Initialize carousel to first slide
goToSlide(0);
