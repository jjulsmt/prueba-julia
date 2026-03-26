document.addEventListener('DOMContentLoaded', () => {
    const aumentarLetraBtn = document.getElementById('aumentar-letra');
    const disminuirLetraBtn = document.getElementById('disminuir-letra');
    const resetLetraBtn = document.getElementById('reset-letra');
    const altoContrasteBtn = document.getElementById('alto-contraste');
    const daltonicoBtn = document.getElementById('daltonico');

    //Comprobar si todos las funciones existen en el DOM
    if (!aumentarLetraBtn || !disminuirLetraBtn || !resetLetraBtn || !altoContrasteBtn || !daltonicoBtn) {
        console.error("Uno o más botones no se encontraron en el DOM");
        return;
    }

    //Tamaño de la fuente
    let fontSize = 16;

    function cambiarTamanoFuente(tamano) {
        fontSize += tamano;
        document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
    }

    //Funciones que cambian el tamaño de la letra
    aumentarLetraBtn.addEventListener('click', () => cambiarTamanoFuente(2));
    disminuirLetraBtn.addEventListener('click', () => cambiarTamanoFuente(-2));
    resetLetraBtn.addEventListener('click', () => {
        fontSize = 16;
        document.documentElement.style.setProperty('--font-size', '16px');
    });

    //Función que activa el modo alto contraste
    altoContrasteBtn.addEventListener('click', () => {
        document.body.classList.toggle('alto-contraste');
    });

    //Función que activa el modo daltónico
    daltonicoBtn.addEventListener('click', () => {
        document.body.classList.toggle('daltonico');
    });
});
