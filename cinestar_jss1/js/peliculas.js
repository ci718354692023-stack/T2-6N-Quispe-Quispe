const getPeliculas = () => {

    const id = (new URLSearchParams(window.location.search)).get('id');


    fetch(`http://localhost/cinestar_sweb_php/peliculas/${id}`)
        .then(response => {

            if (response.status === 200) {
                return response.json(); 
            } else {
                throw new Error('Error al cargar las películas. Estado: ' + response.status);
            }
        })
        .then(data => {
            
            const peliculas = data.data; 

            if (peliculas && peliculas.length > 0) {
                let html = ``;
               
                for (const pelicula of peliculas) {
                    html += `				
                        <div class="contenido-pelicula">
                            <div class="datos-pelicula">
                                <h2>${pelicula.Titulo}</h2><br/>
                                <p>${pelicula.Sinopsis}</p>
                                <br/>
                                <div class="boton-pelicula"> 
                                    <a href="pelicula.html?id=${pelicula.id}" >
                                        <img src="img/varios/btn-mas-info.jpg" width="120" height="30" alt="Ver info"/>
                                    </a>
                                </div>
                                <div class="boton-pelicula"> 
                                    <a href="https://www.youtube.com/v/${pelicula.Link}" target=_blank  onclick="return hs.htmlExpand(this, { objectType: 'iframe' } )" >
                                        <img src="img/varios/btn-trailer.jpg" width="120" height="30" alt="Ver trailer"/>
                                    </a>
                                </div> 
                            </div>
                            <img src="img/pelicula/${pelicula.id}.jpg" width="160" height="226"/><br/><br/>
                        </div>
                    `;
                }
             
                document.getElementById('contenido-interno').innerHTML = html;
            } else {
                 document.getElementById('contenido-interno').innerHTML = '<p>No se encontraron películas para este ID.</p>';
            }
        })
        .catch(error => {
       
            console.error('Hubo un problema con la petición fetch:', error);
            document.getElementById('contenido-interno').innerHTML = `<p>Ocurrió un error al cargar los datos: ${error.message}</p>`;
        });
}


getPeliculas();