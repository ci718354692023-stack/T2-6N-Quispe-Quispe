const getCines = () => {

    fetch(`http://localhost/cinestar_sweb_php/cines`)
        .then(response => {

            if (response.status === 200) {
                return response.json(); 
            } else {

                throw new Error('Error al cargar la lista de cines. Estado: ' + response.status);
            }
        })
        .then(data => {

            const cines = data.data; 

            if (cines && cines.length > 0) {
                let html = `<br/><h1>Nuestros Cines</h1><br/>`;
                

                for (const cine of cines) {
                    html += `				
                        <div class="contenido-cine">
                            <img src="img/cine/${cine.id}.1.jpg" width="227" height="170"/>
                            <div class="datos-cine">
                                <h4>${cine.RazonSocial}</h4><br/>
                                <span>${cine.Direccion} - ${cine.Detalle}<br/><br/>Teléfono: ${cine.Telefonos}</span>
                            </div>
                            <br/>
                            <a href="cine.html?id=${cine.id}">
                                <img src="img/varios/ico-info2.png" width="150" height="40"/>
                            </a>
                        </div>
                    `;
                }

                document.getElementById('contenido-interno').innerHTML = html;
            } else {
                 document.getElementById('contenido-interno').innerHTML = '<p>No se encontraron cines disponibles.</p>';
            }
        })
        .catch(error => {

            console.error('Hubo un problema con la petición fetch:', error);
            document.getElementById('contenido-interno').innerHTML = `<p>Ocurrió un error al cargar los datos: ${error.message}</p>`;
        });
}


getCines();