const reviewForm = document.getElementById("review-form");
const reviews = document.getElementById("reviews-list");

// Load reviews from local storage when the page loads
const storedReviews = JSON.parse(
  localStorage.getItem("reviews") || "[]"
);

let nextId =
  storedReviews.length > 0
    ? Math.max(...storedReviews.map((review) => review.id)) + 1
    : 1;

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

const filteredReviews = storedReviews.filter(
  (review) => review.movieId === movieId
);

// Display the stored reviews
for (const review of filteredReviews) {
  displayReview(review);
}

async function hashPassword(password) {
  try {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);

      const hashBuffer = await crypto.subtle.digest('SHA-256', data);

      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

      return hashHex;
  } catch (error) {
      console.error('Error hashing password:', error);
      return null;
  }
}

function secureCompare(a, b) {
  const buffA = Buffer.from(a);
  const buffB = Buffer.from(b);

  // Ensure both buffers have the same length
  if (buffA.length !== buffB.length) {
    return false;
  }

  // Perform constant-time comparison
  let result = 0;
  for (let i = 0; i < buffA.length; i++) {
    result |= buffA[i] ^ buffB[i];
  }

  return result === 0;
}

reviewForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const reviewText = document.getElementById("review").value;
  const password = document.getElementById("password").value;

  if (!commentValidationCheck(reviewText)) {
    reviewForm.reset();
    return;
  }
  // Hash the user's password before storing it
  const hashedPassword = await hashPassword(password);

  // Get the current movie ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  const reviewData = {
    id: nextId++,
    movieId: movieId,
    name: name,
    reviewText: reviewText,
    password: hashedPassword,
  };

  // Add the review to the reviews list and save it to local storage
  displayReview(reviewData);
  storedReviews.push(reviewData);
  localStorage.setItem("reviews", JSON.stringify(storedReviews));
  localStorage.setItem("nextId", nextId.toString());

  reviewForm.reset();
});


function displayReview(reviewData) {
  const reviewElement = document.createElement("div");
  reviewElement.classList.add("user-review");
  reviewElement.innerHTML = `
    <strong>작성자:</strong> ${reviewData.name}<br>
    <strong>리뷰:</strong> <span class="review-text">${reviewData.reviewText}</span><br>
    <strong>확인 비밀번호:</strong> ${reviewData.password}
    <button class="delete-button">Delete</button>
    <button class="edit-button">Edit</button>
  `;

  const deleteButton = reviewElement.querySelector(".delete-button");

  deleteButton.addEventListener("click", () => {
    const enteredPassword = prompt("비밀번호를 입력하세요.");
    const enteredPasswordHash = await hashPassword(enteredPassword);

    if (secureCompare(enteredPasswordHash, reviewData.password)) {
      if (reviews.contains(reviewElement)) {
        reviews.removeChild(reviewElement);
      }
      removeReviewFromStorage(reviewData.id);
    } else {
        alert("비밀번호가 틀렸습니다.");
    }
  });

  const editButton = reviewElement.querySelector(".edit-button");
  editButton.addEventListener("click", () => {
    const enteredPassword = prompt("비밀번호를 입력하세요.");
    const enteredPasswordHash = await hashPassword(enteredPassword);
    if (secureCompare(enteredPasswordHash, reviewData.password)) {
      let newReview = prompt("새로운 리뷰 내용을 입력하세요");
      updateStoredReview(newReview, reviewData.id);

      let newTextElememt =
        reviewElement.querySelector(".review-text");
      newTextElememt.textContent = newReview;

      window.location.reload();
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  });

  reviews.appendChild(reviewElement);

  function removeReviewFromStorage(id) {
    let index = storedReviews.findIndex((review) => {
      return id === review.id;
    });
    if (index !== -1) {
      storedReviews.splice(index, 1);
      localStorage.setItem("reviews", JSON.stringify(storedReviews));
    }
  }

  function updateStoredReview(newText, id) {
    let index = storedReviews.findIndex((review) => {
      return id === review.id;
    });
    if (index !== -1) {
      storedReviews[index].reviewText = newText;
      localStorage.setItem("reviews", JSON.stringify(storedReviews));
    }
  }
}
