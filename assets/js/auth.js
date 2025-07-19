// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAY60GV85KGRnBNbp76yIkOujGzD9Llf4Q",
  authDomain: "lucidprismauth.firebaseapp.com",
  projectId: "lucidprismauth",
  storageBucket: "lucidprismauth.firebasestorage.app",
  messagingSenderId: "1009604111946",
  appId: "1:1009604111946:web:ffe630acf3c22444fa80b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ----- Auth Actions -----

// Sign Up
const signupBtn = document.getElementById("signup-btn");
signupBtn?.addEventListener("click", async () => {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Signup successful! Welcome.");
    console.log("Signed up:", userCredential.user);
  } catch (error) {
    alert("Signup failed: " + error.message);
  }
});

// Login
const loginBtn = document.getElementById("login-btn");
loginBtn?.addEventListener("click", async () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Logged in successfully.");
    console.log("Logged in:", userCredential.user);
  } catch (error) {
    alert("Login failed: " + error.message);
  }
});

// Logout
const logoutBtn = document.getElementById("logout-btn");
logoutBtn?.addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("Logged out.");
  } catch (error) {
    alert("Logout failed: " + error.message);
  }
});

// Auth State Display
onAuthStateChanged(auth, (user) => {
  const statusEl = document.getElementById("auth-status");
  if (statusEl) {
    if (user) {
      statusEl.textContent = `Welcome, ${user.email}`;
    } else {
      statusEl.textContent = "You are not logged in.";
    }
  }
});
