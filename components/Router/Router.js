import { ControllerProduct } from '../Product/ControllerProduct.js';
import { ControllerFilter } from '../Filter/ControllerFilter.js';
import { ControllerSort } from '../Sort/ControllerSort.js';


class Router {
  constructor() {
      if (!!Router.instance) {
          return Router.instance;
      }

      this.product = new ControllerProduct(this);
      this.filter = new ControllerFilter(this);
      this.sort = new ControllerSort(this);

      Router.instance = this;

      return this;
  }
}

export { Router };