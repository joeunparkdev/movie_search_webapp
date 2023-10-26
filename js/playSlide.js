let playMovies = [];
let currentPlayShow = 0;

async function getPlayMovie(n) {
    const movies = [];
    
    try {
        const page = Math.floor(n / 20) + 1;
        for (let i=1; i<page+1; i++) {
            const response = await axios.get(playURL + i, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
            });
            const pageMovies = response.data.results;
            // 장르 변환
            for (i = 0; i < pageMovies.length; i++) {
                const {genre_ids} = pageMovies[i];
                for (j = 0; j < genre_ids.length; j++) {
                    for (k = 0; k < genres.length; k++) {
                        if (genre_ids[j] === genres[k].id) {
                            genre_ids[j] = genres[k].name;
                        }
                    }
                }
            };
            movies.push(...pageMovies);
        }
    } catch (e) {
        console.log("api 요청 에러");
        return;
    }
    
    return movies.slice(0, n);
}

function updatePlayCardContent() {
    const cards = document.querySelectorAll(".play_card");

    cards.forEach((card, idx) => {
        const movie = playMovies[currentPlayShow + idx];

        card.dataset.id = movie.id; 
        card.querySelector("img").src = posterURL + movie.poster_path;
        card.querySelector(".movie_title").textContent = movie.title;
        card.querySelector(".movie_overview").textContent = movie.overview;
        card.querySelector(".movie_average").textContent = movie.vote_average;
        card.querySelector(".movie_popularity").textContent = movie.popularity;
        card.querySelector(".movie_releaseDate").textContent = movie.release_date;
        card.querySelector(".movie_originalLanguage").textContent = movie.original_language;
        card.querySelector(".movie_genreIds").textContent = movie.genre_ids;
    });
}

document.querySelector(".play_slide .next").addEventListener("click", (e) => {
    currentPlayShow += 5;
    if (currentPlayShow >= playMovies.length) {
        currentPlayShow = 0;
    }
    updatePlayCardContent();
});
document.querySelector(".play_slide .prev").addEventListener("click", (e) => {
    currentPlayShow -= 5;
    if (currentPlayShow <= 0) {
        currentPlayShow = playMovies.length-5;
    }
    updatePlayCardContent();
});


getPlayMovie(30)
.then((data) => {
    playMovies = data;
    updatePlayCardContent();
});

