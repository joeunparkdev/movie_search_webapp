import { auth } from "./firebaseConfig.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBtn.textContent = "Logout";
  } else {
    loginBtn.textContent = "Login";
  }
});

loginBtn.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (user) {
    await googleLogout();
  } else {
    await googleLogin();
  }
});

// 구글 로그인
export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    location.reload();
    return result.user;
  } catch (error) {
    console.error(error);
  }
};

// 로그아웃
export const googleLogout = async () => {
  try {
    await signOut(auth);
    location.reload();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// 로그인 상태 체크
export const checkLoginStatus = async () => {
  return auth.currentUser ? true : false;
};

// 유저 반환
export const getUser = () => {
  return auth.currentUser;
};
