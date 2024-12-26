// Function to navigate to the home page
function goToHome() {
    window.location.href = "index.html"; // Redirect to the home page
}

// Function to navigate to the login page
function goToLogin(event) {
    event.preventDefault(); // Prevent the default anchor link behavior
    window.location.href = "login.html"; // Navigate to the login page
}

// Toggle between Sign In and Sign Up
document.getElementById('toggle-form-btn').addEventListener('click', function() {
    const formTitle = document.getElementById('form-title');
    const formSubmitBtn = document.getElementById('form-submit-btn');
    const toggleFormBtn = document.getElementById('toggle-form-btn');
    const confirmPasswordGroup = document.getElementById('confirm-password-group');

    // Check the current form state and toggle
    if (formSubmitBtn.textContent === 'Sign In') {
        // Switch to Sign Up
        formTitle.textContent = 'Sign Up';
        formSubmitBtn.textContent = 'Sign Up';
        toggleFormBtn.textContent = 'Sign In';
        confirmPasswordGroup.style.display = 'block'; // Show Confirm Password field
    } else {
        // Switch to Sign In
        formTitle.textContent = 'Sign In';
        formSubmitBtn.textContent = 'Sign In';
        toggleFormBtn.textContent = 'Sign Up';
        confirmPasswordGroup.style.display = 'none'; // Hide Confirm Password field
    }
});

// Handle form submission
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const isSignUp = document.getElementById('form-submit-btn').textContent === 'Sign Up';

    if (isSignUp) {
        const confirmPassword = document.getElementById('confirm-password').value;

        // Check if passwords match for sign up
        if (password !== confirmPassword) {
            document.getElementById('error-message').textContent = 'Passwords do not match!';
            return;
        }

        // Send Sign Up request to the server
        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, confirmPassword }), // Include confirmPassword
            });

            const data = await response.json();
            document.getElementById('error-message').textContent = data.message;

            if (response.ok) {
                // Redirect to the dashboard after successful sign-up
                window.location.href = "dashboard.html"; // Replace with your actual dashboard page
            }

            // Clear the form
            document.getElementById('loginForm').reset();
            document.getElementById('confirm-password-group').style.display = 'none'; // Hide Confirm Password field

        } catch (error) {
            document.getElementById('error-message').textContent = 'Error signing up!';
            console.error('Sign Up Error:', error);
        }
    } else {
        // Handle Sign In logic here
        try {
            const response = await fetch('/login', { // Corrected endpoint to /login
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }), // No confirmPassword needed here
            });

            const data = await response.json();
            document.getElementById('error-message').textContent = data.message;

            if (response.ok) {
                // Redirect to the dashboard after successful sign-in
                window.location.href = "dashboard.html"; // Replace with your actual dashboard page
            }

            // Clear the form
            document.getElementById('loginForm').reset();
            document.getElementById('confirm-password-group').style.display = 'none'; // Hide Confirm Password field

        } catch (error) {
            document.getElementById('error-message').textContent = 'Error signing in!';
            console.error('Sign In Error:', error);
        }
    }
});
