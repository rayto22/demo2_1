import { ModelFilter } from '../Filter/ModelFilter.js';
import { ViewFilter } from '../Filter/ViewFilter.js';


class ControllerFilter{
  constructor(mainContr) {
    this.mainController = mainContr;
    this.model = new ModelFilter(this);
    this.view = new ViewFilter(this);
  }

  beginFilterProcess() {
    this.model.beginFilterProcess();
  }

  buildFilteredProductList(prodArr) {
    this.mainController.product.buildProductList(prodArr);
  }

  getSearchValue(){
    return this.view.getSearchValue();
  }

  setFilterStatus(name, state){
    this.model.setFilterStatus(name, state);
  }
}

export { ControllerFilter }