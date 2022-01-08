const main = document.querySelector(".main");

fetch(genre_list_http + new URLSearchParams({
    api_key: api_key
}))

.then(res => res.json())
.then(data => {
    data.genres.forEach(item => {
        fetchMoviesListByGenres(item.id,item.name);
    })
});

const fetchMoviesListByGenres = (id,genres) =>{
    fetch(movie_genres_http + new URLSearchParams({
        api_key: api_key,
        with_genres: id,
        page: Math.floor(Math.random() * 3) + 1

    }))
    .then(res => res.json())
    .then(data => {
        makeCategoryElement(genres+' Movies', data.results);
    })
    .catch(err => console.log(err));

} 

const makeCategoryElement = (category, data) =>{
    main.innerHTML += '<div class="movie-list"><button class="pre-btn"><img src="https://github.com/kunaal438/netflix-clone-2.0/blob/master/public/img/pre.png?raw=true" alt=""></button><h1 class="movie-category">'+ category+'</h1><div class="movie-container" id="'+category+'"></div><button class="nxt-btn"><img src="https://github.com/kunaal438/netflix-clone-2.0/blob/master/public/img/nxt.png?raw=true" alt=""></button></div>';
    makeCards(category,data);
}

const makeCards= (id,data) =>{
    const movieContainer =  document.getElementById(id);
    data.forEach((item,i) =>{
        if(item.backdrop_path == null){
            item.backdrop_path = item.poster_path;
            if(item.backdrop_path == null){
                return;
            }
        }
        movieContainer.innerHTML += '<div class="movies" onClick="location.href='+ item.id+'"><img src="'+ img_url+item.backdrop_path+'" alt=""><p>'+item.title+'</p></div>';
        if(i == data.length-1){
            setTimeout(()=>{
                setupScrolling();
            },100);
        }
    })
}