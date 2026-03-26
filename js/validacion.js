document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const submitBtn = form.querySelector('button[type="submit"]');
    const popup = document.getElementById("popupMensaje");
    const popupTitulo = document.getElementById("popupTitulo");
    const popupContenido = document.getElementById("popupContenido");
    const mascotaPopup = document.getElementById("mascotaPopup");
    const btnCerrar = document.getElementById("cerrarPopup");

    // Cerrar el pop-up
    btnCerrar.addEventListener("click", function(){
        popup.style.display = "none";
        submitBtn.focus();
    });

    popup.addEventListener("click", function(e){
        if(e.target === popup){
            popup.style.display = "none";
            submitBtn.focus();
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault(); //Evitar el envio del formulario porq no hay servidor para almacenar

        let isValid = true;
        let errors = [];

        // Nombre completo
        const nombre = document.getElementById('nombre').value.trim();
        if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/.test(nombre) || nombre === '') {
            isValid = false;
            errors.push('El nombre completo debe contener solo caracteres alfabéticos.');
        }

        // Correo electrónico
        const email = document.getElementById('email').value.trim();
        if (!email.includes('@') || email === '') {
            isValid = false;
            errors.push('El correo electrónico debe contener el símbolo @.');
        }

        // Instalación
        const instalacion = document.getElementById('instalacion').value;
        if (instalacion === '') {
            isValid = false;
            errors.push('Debe seleccionar una ubicación.');
        }

        // Fecha
        const fecha = document.getElementById('fecha').value;
        const fechaDate = new Date(fecha);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        if (fecha === '' || fechaDate <= hoy) {
            isValid = false;
            errors.push('La fecha debe ser una fecha futura.');
        }

        // Hora - Solo permitir reservas de 8am a 12pm
        const hora = document.getElementById('hora').value;
        if (hora === '') {
            isValid = false;
            errors.push('Debe seleccionar una hora.');
        } else {
            const horaNum = parseInt(hora.split(':')[0]);
            if (horaNum < 8 || horaNum > 23) {
                isValid = false;
                errors.push('Las reservas solo se aceptan de 8:00 AM a 12:00 PM.');
            }
        }

        // Número de personas
        const personas = parseInt(document.getElementById('personas').value);
        if (isNaN(personas) || personas < 1 || personas > 20) {
            isValid = false;
            errors.push('El número de personas debe estar entre 1 y 20.');
        }

        // Tipo de sala - siempre seleccionado ya que es select sin opción vacía

        // Extras - opcionales

        // Comentarios - opcionales

    if (!isValid) {
        popup.style.display = "flex";
        popup.className = "popup-mensaje popup-error";

        popupTitulo.textContent = "Error en la reserva";
        popupContenido.innerHTML = errors.join("<br>");
        mascotaPopup.src = "imagenes/mascota-error.png";
        popup.focus();
    } else {
        popup.style.display = "flex";
        popup.className = "popup-mensaje popup-ok";

        popupTitulo.textContent = "¡Reserva confirmada! 🎤";
        popupContenido.textContent = "Gracias por reservar en Sity-Pó Karaoke.";
        mascotaPopup.src = "imagenes/mascota-ok.png";
        popup.focus();
        
        form.reset(); //Limpiar formulario despues de reserva exitosa
    }
    });
});

