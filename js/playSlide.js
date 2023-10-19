
let playMovies = [];
let currentPlayShow = 0;

async function getPlayMovie(n) {
    const movies = [];
    
    const page = Math.floor(n / 20) + 1;
    for (let i=1; i<page+1; i++) {
        const response = await axios.get(playURL + i, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        });
        const pageMovies = response.data.results;
        movies.push(...pageMovies);
    }
    
    return movies.slice(0, n);
}

function updatePlayCardContent() {
    const cards = document.querySelectorAll(".play_card");

    console.log(currentPlayShow);
    cards.forEach((card, idx) => {
        const movie = playMovies[currentPlayShow + idx];

        card.querySelector("img").src = posterURL + movie.poster_path;
        card.querySelector(".movie_title").textContent = movie.title;
        card.querySelector(".movie_overview").textContent = movie.overview;
        card.querySelector(".movie_average").textContent = movie.vote_average;
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


