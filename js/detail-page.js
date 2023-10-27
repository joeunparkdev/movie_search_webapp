let genrelist;
let spokenLanguagesList;
let companyList;

window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    const movieData = await response.json();
    const genre = movieData.genres;
    genrelist = genre.map((g) => {
      return g.name;
    });

    const spokenLanguages = movieData.spoken_languages;
    spokenLanguagesList = spokenLanguages.map((s) => {
      return s.name;
    });

    const company = movieData.production_companies;
    companyList = company.map((c) => {
      return c.name;
    });



    document.querySelector(".detail_img").src =
      "https://image.tmdb.org/t/p/w500" + movieData.poster_path;

    document.querySelector(".detail_title").innerText =
      movieData.title;

    document.querySelector(".detail_description").innerText =
      movieData.overview;

    document.querySelector(".detail_genreIds").innerText =
      "장르 |  " + genrelist;

    document.querySelector(".detail_releaseDate").innerText =
      "개봉일 |  " + movieData.release_date;

    document.querySelector(".detail_runtime").innerText =
      "상영시간 | " + movieData.runtime + " 분"

    document.querySelector(".detail_status").innerText =
      "영화 상태 | " + movieData.status;

    document.querySelector(".detail_company").innerText =
      "제작사 | " + companyList;

    document.querySelector(".detail_average").innerText =
      "평점 | " + movieData.vote_average.toFixed(1);

    document.querySelector(".detail_popularity").innerText =
      "영화인기정도 | " + movieData.popularity;

    document.querySelector(".detail_vote_count").innerText =
      "조회수 | " + movieData.vote_count;

    document.querySelector(".detail_originalLanguage").innerText =
      "원어 | " + movieData.original_language;

    document.querySelector(".detail_spokenLanguages").innerText =
      "구어 | " + spokenLanguagesList;

  } catch (error) {
    console.error("Error:", error);
    alert("영화 정보를 불러올 수 없습니다.");
  }
};
