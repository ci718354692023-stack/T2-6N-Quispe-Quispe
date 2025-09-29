const getPelicula = () => {

    const id = (new URLSearchParams(window.location.search)).get('id');


    fetch(`http://localhost/cinestar_sweb_php/peliculas/${id}`)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Error al cargar la película. Estado: ' + response.status);
            }
        })
        .then(data => {

            const pelicula = data.data; 

            if (pelicula) {
                const html = `				
                    <div class="contenido-pelicula">
                        <div class="datos-pelicula">
                            <h2>${pelicula.Titulo}</h2>
                            <p>${pelicula.Sinopsis}</p>
                            <br/>
                            <div class="tabla">
                                <div class="fila">
                                    <div class="celda-titulo">Título Original :</div>
                                    <div class="celda">${pelicula.Titulo}</div>
                                </div>
                                <div class="fila">
                                    <div class="celda-titulo">Estreno :</div>
                                    <div class="celda">${pelicula.FechaEstrenoss}</div>
                                </div>
                                <div class="fila">
                                    <div class="celda-titulo">Género :</div>
                                    <div class="celda">${pelicula.Geneross}</div>
                                </div>
                                <div class="fila">
                                    <div class="celda-titulo">Director :</div>
                                    <div class="celda">${pelicula.Director}</div>
                                </div>
                                <div class="fila">
                                    <div class="celda-titulo">Reparto :</div>
                                    <div class="celda">${pelicula.Reparto}</div>
                                </div>
                            </div>
                        </div>
                        <img src="img/pelicula/${pelicula.id}.jpg" width="160" height="226"><br/><br/>
                    </div>
                    <div class="pelicula-video">
                        <embed src="https://www.youtube.com/v/${pelicula.Link}" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="580" height="400">
                    </div>
                `;

                document.getElementById('contenido-interno').innerHTML = html;
            } else {
                document.getElementById('contenido-interno').innerHTML = '<p>No se encontró la información de la película.</p>';
            }
        })
        .catch(error => {

            console.error('Hubo un problema con la petición fetch:', error);
            document.getElementById('contenido-interno').innerHTML = `<p>Ocurrió un error al cargar los datos: ${error.message}</p>`;
        });
}


getPelicula();