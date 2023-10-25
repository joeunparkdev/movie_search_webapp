const searchURL = "https://api.themoviedb.org/3/search/movie?language=ko-KR&query=";
const popularURL = "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=";
const posterURL = "https://www.themoviedb.org/t/p/w1280";
const playURL = "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=";

let searchMovies;

async function getMovies(title) {
    const response = await axios.get(searchURL + title, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
    });
    const searchMovies = response.data.results;
    console.log(searchMovies);
    return searchMovies;
}


function createSearchCard(movie) {
    const searchList = document.querySelector(".search_list");
    const col = document.createElement("div");
    col.classList.add("col");

    const card = document.createElement("div");
    card.classList.add("card", "card_", "pop_card");
    card.dataset.id = movie.id;

    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = posterURL + movie.poster_path;
    card.appendChild(img);

    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("detail_button", "btn", "btn-danger");
    button.textContent = "상세보기";
    card.appendChild(button);

    const span = document.createElement("span");
    span.classList.add("movie_title");
    span.textContent = movie.title;
    card.appendChild(span);

    const p = document.createElement("p");
    p.classList.add("movie_overview");
    p.textContent = movie.overview;
    card.appendChild(p);

    const average = document.createElement("span");
    average.classList.add("movie_average");
    average.textContent = movie.vote_average;
    card.appendChild(average);

    initEventCard(card);

    col.appendChild(card);
    searchList.appendChild(col);
}

function deleteSearchCard() {
    let list = document.querySelectorAll(".search_list .col");
    list.forEach((col) => {
        col.remove();
    });
}

function updateCardContent() {
    const cards = document.querySelectorAll(".pop_card");

    console.log(currentPopShow);
    cards.map((card, idx) => {
        const movie = popularMovies[currentPopShow + idx];

        card.querySelector("img").src = posterURL + movie.poster_path;
        card.querySelector(".movie_title").textContent = movie.title;
        card.querySelector(".movie_overview").textContent = movie.overview;
        card.querySelector(".movie_average").textContent = movie.vote_average;
    });
}

document.querySelector(".search_button").addEventListener("click", async (e) => {
    const searchBox = document.querySelector(".search_box input");
    const title = searchBox.value;
    // 유효성 검사
    if (!searchValidationCheck(title)) {
        searchBox.value = "";
        return;
    }

    searchMovies = await getMovies(title);
    
    document.querySelector(".search_text").style.display = "block";
    document.querySelector(".search_keyword").textContent = `"${title}"`;

    deleteSearchCard();

    searchMovies.forEach((movie) => {
        createSearchCard(movie);
    });
    searchBox.value = "";
});

//조회수 정렬
document.querySelector(".vote_count").addEventListener("click", async function voteCount() {
    searchMovies.sort((a, b) => {
        return b.vote_count - a.vote_count;
    });

    deleteSearchCard();

    searchMovies.forEach((movie) => {
        createSearchCard(movie);
    });
});

//별점순 정렬
document.querySelector(".vote_average").addEventListener("click", async function voteAverage() {
    searchMovies.sort((a, b) => {
        return b.vote_average - a.vote_average;
    });

    deleteSearchCard();

    searchMovies.forEach((movie) => {
        createSearchCard(movie);
    });
});

//최신순 정렬
document.querySelector(".release_date").addEventListener("click", async function releaseDate() {
    searchMovies.sort((a, b) => {
        return b.release_date - a.release_date;
    });

    deleteSearchCard();

    searchMovies.forEach((movie) => {
        createSearchCard(movie);
    });
});