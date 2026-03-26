document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos del DOM
    const pista = document.querySelector('.pista');
    const slides = document.querySelectorAll('.slide');
    const btnPrev = document.querySelector('.prev');
    const btnNext = document.querySelector('.next');

    // Validar que los elementos existen
    if (!pista || !btnPrev || !btnNext || slides.length === 0) {
        console.error('Error: No se encontraron los elementos del carrusel');
        return;
    }

    // Variables de control
    let indiceActual = 0;
    const totalSlides = slides.length;
    //let autoAdvanceInterval;

    console.log(`Carrusel inicializado con ${totalSlides} slides`);

    /**
     * Función para actualizar la posición del carrusel
     */
    function actualizarCarrusel() {
        // Calcular el desplazamiento en porcentaje
        const desplazamiento = -indiceActual * 100;
        
        // Aplicar transformación a la pista
        pista.style.transform = `translateX(${desplazamiento}%)`;
        console.log(`Slide ${indiceActual + 1} de ${totalSlides}`);
    }

    /**
     * Función para ir al siguiente slide
     */
    function siguienteSlide() {
        indiceActual = (indiceActual + 1) % totalSlides;
        actualizarCarrusel();
    }

    /**
     * Función para ir al slide anterior
     */
    function slideAnterior() {
        indiceActual = (indiceActual - 1 + totalSlides) % totalSlides;
        actualizarCarrusel();
    }

    /**
     * Función para iniciar el avance automático
     */

    /*function startAutoAdvance() {
        autoAdvanceInterval = setInterval(siguienteSlide, 3000);
    }*/

    function startAutoAdvance() {
        autoAdvanceInterval = setInterval(siguienteSlide, 5000);
    }

    // Agregar event listeners a los botones
    btnNext.addEventListener('click', () => {
        siguienteSlide();
        //clearInterval(autoAdvanceInterval);
        //startAutoAdvance();
    });
    btnPrev.addEventListener('click', () => {
        slideAnterior();
        //clearInterval(autoAdvanceInterval);
        //startAutoAdvance();
    });

    console.log('Event listeners agregados correctamente');

    // Inicializar el carrusel
    actualizarCarrusel();

    // Iniciar el avance automático
    //startAutoAdvance();
});


