export class AppController {
    constructor(authModel, gameModel, view) {
        this.authModel = authModel;
        this.gameModel = gameModel;
        this.view = view;

        // Enlazamos los eventos de la vista con las funciones del controlador
        this.view.bindLogin(this.handleLogin.bind(this));
        this.view.bindLogout(this.handleLogout.bind(this));
        this.view.bindAddGame(this.handleAddGame.bind(this));
        this.view.bindDeleteGame(this.handleDeleteGame.bind(this));

        this.init();
    }

    // Comprueba el estado inicial: si hay token, muestra la app y carga juegos.
    init() {
        const loggedIn = this.authModel.isLoggedIn();
        this.view.toggleScreens(loggedIn);
        if (loggedIn) {
            this.loadAndRenderGames();
        }
    }

    // Gestión del Login
    async handleLogin(email, password) {
        try {
            await this.authModel.login(email, password);
            this.view.toggleScreens(true);
            await this.loadAndRenderGames();
        } catch (err) {
            alert("Fallo al iniciar sesión: " + err.message);
        }
    }

    // Gestión del Logout
    handleLogout() {
        this.authModel.logout();
        this.view.toggleScreens(false);
    }

    // Carga los juegos del servidor y le pide a la vista que los dibuje
    async loadAndRenderGames() {
        try {
            // Mostramos un mensaje de carga opcional directamente en el grid
            this.view.grid.innerHTML = '<p style="color: var(--primary);">Cargando colección...</p>';
            
            const games = await this.gameModel.getAll();
            console.log("Juegos recibidos:", games);
            this.view.render(games);
        } catch (err) {
            console.error("Error cargando juegos:", err);
            // Si el error es de autorización (token expirado), cerramos sesión
            if (err.message.includes("autorizado")) {
                this.handleLogout();
            }
        }
    }

    // Añadir un nuevo juego
    async handleAddGame(gameData) {
        try {
            await this.gameModel.add(gameData);
            await this.loadAndRenderGames();
        } catch (err) {
            alert("Error al añadir: " + err.message);
        }
    }

    // Eliminar un juego
    async handleDeleteGame(id) {
        try {
            if (confirm("¿Seguro que quieres eliminar este juego?")) {
                await this.gameModel.remove(id);
                await this.loadAndRenderGames();
            }
        } catch (err) {
            alert("Error al eliminar: " + err.message);
        }
    }
}