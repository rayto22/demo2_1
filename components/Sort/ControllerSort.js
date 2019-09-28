import { ModelSort } from '../Filter/ModelFilter.js';
import { ViewSort } from '../Filter/ViewFilter.js';


class ControllerFilter{
  constructor(router) {
    this.router = router;
    this.model = new ModelFilter(this);
    this.view = new ViewFilter(this);
  }

  beginFilterProcess() {
    this.model.beginFilterProcess();
  }

  buildFilteredProductList(prodArr) {
    this.router.product.buildProductList(prodArr);
  }

  getSearchValue(){
    return this.view.getSearchValue();
  }

  setFilterStatus(name, state){
    this.model.setFilterStatus(name, state);
  }
}

export { ControllerFilter }