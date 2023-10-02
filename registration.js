document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginMessage = document.getElementById("login-message");

    // Hard-coded credentials (in a real-world scenario, this should come from a server or database)
    const validEmail = "user@example.com";
    const validPassword = "password123";

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const enteredEmail = emailInput.value;
        const enteredPassword = passwordInput.value;

        if (enteredEmail === validEmail && enteredPassword === validPassword) {
            // Successful login
            loginMessage.classList.remove("error");
            loginMessage.classList.add("success");
            loginMessage.textContent = "Login successful. Redirecting...";

            // Simulate a redirect after a short delay
            setTimeout(() => {
                window.location.href = "Career.html"; // Redirect to the welcome page
            }, 1500);
        } else {
            // Invalid credentials
            loginMessage.classList.remove("success");
            loginMessage.classList.add("error");
            loginMessage.textContent = "Invalid email or password. Please try again.";
        }
    });
});
