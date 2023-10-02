document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registration-form");
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const declaration = document.getElementById("declaration");
    const successMessage = document.querySelector(".success");
    const errorMessage = document.querySelector(".error");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        errorMessage.innerHTML = "";
        successMessage.innerHTML = "";

        if (password.value !== confirmPassword.value) {
            errorMessage.innerHTML = "Passwords do not match";
            return;
        }

        if (!declaration.checked) {
            errorMessage.innerHTML = "Please accept the terms and conditions";
            return;
        }

        // You can add more validation here as needed

        // If all validations pass, you can submit the form here
        successMessage.innerHTML = "Registration successful!";
        form.reset();
    });

    document.getElementById("reset-button").addEventListener("click", function () {
        errorMessage.innerHTML = "";
        successMessage.innerHTML = "";
    });
});
