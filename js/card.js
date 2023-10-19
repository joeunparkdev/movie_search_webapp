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
    })
}

document.querySelectorAll(".card").forEach((card) => {
    initEventCard(card);
});