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

    document.querySelector(".detail_img").src =
      "https://image.tmdb.org/t/p/w500" + movieData.poster_path;

    document.querySelector(".detail_title").innerText =
      movieData.title;

    document.querySelector(".detail_description").innerText =
      movieData.overview;

    document.querySelector(".detail_average").innerText =
      "평점 " + movieData.vote_average.toFixed(1);
  } catch (error) {
    console.error("Error:", error);
    alert("영화 정보를 불러올 수 없습니다.");
  }
};
