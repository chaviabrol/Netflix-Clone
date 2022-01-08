let movie_id = location.pathname;

// fetching movie details
fetch(movie_details_http+movie_id+'?' + new URLSearchParams({
    api_key:api_key
}))
.then(res => res.json())
.then(data=>{
    setupMovieInfo(data);
})

const setupMovieInfo = (data) =>{
    const movieName = document.querySelector('.movie-name');
    const genres = document.querySelector('.genres');
    const des = document.querySelector('.des');
    const title = document.querySelector('title');
    const backdrop = document.querySelector('.movie-info');

    title.innerHTML = movieName.innerHTML = data.title;
    genres.innerHTML = data.release_date.split('-')[0] + " | ";
    for(let i=0; i<data.genres.length; i++){
        genres.innerHTML += data.genres[i].name + formatString(i,data.genres.length);
    }
    if(data.adult == true){
        genres.innerHTML += ' | +18';
    }

    if(data.backdrop_path == null){
        data.backdrop_path = data.poster_path;
    }

    des.innerHTML = data.overview.substring(0,200) + '...';
    backdrop.style.backgroundImage = 'url(' + original_img_url + data.backdrop_path + ')';
}

const formatString = (currentIndex, maxIndex) =>{
    return (currentIndex == maxIndex -1) ? '' : ', ';
}

// fetching Cast info

fetch(movie_details_http + movie_id+"/credits?" + new URLSearchParams({
    api_key: api_key
}))
.then(res=> res.json())
.then(data =>{
    const cast = document.querySelector('.starring');
    for(let i = 0; i<5; i++){
        cast.innerHTML += data.cast[i].name + formatString(i,5);
    }
})
// fetching video clips

fetch(movie_details_http + movie_id+"/videos?" + new URLSearchParams({
    api_key : api_key
}))
.then(res=> res.json())
.then(data =>{
    let trailerContainer = document.querySelector('.trailer-container');
    let maxClips = (data.results.length > 4) ? 4: data.results.length;

    for(let i=0; i<maxClips; i++){
        let link = 'https://youtube.com/embed/' + data.results[i].key;
        trailerContainer.innerHTML += `<iframe id="myframe" src= "${link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        console.log(link);
    }
})

// Fetching recommendations
fetch(movie_details_http + movie_id+'/recommendations?'+ new URLSearchParams({
    api_key: api_key
}))
.then(res=> res.json())
.then(data =>{
    let container = document.querySelector('.recommendations-conatiner');
    for(let i=0; i<16; i++){
        if(data.results[i].backdrop_path == null){
            i++;
        }
        container.innerHTML += `<div class="movies" onclick="location.href ='/${data.results[i].id}'">
        <img src="${img_url}${data.results[i].backdrop_path}" alt="${data.results[i].title}">
        <p>${data.results[i].title}</p>`;
    }
})