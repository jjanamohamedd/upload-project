var users = [];

// DOM Elements
const registerView = document.getElementById('registerView');
const loginView = document.getElementById('loginView');
const homeView = document.getElementById('homeView');
const userNameDisplay = document.getElementById('userName');


document.getElementById('toLogin').addEventListener('click', () => {
    showView('loginView');
});
document.getElementById('toRegister').addEventListener('click', () => {
    showView('registerView');
});
document.getElementById('logoutButton').addEventListener('click', () => {
    alert('Logged out successfully!');
    showView('loginView');
});


function showView(viewId) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    document.getElementById(viewId).classList.add('active');
}

document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();

    const nameError = document.getElementById('registerNameError');
    const emailError = document.getElementById('registerEmailError');
    const passwordError = document.getElementById('registerPasswordError');

    // Reset errors
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    passwordError.style.display = 'none';

    let valid = true;

    if (name === '') {
        nameError.textContent = 'Name is required.';
        nameError.style.display = 'block';
        valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = 'Invalid email.';
        emailError.style.display = 'block';
        valid = false;
    } else if (users.some(user => user.email === email)) {
        emailError.textContent = 'Email already exists.';
        emailError.style.display = 'block';
        valid = false;
    }
    if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters.';
        passwordError.style.display = 'block';
        valid = false;
    }

    if (valid) {
        users.push({ name, email, password });
        alert('Registration successful! Please login.');
        showView('loginView');
    }
});

// Login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    const emailError = document.getElementById('loginEmailError');
    const passwordError = document.getElementById('loginPasswordError');

    emailError.style.display = 'none';
    passwordError.style.display = 'none';

    const user = users.find(user => user.email === email);

    if (!user) {
        emailError.textContent = 'Email not registered.';
        emailError.style.display = 'block';
    } else if (user.password !== password) {
        passwordError.textContent = 'Incorrect password.';
        passwordError.style.display = 'block';
    } else {
        userNameDisplay.textContent = user.name;
        showView('homeView');
    }
});
