import { ControllerProduct } from '../Product/ControllerProduct.js';
import { ControllerFilter } from '../Filter/ControllerFilter.js';
import { ControllerSort } from '../Sort/ControllerSort.js';


class MainController {
  constructor() {
      if (!!MainController.instance) {
          return MainController.instance;
      }

      this.product = new ControllerProduct(this);
      this.filter = new ControllerFilter(this);
      this.sort = new ControllerSort(this);

      MainController.instance = this;

      return this;
  }
}

export { MainController };