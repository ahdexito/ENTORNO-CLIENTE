export class GameModel {
    constructor() {
        this.apiURL = "http://localhost:3000/games";
    }

    async getAll() {
        const token = localStorage.getItem("token");
        console.log("Token enviado:", token);
        const response = await fetch("http://localhost:3000/games", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error("Error al obtener datos");
        return await response.json();
    }

    async add(game) {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/games", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(game)
        });
        return await response.json();
    }

    async remove(id) {
        const token = localStorage.getItem("token");
        await fetch(`${this.apiURL}/${id}`, { 
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
    }
}