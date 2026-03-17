const inputX = document.getElementById('inputX');
const inputY = document.getElementById('inputY');
const inputZ = document.getElementById('inputZ');
const btnPush = document.getElementById('btnPush');
const btnPop = document.getElementById('btnPop');
const contenedorMatriz = document.getElementById('contenedorMatriz');

// Esta es nuestra matriz: un array que contendrá otros arrays
let miMatriz = [];

function actualizarVisualizacion() {
  renderizarMatrizDOM();
  graficarMatriz3D();
}

function renderizarMatrizDOM() {
  contenedorMatriz.innerHTML = '';
  
  // Recorremos cada fila de la matriz
  miMatriz.forEach((fila) => {
    const divFila = document.createElement('div');
    divFila.classList.add('fila-matriz');

    // Recorremos cada número dentro de la fila (las columnas)
    fila.forEach((valor) => {
      const divCelda = document.createElement('div');
      divCelda.classList.add('celda-matriz');
      divCelda.textContent = valor;
      divFila.appendChild(divCelda);
    });

    contenedorMatriz.appendChild(divFila);
  });
}

function graficarMatriz3D() {
  // Preparamos los datos para Plotly
  // Mapeamos cada fila de nuestra matriz a un "trazo" (una línea) en el gráfico
  let trazos = miMatriz.map((fila, indice) => {
    return {
      type: 'scatter3d',
      mode: 'lines+markers',
      // Dibujamos una línea desde el origen [0,0,0] hasta el punto [x,y,z] de la fila
      x: [0, fila[0]], 
      y: [0, fila[1]], 
      z: [0, fila[2]],
      marker: { size: 5 },
      line: { width: 5 },
      name: `Fila ${indice}`
    };
  });

  let configuracion = {
    title: 'Vectores de la Matriz en ℝ³',
    scene: {
      xaxis: { title: 'Eje X', range: [-10, 10] },
      yaxis: { title: 'Eje Y', range: [-10, 10] },
      zaxis: { title: 'Eje Z', range: [-10, 10] }
    },
    margin: { l: 0, r: 0, b: 0, t: 40 }
  };

  Plotly.newPlot('grafico3d', trazos, configuracion);
}

// Evento para agregar una nueva fila a la matriz
btnPush.addEventListener('click', () => {
  let valX = inputX.value !== '' ? parseFloat(inputX.value) : 0;
  let valY = inputY.value !== '' ? parseFloat(inputY.value) : 0;
  let valZ = inputZ.value !== '' ? parseFloat(inputZ.value) : 0;

  // Creamos el array de la fila y lo empujamos a la matriz principal
  let nuevaFila = [valX, valY, valZ];
  miMatriz.push(nuevaFila);

  // Limpiamos los inputs
  inputX.value = '';
  inputY.value = '';
  inputZ.value = '';

  actualizarVisualizacion();
});

// Evento para eliminar la última fila de la matriz
btnPop.addEventListener('click', () => {
  if (miMatriz.length > 0) {
    miMatriz.pop();
    actualizarVisualizacion();
  } else {
    alert('La matriz ya está vacía.');
  }
});

// Dibujar el escenario vacío al cargar la página
actualizarVisualizacion();