import {MainController} from './controllers/MainController'
import {MainModel} from './models/MainModel'
import {MainView} from './views/MainView'
import {MCFunction} from 'sandstone'

class MVCMain {
    public static main():void {
        MainController.defineControllers();
        MainModel.defineModels();
        MainView.defineViews();
    }
}

MVCMain.main();