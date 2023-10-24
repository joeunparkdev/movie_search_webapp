const reviewForm = document.getElementById("review-form");

const reviews = document.getElementById("reviews-list");


reviewForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const reviewText = document.getElementById("review").value;
  const password = document.getElementById("password").value;

  const reviewElement = document.createElement("div");
  reviewElement.classList.add("user-review");
  reviewElement.innerHTML = `
    <strong>작성자:</strong> ${name}<br>
    <strong>리뷰:</strong> ${reviewText}<br>
    <strong>확인 비밀번호:</strong> ${password}
    <button class="delete-button">Delete</button>
  `;
  reviews.appendChild(reviewElement);

  reviewForm.reset();
});

const deleteButton = reviewElement.querySelector(".delete-button");
deleteButton.addEventListener("click", () => {
  reviewsList.removeChild(reviewElement);
});

function displayReviews() {
    reviews.innerHTML = '';
  
    const reviewElements = document.querySelectorAll('.user-review');
    reviewElements.forEach((element) => {
      reviews.appendChild(element);
    });
  }
  
  displayReviews();
