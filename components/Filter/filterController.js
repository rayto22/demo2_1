import { FilterModel } from '../filter/filterModel.js';
import { FilterView } from '../filter/filterView.js';


class FilterController{
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.model = new FilterModel(this);
    this.view = new FilterView(this);
  }

  initFilterStatus() {
    this.model.initFilterStatus();
        
    this.view.renderCategories(this.model.getCategoriesList());

    this.view.setSearchValue(this.model.filterStatus.name.lastValue);
    this.view.setPriceOrQuantityValue('price', this.model.filterStatus.price.minLastValue, this.model.filterStatus.price.maxLastValue);
    this.view.setPriceOrQuantityValue('quantity', this.model.filterStatus.quantity.minLastValue, this.model.filterStatus.quantity.maxLastValue);
  }

  filterProductList(prodArr) {
    this.view.clearCancelButtonsDiv();
    return this.model.filterProductList(prodArr);
  }

  rebuildProductList() {
    this.eventManager.publish('request to rebuild product list');
  }

  initFilterByName(arg) {
    const searchValue = this.getSearchValue();
    if(searchValue !== '' && arg !== 'cancel'){
      this.model.setFilterProperty('name', 'status', true);
    } else {
      this.view.setSearchValue('');
      this.model.setFilterProperty('name', 'status', 'cancel');
    }
    this.rebuildProductList();
  }

  initFilterByCateg(categName) {
    this.model.setFilterProperty('category', 'status', categName);
    this.view.renderAdditionalFilter(categName);
    this.rebuildProductList();
  }

  initFilterByPriceOrQuantity(arg, type) {
    if(arg === 'cancel'){
      this.model.setFilterProperty(type, 'status', 'cancel');
      this.view.setPriceOrQuantityValue(type, '0', '');
    } else {
      this.model.setFilterProperty(type, 'status', true);
      const minMaxValue = this.view.getPriceOrQuantityMinMaxValue(type);
      this.model.setFilterProperty(type, 'min', Number(minMaxValue.min.replace(/\D/g, '')) || 0);
      this.model.setFilterProperty(type, 'max', Number(minMaxValue.min.replace(/\D/g, '')) || Infinity);
    }
    this.rebuildProductList();
  }

  getSearchValue() {
    return this.view.getSearchValue();
  }

  setSearchValue(value) {
    this.view.setSearchValue(value);
  }

  clearCancelButtonsDiv() {
    this.view.clearCancelButtonsDiv();
  }

  renderCancelButton(type) {
    this.view.renderCancelButton(type);
  }

}

export { FilterController }