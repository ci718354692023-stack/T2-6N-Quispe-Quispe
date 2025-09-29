const getCine = () => {

    const id = (new URLSearchParams(window.location.search)).get('id');


    fetch(`http://localhost/cinestar_sweb_php/cines/${id}`)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Error al cargar la información del cine. Estado: ' + response.status);
            }
        })
        .then(data => {
            const cine = data.data;

            if (cine) {
                let TarifasxCine = '';

                cine.tarifas.forEach((tarifa, index) => {
                    const claseFila = index % 2 === 0 ? '' : 'impar';
                    TarifasxCine += `
                        <div class="fila ${claseFila}">
                                <div class="celda-titulo">${tarifa.DiasSemana}</div>
                                <div class="celda">${tarifa.Precio}</div>
                        </div>
                    `;
                });

                let PeliculasxCine = '';

                cine.peliculas.forEach((pelicula, index) => {
                    const claseFila = index % 2 === 0 ? '' : 'impar';
                    PeliculasxCine += `
                        <div class="fila ${claseFila}">
                                <div class="celda-titulo">${pelicula.Titulo}</div>
                                <div class="celda">${pelicula.Horarios}</div>
                        </div>
                    `;
                });


                const html = `	
                    <h2>${cine.RazonSocial}</h2>	
                    <div class="cine-info">
                        <div class="cine-info datos">
                            <p>${cine.Direccion} - ${cine.Detalle}</p>
                            <p>Teléfono: ${cine.Telefonos}</p>
                            <br/>
                            <div class="tabla">
                                ${TarifasxCine}
                            </div>
                            <div class="aviso">
                                <p>A partir del 1ro de julio de 2016, Cinestar Multicines realizará el cobro de la comisión de S/. 1.00 adicional al tarifario vigente, a los usuarios que compren sus entradas por el aplicativo de Cine Papaya para Cine Star Comas, Excelsior, Las Américas, Benavides, Breña, San Juan, UNI, Aviación, Sur, Porteño, Tumbes y Tacna.</p>
                            </div>
                        </div>
                        <img src="img/cine/${cine.id}.2.jpg"/>
                        <br/><br/><h4>Los horarios de cada función están sujetos a cambios sin previo aviso.</h4><br/>
                        <div class="cine-info peliculas">
                            <div class="tabla">
                                <div class="fila">
                                    <div class="celda-cabecera">Películas</div>
                                    <div class="celda-cabecera">Horarios</div>
                                </div>
                                ${PeliculasxCine}
                            </div>
                        </div>
                    </div>
                    <div>
                        <img style="float:left;" src="img/cine/${cine.id}.3.jpg" alt="Imagen del cine"/>
                        <span class="tx_gris">Precios de los juegos: desde S/1.00 en todos los Cine Star.<br/>
                        Horario de apertura de juegos: ${cine.Horario}</span>
                    </div>
                `;
                document.getElementById('contenido-interno').innerHTML = html;
            } else {
                 document.getElementById('contenido-interno').innerHTML = '<p>No se encontró la información del cine.</p>';
            }
        })
        .catch(error => {
            console.error('Ocurrió un error en getCineV1:', error);
            document.getElementById('contenido-interno').innerHTML = `<p>Error al cargar los datos: ${error.message}</p>`;
        });
}


getCine();