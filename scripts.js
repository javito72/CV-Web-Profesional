/**
 * Función para descargar el CV como PDF - VERSIÓN ESTABLE
 */
function descargarPDF() {
    const btn = document.getElementById('btnPDF');
    btn.disabled = true;

    try {
        const element = document.getElementById('contenidoCV');
        
        if (!element) {
            throw new Error('No se encontró el contenido del CV');
        }

        const opt = {
            margin: [10, 10, 10, 10],
            filename: 'CV_Christian_Javier_Lemos.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                logging: false,
                windowWidth: 210,
                windowHeight: 297,
                removeContainer: true,
                timeout: 10000
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait',
                compress: true
            },
            pagebreak: { 
                mode: 'avoid-all',
                before: '.section'
            }
        };

        // Método directo sin contenedor temporal
        html2pdf()
            .set(opt)
            .from(element)
            .save()
            .then(() => {
                mostrarNotificacion('✓ PDF descargado exitosamente');
                btn.disabled = false;
            })
            .catch((error) => {
                console.error('Error en PDF:', error);
                mostrarNotificacion('✗ Error al descargar. Intenta nuevamente.', 'error');
                btn.disabled = false;
            });

    } catch (error) {
        console.error('Error:', error);
        mostrarNotificacion('✗ Error: ' + error.message, 'error');
        btn.disabled = false;
    }
}

/**
 * Función para imprimir el CV
 */
function imprimirCV() {
    const content = document.getElementById('contenidoCV');
    if (!content) {
        alert('No se encontró el contenido');
        return;
    }
    
    // SOLUCIÓN: Asegurar que todas las secciones son visibles antes de imprimir
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '1'; 
        section.style.animation = 'none'; // Desactivar la animación temporalmente
        section.style.transform = 'translateY(0)'; // Asegurar que no hay desplazamiento
    });
    
    window.print();
    
    // Opcional: Revertir los cambios para que las animaciones vuelvan a funcionar en la vista web
    setTimeout(() => {
        sections.forEach(section => {
            section.style.opacity = '';
            section.style.animation = '';
            section.style.transform = '';
        });
    }, 100); 
}

/**
 * Función para mostrar notificaciones
 */
function mostrarNotificacion(mensaje, tipo = 'success') {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = mensaje;
    notif.style.background = tipo === 'error' ? '#e74c3c' : '#667eea';
    notif.style.color = 'white';
    notif.style.padding = '12px 20px';
    notif.style.borderRadius = '8px';
    notif.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
    notif.style.position = 'fixed';
    notif.style.bottom = '20px';
    notif.style.right = '20px';
    notif.style.zIndex = '1000';
    notif.style.animation = 'slideIn 0.3s ease';
    
    document.body.appendChild(notif);

    setTimeout(() => {
        if (notif.parentNode) {
            notif.remove();
        }
    }, 3000);
}

/**
 * Inicializar efectos visuales
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ CV cargado correctamente');
    
    // Efecto hover en tags
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.05)';
            tag.style.transition = 'transform 0.2s ease';
        });
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1)';
        });
    });
    
    // Efecto hover en items de experiencia
    const expItems = document.querySelectorAll('.experience-item');
    expItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.2)';
            item.style.transition = 'all 0.3s ease';
        });
        item.addEventListener('mouseleave', () => {
            item.style.boxShadow = 'none';
        });
    });
    
    // Efecto hover en cursos
    const courseItems = document.querySelectorAll('.course-item');
    courseItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-3px)';
            item.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.15)';
            item.style.transition = 'all 0.3s ease';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = 'none';
        });
    });
});