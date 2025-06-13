document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const usuario = document.getElementById('usuario').value;
            const password = document.getElementById('password').value;

            const response = await fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario, password })
            });

            const mensaje = await response.text();
            alert(mensaje);
            if (response.ok) {
                window.location.href = 'session.html';
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const usuario = document.getElementById('usuario').value;
            const password = document.getElementById('password').value;

            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario, password })
            });

            const mensaje = await response.text();
            alert(mensaje);
            if (response.ok) {
                window.location.href = 'MENU.html';
            }
        });
    }
});
