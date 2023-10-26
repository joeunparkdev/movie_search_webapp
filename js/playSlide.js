import { auth } from "./firebase/firebaseConfig.js";
import { createFavoriteIcon } from "./firebase/databaseService.js";

let playMovies = [];
let currentPlayShow = 0;

async function getPlayMovie(n) {
  const movies = [];

  try {
    const page = Math.floor(n / 20) + 1;
    for (let i = 1; i < page + 1; i++) {
      const response = await axios.get(playURL + i, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      const pageMovies = response.data.results;
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
    card.querySelector(".movie_overview").textContent =
      movie.overview;
    card.querySelector(".movie_average").textContent =
      movie.vote_average;

    const isLoggedIn = auth.currentUser ? true : false;
    let favoriteIcon = card.querySelector(".favorite");

    if (favoriteIcon) {
      card.removeChild(favoriteIcon);
    }
    if (isLoggedIn) {
      favoriteIcon = createFavoriteIcon(movie.id);
      card.appendChild(favoriteIcon);
    }
  });
}

document
  .querySelector(".play_slide .next")
  .addEventListener("click", (e) => {
    currentPlayShow += 5;
    if (currentPlayShow >= playMovies.length) {
      currentPlayShow = 0;
    }
    updatePlayCardContent();
  });
document
  .querySelector(".play_slide .prev")
  .addEventListener("click", (e) => {
    currentPlayShow -= 5;
    if (currentPlayShow <= 0) {
      currentPlayShow = playMovies.length - 5;
    }
    updatePlayCardContent();
  });

getPlayMovie(30).then((data) => {
  setTimeout(() => {
    playMovies = data;
    updatePlayCardContent();
  }, 500);
});
