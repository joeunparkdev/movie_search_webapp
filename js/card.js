function initEventCard(card) {
  card.addEventListener("mouseover", (e) => {
    const target = e.currentTarget;

    target.querySelector(".detail_button").style.display = "block";
    target.querySelector("img").style.filter = "brightness(50%)";
  });

  card.addEventListener("mouseout", (e) => {
    const target = e.currentTarget;

    target.querySelector(".detail_button").style.display = "none";
    target.querySelector("img").style.filter = "brightness(100%)";
  });

  card
    .querySelector(".detail_button")
    .addEventListener("click", (e) => {
      const target = e.currentTarget.parentNode;

      const movieId = target.dataset.id;

      localStorage.setItem(
        "movieData",
        JSON.stringify({
          poster_url: target.querySelector("img").src,
          title: target.querySelector(".movie_title").textContent,
          description:
            target.querySelector(".movie_overview").textContent,
          average: target.querySelector(".movie_average").textContent,
        })
      );

      window.location.href = `./detail-page.html?id=${movieId}`;
    });
}

document.querySelectorAll(".card_").forEach((card) => {
  initEventCard(card);
});
