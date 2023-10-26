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

  const isLoggedIn = auth.currentUser ? true : false;
  let favoriteIcon = card.querySelector(".favorite");

  if (favoriteIcon) {
    card.removeChild(favoriteIcon);
  }
  if (isLoggedIn) {
    favoriteIcon = createFavoriteIcon(movie.id);
    card.appendChild(favoriteIcon);
  }

  if (
    document.querySelector(".vote_count").classList.contains("active")
  ) {
    const voteCount = document.createElement("span");
    voteCount.classList.add("vote_count");
    voteCount.textContent = `조회수: ${movie.vote_count}`;
    card.appendChild(voteCount);
  }

  if (
    document
      .querySelector(".vote_average")
      .classList.contains("active")
  ) {
    const voteAverage = document.createElement("span");
    voteAverage.classList.add("vote_average");
    voteAverage.textContent = `별점: ${movie.vote_average}`;
    card.appendChild(voteAverage);
  }

  if (
    document
      .querySelector(".release_date")
      .classList.contains("active")
  ) {
    const releaseDate = document.createElement("span");
    releaseDate.classList.add("release_date");
    releaseDate.textContent = `개봉일: ${movie.release_date}`;
    card.appendChild(releaseDate);
  }

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
  const sortButtons = document.querySelectorAll(
    ".vote_average, .vote_count, .release_date"
  );
  sortButtons.forEach((button) => {
    button.style.display = "none";
  });
}

//버튼들 보여주기
function showSortButtons() {
  const sortButtons = document.querySelectorAll(
    ".vote_average, .vote_count, .release_date"
  );
  sortButtons.forEach((button) => {
    button.style.display = "inline-block"; // Adjust the display style as needed
  });
}

//조회수 정렬
document
  .querySelector(".vote_count")
  .addEventListener("click", async function voteCount() {
    // 오직 조회순만 active하게 만들기
    if (
      !document
        .querySelector(".vote_count")
        .classList.contains("active")
    ) {
      document.querySelector(".vote_count").classList.add("active");
      document
        .querySelector(".vote_average")
        .classList.remove("active");
      document
        .querySelector(".release_date")
        .classList.remove("active");

      deleteSearchCard();

      searchMovies.sort((a, b) => {
        return b.vote_count - a.vote_count;
      });

      searchMovies.forEach((movie) => {
        createSearchCard(movie);
      });
    }
  });

//별점순 정렬
document
  .querySelector(".vote_average")
  .addEventListener("click", async function voteAverage() {
    // 오직 별점순만 active하게 만들기
    if (
      !document
        .querySelector(".vote_average")
        .classList.contains("active")
    ) {
      document.querySelector(".vote_average").classList.add("active");
      document
        .querySelector(".vote_count")
        .classList.remove("active");
      document
        .querySelector(".release_date")
        .classList.remove("active");

      deleteSearchCard();

      searchMovies.sort((a, b) => {
        return b.vote_average - a.vote_average;
      });

      searchMovies.forEach((movie) => {
        createSearchCard(movie);
      });
    }
  });

//최신순 정렬
document
  .querySelector(".release_date")
  .addEventListener("click", async function releaseDate() {
    // 오직 최신순만 active하게 만들기
    if (
      !document
        .querySelector(".release_date")
        .classList.contains("active")
    ) {
      document.querySelector(".release_date").classList.add("active");
      document
        .querySelector(".vote_count")
        .classList.remove("active");
      document
        .querySelector(".vote_average")
        .classList.remove("active");

      deleteSearchCard();

      searchMovies.sort((a, b) => {
        return new Date(b.release_date) - new Date(a.release_date);
      });

      searchMovies.forEach((movie) => {
        createSearchCard(movie);
      });
    }
  });
