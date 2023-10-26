import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { auth } from "./firebase/firebaseConfig.js";
import { removeAllFavoriteMovies } from "./firebase/databaseService.js";
import { getFavoriteMovies as getFavoriteMovieIds } from "./firebase/databaseService.js";
import {
  createFavoriteIcon,
  getFavoriteCount,
} from "./firebase/databaseService.js";

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

  const favoriteCountSpan = document.createElement("span");
  favoriteCountSpan.classList.add("favorite_count");
  card.appendChild(favoriteCountSpan);

  getFavoriteCount(movie.id).then((count) => {
    favoriteCountSpan.textContent = `즐겨찾기한 사용자 수: ${count}명`;
  });

  const p = document.createElement("p");
  p.classList.add("movie_overview");
  p.textContent = movie.overview;
  card.appendChild(p);

  const average = document.createElement("span");
  average.classList.add("movie_average");
  average.textContent = movie.vote_average;
  card.appendChild(average);

  // movie.poster_path가 null인 경우에 대비하여 기본 이미지 URL을 사용
  img.src = movie.poster_path
    ? posterURL + movie.poster_path
    : "기본 이미지 URL 또는 다른 이미지 URL";

  const isLoggedIn = auth.currentUser ? true : false;
  let favoriteIcon = card.querySelector(".favorite");

  if (favoriteIcon) {
    card.removeChild(favoriteIcon);
  }
  if (isLoggedIn) {
    favoriteIcon = createFavoriteIcon(movie.id);
    card.appendChild(favoriteIcon);
  }

  initEventCard(card);

  col.appendChild(card);
  favoriteList.appendChild(col);
}

function deleteFavoriteCard() {
  let list = document.querySelectorAll(".favorite_list .col");
  list.forEach((col) => {
    col.remove();
  });
}

async function getMovieForId(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&api_key=${API_KEY}`
    );
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

// 수정했어요.
// 기존에 databaseService 에 있던거 가져다씀
async function getFavoriteMovies() {
  deleteFavoriteCard();

  const auth = await getAuth();
  if (!auth.currentUser) {
    alert("로그인이 필요합니다!");
    return;
  }

  const user = auth.currentUser.uid;

  const favoriteMovieIds = await getFavoriteMovieIds(user);

  for (let id of favoriteMovieIds) {
    const movie = await getMovieForId(id);
    console.log(movie);
    createFavoriteCard(movie);
  }
}

const deleteAllFavoriteMovies =
  document.getElementById("delAllFavBtn");

deleteAllFavoriteMovies.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (user) {
    await removeAllFavoriteMovies(user.uid);
    alert("모든 즐겨찾기 항목이 삭제되었습니다.");
    window.location.reload();
  } else {
    console.log("사용자가 로그인하지 않았습니다.");
  }
});

onAuthStateChanged(getAuth(), (user) => {
  getFavoriteMovies();
});
