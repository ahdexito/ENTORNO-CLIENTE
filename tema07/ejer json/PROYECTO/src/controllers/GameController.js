export class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Suscripción a eventos de la vista
        this.view.bindAddGame(this.handleAddGame.bind(this));
        this.view.bindDeleteGame(this.handleDeleteGame.bind(this));

        // Carga inicial
        this.init();
    }

    async init() {
        await this.refresh();
    }

    async refresh() {
        this.view.grid.innerHTML = '<p style="color: #00ce7c;">Conectando con la base de datos...</p>';
        const games = await this.model.getAll();
        this.view.render(games);
    }

    async handleAddGame(game) {
        await this.model.add(game);
        this.refresh();
    }

    async handleDeleteGame(id) {
        await this.model.remove(id);
        this.refresh();
    }
}