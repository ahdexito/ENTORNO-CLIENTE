export class AuthModel {
    constructor() {
        this.apiURL = "http://localhost:3000";
    }

    async login(email, password) {
        const response = await fetch(`${this.apiURL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData || "Error en el login");
        }

        const data = await response.json();
        
        // REQUISITO: Almacenamiento correcto de la sesión
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("userEmail", data.user.email);
        
        return data.user;
    }

    logout() {
        // REQUISITO: Cierre de sesión (eliminar token)
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
    }

    isLoggedIn() {
        return !!localStorage.getItem("token");
    }

    getAuthHeader() {
        const token = localStorage.getItem("token");
        // REQUISITO: Cabecera Authorization: Bearer <token>
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }
}