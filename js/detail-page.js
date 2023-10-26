window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");
  console.log(`Loading data for movie with ID: ${movieId}`);

  if (localStorage.getItem(`movieData-${movieId}`)) {
    const movieData = JSON.parse(
      localStorage.getItem(`movieData-${movieId}`)
    );

    console.log(movieData);
    document.querySelector(".detail_img").src = movieData.poster_url;
    document.querySelector(".detail_title").innerText =
      movieData.title;
    document.querySelector(".detail_description").innerText =
      movieData.description;
    document.querySelector(".detail_average").innerText =
      "평점 : " + movieData.average;
    document.querySelector(".detail_originalLanguage").innerText =
    "원어 : " + movieData.original_language;
    document.querySelector(".detail_popularity").innerText =
    "영화인기정도 : " + movieData.popularity;
    document.querySelector(".detail_releaseDate").innerText =
    "개봉일 : " + movieData.release_date;
    document.querySelector(".detail_genreIds").innerText =
    "장르 : " + movieData.genre_ids;


  } else {
    alert("영화 정보를 불러올 수 없습니다.");
  }
};