import { AuthModel } from './models/AuthModel.js';
import { GameModel } from './models/GameModel.js';
import { MainView } from './views/MainView.js';
import { AppController } from './controllers/AppController.js';

// Inicializamos todo
const auth = new AuthModel();
const games = new GameModel();
const view = new MainView();

const app = new AppController(auth, games, view);