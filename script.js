document.getElementById('btnAll').addEventListener('click', () => {
  fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.json())
    .then(data => mostrarPersonajes(data.results))
    .catch(error => mostrarError("Error al obtener los personajes"));
});

document.getElementById('filtroForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const status = document.getElementById('status').value;
  const species = document.getElementById('species').value;
  const type = document.getElementById('type').value;
  const gender = document.getElementById('gender').value;

  let url = 'https://rickandmortyapi.com/api/character/?';
  if (name) url += `name=${name}&`;
  if (status) url += `status=${status}&`;
  if (species) url += `species=${species}&`;
  if (type) url += `type=${type}&`;
  if (gender) url += `gender=${gender}&`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("No se encontraron personajes");
      return res.json();
    })
    .then(data => mostrarPersonajes(data.results))
    .catch(error => mostrarError(error.message));
});

function mostrarPersonajes(personajes) {
  const contenedor = document.getElementById('contenedor');
  contenedor.innerHTML = '';
  personajes.forEach(personaje => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${personaje.name}</h3>
      <img src="${personaje.image}" alt="${personaje.name}">
    `;
    contenedor.appendChild(div);
  });
}

function mostrarError(msg) {
  document.getElementById('contenedor').innerHTML = `<p style="color:red">${msg}</p>`;
}
