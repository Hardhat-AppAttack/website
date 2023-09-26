// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBW5wI--xChkrF2guhYXDTYQf4_BPsilgA",
  authDomain: "sit313-87ce1.firebaseapp.com",
  projectId: "sit313-87ce1",
  storageBucket: "sit313-87ce1.appspot.com",
  messagingSenderId: "832006075209",
  appId: "1:832006075209:web:e2821c2b8c6313a9d86098",
  measurementId: "G-SMZ33Z2M2T"
  };
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const githubProvider = new firebase.auth.GithubAuthProvider();

  const db = firebase.firestore();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  // Login Function
  document.getElementById('login-btn').addEventListener('click', () => {
    console.log("Login button clicked");

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // Validate email format
    if (!emailRegex.test(email)) {
      console.error("Invalid email format");
      // display an error message to the user
      alert("Invalid email format");
      return;
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("User signed in:", userCredential.user);
      })
      .catch((error) => {
        console.error("Error signing in:", error.message);
      });
  });
  
  // Function to check if the password is strong
  function isStrongPassword(password) {
  // Define password strength criteria
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigits = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Check if the password meets all criteria
  return password.length >= minLength && hasUpperCase && hasLowerCase && hasDigits && hasSpecialChars;
}

  // Sign Up Function
  document.getElementById('signup-btn').addEventListener('click', () => {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    // Validate email format
    if (!emailRegex.test(email)) {
    console.error("Invalid email format");
    // display an error message to the user
    alert("Invalid email format");
    return;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      alert('Passwords do not match');
      return;
    }

    // Check if the password is strong
    if (!isStrongPassword(password)) {
    console.error('Password is not strong enough');
    // display an error message to the user
    alert('Password is not strong enough. At least 8 characters, 1 uppercase, 1 lowercase, 1 digit, 1 special character.');
    return;
  }
    
  auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('User signed up:', userCredential.user);
        alert('Successfully signed up!')
      })
      .catch((error) => {
        console.error('Error signing up:', error.message);
        alert('Error: ', error.message);
      });
  });

  