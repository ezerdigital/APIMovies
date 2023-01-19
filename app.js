let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener('click', ()=>{ 
    if ( pagina+1 <= 1000 ){
        pagina += 1;
        loadMovies();
    }
});

btnAnterior.addEventListener('click', ()=>{
    if( pagina-1 >= 1 ){
        pagina -= 1;
        loadMovies()
    }
});

const loadMovies =  async () => {

    try {
        
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d41b49e5fba2f671f15891091e05d485&Language=es-MX&page=${pagina}`);

        // es correcta la respuesta?
        if ( response.status === 200 ) {

            const datos = await response.json();
            let peliculas = "";
            datos.results.forEach(movie => {
                peliculas += `
                <div class="pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                    <h3 class="titulo">${movie.title}</h3>
                </div>
                `;
            });
            document.getElementById("contenedor").innerHTML = peliculas;

        } else if ( response.status === 401 ) {

            console.log( "key error")

        } else if ( response.status === 404 ) {

            console.log("the movie no exist")

        } else {

            console.log( "error for")

        }

    } catch(error) {
        
        console.log(error);

    }
};
loadMovies()
