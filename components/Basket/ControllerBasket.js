import { ModelBasket } from '../Basket/ModelBasket.js';
import { ViewBasket } from '../Basket/ViewBasket.js';


class ControllerBasket{
  constructor(mainContr) {
    this.mainController = mainContr;
    this.model = new ModelBasket(this);
    this.view = new ViewBasket(this);
  }
  
}

export { ControllerBasket }