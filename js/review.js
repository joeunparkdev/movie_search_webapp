const reviewForm = document.getElementById("review-form");
const reviews = document.getElementById("reviews-list");

// Load reviews from local storage when the page loads
const storedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");

// Display the stored reviews
for (const review of storedReviews) {
  displayReview(review);
}

reviewForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const reviewText = document.getElementById("review").value;
  const password = document.getElementById("password").value;

  const reviewData = {
    name: name,
    reviewText: reviewText,
    password: password
  };

  // Add the review to the reviews list and save it to local storage
  displayReview(reviewData);
  storedReviews.push(reviewData);
  localStorage.setItem("reviews", JSON.stringify(storedReviews));

  reviewForm.reset();
});

function displayReview(reviewData) {
  const reviewElement = document.createElement("div");
  reviewElement.classList.add("user-review");
  reviewElement.innerHTML = `
    <strong>작성자:</strong> ${reviewData.name}<br>
    <strong>리뷰:</strong> ${reviewData.reviewText}<br>
    <strong>확인 비밀번호:</strong> ${reviewData.password}
    <button class="delete-button">Delete</button>
  `;

  const deleteButton = reviewElement.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    reviews.removeChild(reviewElement);
    // Remove the review from the stored reviews and update local storage
    const index = storedReviews.indexOf(reviewData);
    if (index !== -1) {
      storedReviews.splice(index, 1);
      localStorage.setItem("reviews", JSON.stringify(storedReviews));
    }
  });

  reviews.appendChild(reviewElement);
}
