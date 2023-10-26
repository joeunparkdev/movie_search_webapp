import { db } from "./firebase/firebaseConfig.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

function createFavoriteCard(movie) {
    const favoriteList = document.querySelector(".favorite_list");
    const col = document.createElement("div");
    col.classList.add("col");

    const card = document.createElement("div");
    card.classList.add("card", "card_");
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

    // movie.poster_path가 null인 경우에 대비하여 기본 이미지 URL을 사용
    img.src = movie.poster_path ? posterURL + movie.poster_path : "기본 이미지 URL 또는 다른 이미지 URL";

    initEventCard(card);

    col.appendChild(card);
    favoriteList.appendChild(col);
}

async function getMovieForId(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&api_key=${API_KEY}`);
        if (!response.ok) {
            console.log("API 요청 에러");
        }
        const movieData = await response.json();
        return movieData;
    } catch (e) {
        console.log("API 요청 에러");
    }

    return null;
}

async function getFavoriteMovies() {
    const auth = await getAuth();
    const user = auth.currentUser.uid;
    console.log(user);

    const favoriteRef = ref(db, `users/1uEwi2oPANdHA3YyHqMrnAev9QI2/favorites`);

    // const favoriteData = (await onValue(favoriteRef)).val();

    // console.log(favoriteData);

    onValue(favoriteRef, async (snapshot) => {
        const favoriteData = snapshot.val();

        for (let id of favoriteData) {
            const movie = await getMovieForId(id);
            console.log(movie);
            createFavoriteCard(movie);
        }
    });
}

setTimeout(getFavoriteMovies, 1000);