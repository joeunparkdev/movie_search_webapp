import { auth } from "./firebase/firebaseConfig.js";
import { createFavoriteIcon } from "./firebase/databaseService.js";

let searchMovies;

async function getMovies(title) {
  try {
    const response = await axios.get(searchURL + title, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    const searchMovies = response.data.results;
    return searchMovies;
  } catch (e) {
    console.log("api 요청 에러");
    return;
  }
}

function createSearchCard(movie) {
  const searchList = document.querySelector(".search_list");
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


  const isLoggedIn = auth.currentUser ? true : false;
  let favoriteIcon = card.querySelector(".favorite");

  if (isLoggedIn && !favoriteIcon) {
    favoriteIcon = createFavoriteIcon(movie.id);
    card.appendChild(favoriteIcon);
  }

    const voteCount = document.createElement("span");
    voteCount.classList.add("vote_count");
    voteCount.textContent = `조회수: ${movie.vote_count}`;
    card.appendChild(voteCount);

    const voteAverage = document.createElement("span");
    voteAverage.classList.add("vote_average");
    voteAverage.textContent = `별점: ${movie.vote_average}`;
    card.appendChild(voteAverage);

    const releaseDate = document.createElement("span");
    releaseDate.classList.add("release_date");
    releaseDate.textContent = `개봉일: ${movie.release_date}`;
    card.appendChild(releaseDate);

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

document
  .querySelector(".search_button")
  .addEventListener("click", async (e) => {
    const searchBox = document.querySelector(".search_box input");
    const title = searchBox.value;
    // 유효성 검사
    if (!searchValidationCheck(title)) {
      searchBox.value = "";
      return;
    }

    searchMovies = await getMovies(title);

    document.querySelector(".search_line").style.display = "flex";
    document.querySelector(
      ".search_keyword"
    ).textContent = `"${title}"`;

    if (searchMovies.length === 0) {
      const noResultsMessage = document.querySelector(".no_results");
      noResultsMessage.style.display = "block";
      hideSortButtons();
    } else {
      const noResultsMessage = document.querySelector(".no_results");
      noResultsMessage.style.display = "none";
      showSortButtons();
    }

    deleteSearchCard();

    searchMovies.forEach((movie) => {
      createSearchCard(movie);
    });
    searchBox.value = "";
  });

//버튼들 숨기기
function hideSortButtons() {
    const sortButtons = document.querySelectorAll(".vote_average_btn, .vote_count_btn, .release_date_btn");
    sortButtons.forEach(button => {
        button.style.display = "none";
    });
}

//버튼들 보여주기
function showSortButtons() {
    const sortButtons = document.querySelectorAll(".vote_average_btn, .vote_count_btn, .release_date_btn");
    sortButtons.forEach(button => {
        button.style.display = "inline-block";
    });
}

//설명 숨기기
function hideSort() {
    const sortElements = document.querySelectorAll(".vote_count, .vote_average, .release_date");
    console.log("Hiding element:", sortElements);
    sortElements.forEach(element => {
        console.log("Hiding element:", element);
        element.style.display = "none";
    });
}

//설명 보여주기
function showSort(elementSelector) {
    const element = document.querySelectorAll(elementSelector);
    element.forEach(showElement => {
        console.log("Hiding element:", showElement);
        showElement.style.display = "inline-block";
    });
    }


//조회수 정렬
document.querySelector(".vote_count_btn").addEventListener("click", async function voteCount() {
    // 오직 조회순만 active하게 만들기
    hideSort();
    deleteSearchCard();

    searchMovies.sort((a, b) => {
        return b.vote_count - a.vote_count;
    });

    searchMovies.forEach((movie) => {
        createSearchCard(movie);
    });
    showSort(".vote_count");
});

//별점순 정렬
document.querySelector(".vote_average_btn").addEventListener("click", async function voteAverage() {
    // 오직 별점순만 active하게 만들기
    hideSort();

    deleteSearchCard();

    searchMovies.sort((a, b) => {
        return b.vote_average - a.vote_average;
    });

    searchMovies.forEach((movie) => {
        createSearchCard(movie);
    });
    showSort(".vote_average");
});

//최신순 정렬
document.querySelector(".release_date_btn").addEventListener("click", async function releaseDate() {
    // 오직 최신순만 active하게 만들기
    hideSort();
    deleteSearchCard();

    searchMovies.sort((a, b) => {
        return new Date(b.release_date) - new Date(a.release_date);
    });

    searchMovies.forEach((movie) => {
        createSearchCard(movie);
    });
    showSort(".release_date");
});