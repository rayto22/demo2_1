import { BasketModel } from '../basket/basketModel.js';
import { BasketView } from '../basket/basketView.js';


class BasketController{
  constructor(mainContr) {
    this.mainController = mainContr;
    this.model = new BasketModel(this);
    this.view = new BasketView(this);
  }
  
  initBasket() {
    this.model.initBasket();
  }

}

export { BasketController }