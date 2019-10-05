import { FilterModel } from '../filter/filterModel.js';
import { FilterView } from '../filter/filterView.js';


class FilterController{
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.model = new FilterModel();
    this.view = new FilterView(this);
  }

  initFilterStatus() {
    this.model.initFilterStatus();
        
    this.renderCategories();
    this.renderMainFilter();

    this.view.setSearchValue(this.model.filterStatus.name.lastValue);
    this.view.setPriceOrQuantityValue('price', this.model.filterStatus.price.min, this.model.filterStatus.price.max);
    this.view.setPriceOrQuantityValue('quantity', this.model.filterStatus.quantity.min, this.model.filterStatus.quantity.max);
  }

  filterProductList(prodArr) {
    this.view.clearCancelButtonsDiv();
    const filteredProdArr = this.model.filterProductList(prodArr);
    const cancelButtons = this.model.getCancelButtonsArr();
    cancelButtons.forEach((buttonType) => {
      this.renderCancelButton(buttonType);
    });
    return filteredProdArr;
  }

  rebuildProductList() {
    this.eventManager.publish('request to rebuild product list');
  }

  initFilterByName(arg) {
    const searchValue = this.getSearchValue();
    this.model.setFilterProperty('name', 'lastValue', searchValue);
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
    this.renderAdditionalFilter(categName);
    this.rebuildProductList();
  }

  initFilterByPriceOrQuantity(arg, type) {
    if(arg === 'cancel'){
      this.model.setFilterProperty(type, 'status', 'cancel');
      this.view.setPriceOrQuantityValue(type, '0', '');
      this.model.setFilterProperty(type, 'min', 0);
      this.model.setFilterProperty(type, 'max', Infinity);
    } else {
      this.model.setFilterProperty(type, 'status', true);
      const minMaxValue = this.view.getPriceOrQuantityMinMaxValue(type);
      this.model.setFilterProperty(type, 'min', Number(minMaxValue.min.replace(/\D/g, '')) || 0);
      this.model.setFilterProperty(type, 'max', Number(minMaxValue.max.replace(/\D/g, '')) || Infinity);
    }
    this.rebuildProductList();
  }

  saveFilterStatus() {
    this.model.saveFilterStatus();
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

  renderCategories() {
    this.view.renderCategories(this.model.getCategoriesList());
  }

  renderMainFilter() {
    this.view.renderMainFilter();
  }

  renderAdditionalFilter(categName) {
    this.view.renderAdditionalFilter(categName);
  }

}

export { FilterController }