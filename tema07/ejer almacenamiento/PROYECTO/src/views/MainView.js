export class MainView {
    constructor() {
        this.loginSection = document.getElementById('login-section');
        this.appSection = document.getElementById('app-section');
        this.loginForm = document.getElementById('login-form');
        this.userDisplay = document.getElementById('user-email');
        this.logoutBtn = document.getElementById('logout-btn');
        this.grid = document.getElementById('game-grid');
    }

    render(games) {
        this.grid.innerHTML = '';

        if (games.length === 0) {
            this.grid.innerHTML = '<p>No hay juegos en tu colección.</p>';
            return;
        }

        games.forEach(game => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `
                <h3>${game.title}</h3>
                <p>Plataforma: <strong>${game.platform}</strong></p>
                <button class="delete-btn" data-id="${game.id}">Eliminar</button>
            `;
            this.grid.appendChild(card);
        });
    }

    bindAddGame(handler) {
        const form = document.getElementById('game-form');
        form.addEventListener('submit', e => {
            e.preventDefault();
            const gameData = {
                title: document.getElementById('game-title').value,
                platform: document.getElementById('game-platform').value
            };
            handler(gameData);
            form.reset();
        });
    }

    bindDeleteGame(handler) {
        this.grid.addEventListener('click', e => {
            if (e.target.classList.contains('delete-btn')) {
                const id = e.target.dataset.id;
                handler(id);
            }
        });
    }

    toggleScreens(isLoggedIn) {
        if (isLoggedIn) {
            this.loginSection.style.display = 'none';
            this.appSection.style.display = 'block';
            this.userDisplay.textContent = localStorage.getItem("userEmail");
        } else {
            this.loginSection.style.display = 'block';
            this.appSection.style.display = 'none';
        }
    }

    bindLogin(handler) {
        this.loginForm.addEventListener('submit', e => {
            e.preventDefault();
            const email = e.target.email.value;
            const pass = e.target.password.value;
            handler(email, pass);
        });
    }

    bindLogout(handler) {
        this.logoutBtn.addEventListener('click', handler);
    }
}