window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  if (localStorage.getItem("movieData")) {
    const movieData = JSON.parse(localStorage.getItem("movieData"));

    console.log(movieData);
    document.querySelector(".detail_img").src = movieData.poster_url;
    document.querySelector(".detail_title").innerText =
      movieData.title;
    document.querySelector(".detail_description").innerText =
      movieData.description;
    document.querySelector(".detail_average").innerText =
      "평점 " + movieData.average;

    localStorage.removeItem("movieData");
  } else {
  }
};
