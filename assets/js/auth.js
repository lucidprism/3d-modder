// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

// ✅ Sign Up
const signupBtn = document.getElementById("signup-btn");
signupBtn?.addEventListener("click", async () => {
  const firstname = document.getElementById("signup-firstname")?.value.trim();
  const lastname = document.getElementById("signup-lastname")?.value.trim();
  const age = document.getElementById("signup-age")?.value.trim();
  const location = document.getElementById("signup-location")?.value.trim();
  const email = document.getElementById("signup-email")?.value.trim();
  const password = document.getElementById("signup-password")?.value;

  if (!firstname || !lastname || !age || !location || !email || !password) {
    alert("Please fill out all fields.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Save user profile in Firestore
    await setDoc(doc(db, "users", uid), {
      firstname,
      lastname,
      age,
      location,
      email,
      createdAt: new Date()
    });

    alert("Signup successful! Welcome.");
    console.log("User profile saved:", uid);
    window.location.href = "../index.html";
  } catch (error) {
    alert("Signup failed: " + error.message);
    console.error("Signup error:", error);
  }
});

// ✅ Login
const loginBtn = document.getElementById("login-btn");
loginBtn?.addEventListener("click", async () => {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Logged in successfully.");
    console.log("Logged in:", userCredential.user);
    window.location.href = "../index.html";
  } catch (error) {
    alert("Login failed: " + error.message);
    console.error("Login error:", error);
  }
});

// ✅ Logout
const logoutBtn = document.getElementById("logout-btn");
logoutBtn?.addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("Logged out.");
    window.location.reload();
  } catch (error) {
    alert("Logout failed: " + error.message);
  }
});

// ✅ Auth State Display
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
