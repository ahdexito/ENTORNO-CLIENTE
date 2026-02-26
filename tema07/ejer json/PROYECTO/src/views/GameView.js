export class GameView {
    constructor() {
        this.grid = document.getElementById('game-grid');
        this.form = document.getElementById('game-form');
        this.titleInput = document.getElementById('game-title');
        this.platformInput = document.getElementById('game-platform');
    }

    render(games) {
        this.grid.innerHTML = '';
        games.forEach(game => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.innerHTML = `
                <h3>${game.title}</h3>
                <p>Plataforma: ${game.platform}</p>
                <button class="delete-btn" data-id="${game.id}">Eliminar</button>
            `;
            this.grid.appendChild(card);
        });
    }

    bindAddGame(handler) {
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            const game = {
                title: this.titleInput.value,
                platform: this.platformInput.value
            };
            if (game.title) {
                handler(game);
                this.form.reset();
            }
        });
    }

    bindDeleteGame(handler) {
        this.grid.addEventListener('click', e => {
            if (e.target.classList.contains('delete-btn')) {
                handler(e.target.dataset.id);
            }
        });
    }
}