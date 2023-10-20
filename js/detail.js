function showDetail(poster_url, title, description, average) {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.body.style.overflow = 'hidden';
    document.querySelector(".hide_block").style.display = "flex";
    const detailCard = document.querySelector(".detail_card");

    if (detailCard) {
        detailCard.querySelector("img").src = poster_url;
        detailCard.querySelector(".detail_title").textContent = title;
        detailCard.querySelector(".detail_description").textContent = description;
        detailCard.querySelector(".detail_average").textContent = "평점 " + average;
    }
}

function hideDetail() {
    document.querySelector(".hide_block").style.display = "none";
    document.body.style.overflow = 'visible';
}

document.querySelector(".detail_delete").addEventListener("click", hideDetail);