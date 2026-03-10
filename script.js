// Referencias a los elementos del DOM
const inputValor = document.getElementById('inputValor');
const btnPush = document.getElementById('btnPush');
const btnPop = document.getElementById('btnPop');
const contenedorArray = document.getElementById('contenedorArray');

// Este es el array lógico que manejaremos
let miArreglo = [];

// Función para dibujar el array en la pantalla
function renderizarArray() {
  // Limpiamos el contenedor visual antes de volver a dibujar
  contenedorArray.innerHTML = '';

  // Recorremos el array lógico y creamos un elemento visual por cada ítem
  miArreglo.forEach((valor, indice) => {
    // Crear la caja principal
    const divElemento = document.createElement('div');
    divElemento.classList.add('elemento-array');
    divElemento.textContent = valor;

    // Crear la etiqueta del índice
    const spanIndice = document.createElement('span');
    spanIndice.classList.add('indice-array');
    spanIndice.textContent = `[${indice}]`;

    // Ensamblar
    divElemento.appendChild(spanIndice);
    contenedorArray.appendChild(divElemento);
  });
}

// Evento para agregar (Push)
btnPush.addEventListener('click', () => {
  const valor = inputValor.value.trim();
  
  if (valor !== '') {
    miArreglo.push(valor); // Lógica: agregar al final del array
    inputValor.value = ''; // Limpiar input
    inputValor.focus();
    renderizarArray();     // Actualizar interfaz
  } else {
    alert('Por favor, ingresa un valor válido.');
  }
});

// Evento para eliminar (Pop)
btnPop.addEventListener('click', () => {
  if (miArreglo.length > 0) {
    miArreglo.pop(); // Lógica: eliminar el último elemento
    renderizarArray(); // Actualizar interfaz
  } else {
    alert('El array ya está vacío.');
  }
});

// Permitir agregar presionando la tecla Enter
inputValor.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    btnPush.click();
  }
});