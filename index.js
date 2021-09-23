
let indice = 0;
let yaHizoAutoPlay = false;
let intervalId;


function cambiarSlide(n) {
    const slides = document.getElementsByClassName("slide");
    console.log(slides)
    if (n >= slides.length) {
      indice = 0; 
    } else if( n < 0){
          indice = slides.length -1
    } else {
        indice = n;
    }

    const arrelgoSlides = [...slides];
    const dots = document.getElementById("dot-container").children;
   arrelgoSlides.forEach((slide, index) => {
    if (index === indice) {
        dots[index].classList.add('dot-active')
        slide.style.display = "block"
    } else{
        dots[index].classList.remove('dot-active')
        slide.style.display = "none"
    }
    })

}

function slideAnterior() {
    indice = indice - 1;
    cambiarSlide(indice);
  }
  
  function siguienteSlide() {
    indice = indice + 1;
    cambiarSlide(indice);
  }

function cambiarIndice(n){
    cambiarSlide(indice += n)
}

function renderDots() {
    const carrusel = document.getElementById("carrusel");
    const numeroDeSlides = carrusel.children.length;

    const dotContainer = document.getElementById("dot-container");
  
    for (let i = 0; i < numeroDeSlides; i++) {
      const dot = document.createElement("li");
      dot.addEventListener('click',() => cambiarSlide(i));
      dot.classList.add("dot");
      dotContainer.appendChild(dot)
    }
  }

  function autoplay() {
    yaHizoAutoPlay = true;
    intervalId = setInterval(() => {
      cambiarSlide(indice + 1);
    }, 2000);
  }

  function shouldAutoPlay() {
    if (window.innerWidth >= 700 && !yaHizoAutoPlay) {
      autoplay();
    } else if (window.innerWidth < 700 && yaHizoAutoPlay) {
      clearInterval(intervalId);
      const slides = document.getElementsByClassName("slide");
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "block";
      }
      yaHizoAutoPlay = false;
    }
  }

  window.onload = function(){
      renderDots();
      shouldAutoPlay();
  }

  window.onresize = function () {
    shouldAutoPlay();
  };