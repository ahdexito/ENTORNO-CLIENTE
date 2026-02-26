export class GameModel {
    constructor() {
        this.apiURL = "http://localhost:3000/games";
    }

    async getAll() {
        const response = await fetch(this.apiURL);
        return await response.json();
    }

    async add(game) {
        await fetch(this.apiURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(game)
        });
    }

    async remove(id) {
        await fetch(`${this.apiURL}/${id}`, { method: 'DELETE' });
    }
}