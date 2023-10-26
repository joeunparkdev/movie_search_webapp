import {
  getDatabase,
  ref,
  set,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { auth } from "./firebaseConfig.js";

async function getFavoriteMovies(userId) {
  const dbRef = ref(getDatabase());
  const snapshot = await get(
    child(dbRef, `users/${userId}/favorites`)
  );
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return [];
  }
}

async function updateFavoriteMovies(userId, movieId, isAdd) {
  const favorites = await getFavoriteMovies(userId);

  if (isAdd) {
    if (!favorites.includes(movieId)) {
      favorites.push(movieId);
    }
  } else {
    const index = favorites.indexOf(movieId);

    if (index > -1) {
      favorites.splice(index, 1);
    }
  }

  await set(
    ref(getDatabase(), `users/${userId}/favorites`),
    favorites
  );
}

export function createFavoriteIcon(movieId) {
  const favoriteIcon = document.createElement("span");
  favoriteIcon.classList.add("favorite");
  favoriteIcon.style.cursor = "pointer";
  favoriteIcon.textContent = "☆";

  auth.onAuthStateChanged((user) => {
    if (user) {
      getFavoriteMovies(user.uid).then((favorites) => {
        if (favorites.includes(movieId)) {
          favoriteIcon.textContent = "★";
        } else {
          favoriteIcon.textContent = "☆";
        }
      });
    } else {
      favoriteIcon.textContent = "☆";
    }
  });

  favoriteIcon.addEventListener("click", () => {
    if (auth.currentUser) {
      if (favoriteIcon.textContent === "☆") {
        updateFavoriteMovies(
          auth.currentUser.uid,
          movieId,
          true
        ).then(() => {
          favoriteIcon.textContent = "★";
        });
      } else {
        updateFavoriteMovies(
          auth.currentUser.uid,
          movieId,
          false
        ).then(() => {
          favoriteIcon.textContent = "☆";
        });
      }
    }
  });

  return favoriteIcon;
}
