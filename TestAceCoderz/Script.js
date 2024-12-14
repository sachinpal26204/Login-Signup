function togglePassword(...ids) {
    ids.forEach(id => {
        const field = document.getElementById(id);
        field.type = field.type === 'password' ? 'text' : 'password';
    });
}

function switchForm(form) {
    document.getElementById('login-container').style.display = form === 'login' ? 'block' : 'none';
    document.getElementById('sign-up-container').style.display = form === 'sign-up' ? 'block' : 'none';
}

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;

    const email = document.getElementById('login-email');
    const password = document.getElementById('login-password');

    if (!email.value.includes('@')) {
        valid = false;
        document.getElementById('login-email-error').textContent = 'Invalid email format';
    } else {
        document.getElementById('login-email-error').textContent = '';
    }

    if (!password.value) {
        valid = false;
        document.getElementById('login-password-error').textContent = 'Password cannot be empty';
    } else {
        document.getElementById('login-password-error').textContent = '';
    }

    const storedUser = JSON.parse(localStorage.getItem(email.value));
    if (!storedUser || storedUser.password !== password.value) {
        valid = false;
        alert('Invalid credentials!');
    }

    if (valid) alert('Login successful!');
});

document.getElementById('sign-up-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('signup-name');
    const email = document.getElementById('signup-email');
    const password = document.getElementById('signup-password');
    const confirmPassword = document.getElementById('signup-confirm-password');

    if (!name.value.trim()) {
        valid = false;
        document.getElementById('signup-name-error').textContent = 'Full Name cannot be empty';
    } else {
        document.getElementById('signup-name-error').textContent = '';
    }

    if (!email.value.includes('@')) {
        valid = false;
        document.getElementById('signup-email-error').textContent = 'Invalid email format';
    } else {
        document.getElementById('signup-email-error').textContent = '';
    }

    if (password.value.length < 8) {
        valid = false;
        document.getElementById('signup-password-error').textContent = 'Password must be at least 8 characters long';
    } else {
        document.getElementById('signup-password-error').textContent = '';
    }

    if (password.value !== confirmPassword.value) {
        valid = false;
        document.getElementById('signup-confirm-password-error').textContent = 'Passwords do not match';
    } else {
        document.getElementById('signup-confirm-password-error').textContent = '';
    }

    if (valid) {
        const userData = {
            name: name.value,
            password: password.value
        };
        localStorage.setItem(email.value, JSON.stringify(userData));
        alert('Sign-Up successful! User data stored in localStorage.');
    }
});
