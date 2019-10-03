import { Templater } from '../templater/templater.js';

class FilterView{
  constructor(contr) {
    this.controller = contr;
    this.templater = new Templater;

    this.cancelBtnObj = {
      category: {
        btnName: 'Category',
        className: 'nav_category_cancel',
        funName: 'initFilterByCateg'
      },
      name: {
        btnName: 'Search',
        className: 'search_cancel',
        funName: 'initFilterByName'
      },
      price: {
        btnName: 'Price',
        className: 'price_filter_cancel',
        funName: 'initFilterByPriceOrQuantity'
      },
      quantity: {
        btnName: 'Quantity',
        className: 'quantity_filter_cancel',
        funName: 'initFilterByPriceOrQuantity'
      }
    };

    this.domStorage = {
      name: {
        inputDOM: document.querySelector('.search_input')
      },
      category: {
        divDOM: document.querySelector('.categories_div')
      },
      price: {
        minInputDOM: document.querySelector('.filter_price_min'),
        maxInputDOM: document.querySelector('.filter_price_max')
      },
      quantity: {
        minInputDOM: document.querySelector('.filter_quantity_min'),
        maxInputDOM: document.querySelector('.filter_quantity_max')
      },
      additionalFilter: {
        divDOM: document.querySelector('.additional_filter')
      },
      cancelFilter: {
        divDOM: document.querySelector('.cancel_buttuns_div')
      } 
    };

    this.hangEvents();
  }

  hangEvents(){
    // Search
    this.domStorage.name.inputDOM.addEventListener('keyup', () => this.controller.initFilterByName());
    // Price
    this.domStorage.price.minInputDOM.addEventListener('keyup', () => this.controller.initFilterByPriceOrQuantity(undefined, 'price'));
    this.domStorage.price.maxInputDOM.addEventListener('keyup', () => this.controller.initFilterByPriceOrQuantity(undefined, 'price'));
    // Quantity
    this.domStorage.quantity.minInputDOM.addEventListener('keyup', () => this.controller.initFilterByPriceOrQuantity(undefined, 'quantity'));
    this.domStorage.quantity.maxInputDOM.addEventListener('keyup', () => this.controller.initFilterByPriceOrQuantity(undefined, 'quantity'));
  }

  clearCancelButtonsDiv() {
    this.templater.resetContainer(this.domStorage.cancelFilter.divDOM, 'cancelButtonFilter');
  }

  renderCancelButton(type) {
    let arrOfData = [
      {
        className: this.cancelBtnObj[type].className, 
        buttonName: this.cancelBtnObj[type].btnName
      }];

    let eventObj = {
      name: 'cancelButtonFilter',
      one: [{
        selector: `.${this.cancelBtnObj[type].className}`,
        eventName: 'click',
        funName: () => this.controller[this.cancelBtnObj[type].funName]('cancel', type)
      }],
      all: []}

    this.templater.initTemplate('cancelBtnTemplate', arrOfData, this.domStorage.cancelFilter.divDOM, eventObj, true);
  }

  renderCategories(categoriesList) {
    let arrOfData = [...categoriesList].map((categ) => {
      return {categName: categ, categContent: `${categ}s`};
    });

    let eventObj = {
      name: 'category',
      one: [...categoriesList].map((categ) => {
        return {
          selector: `.nav_category[data-categ-name='${categ}']`,
          eventName: 'click',
          funName: () => this.controller.initFilterByCateg(categ)
        }}),
      all: []
    };

    this.templater.initTemplate('categoryTemplate', arrOfData, this.domStorage.category.divDOM, eventObj);
  }

  renderAdditionalFilter(categName) {
    
    switch (categName) {
      case 'cancel': {
        this.domStorage.additionalFilter.divDOM.innerHTML = '';
        break;
      }
      case 'cat': {
        this.domStorage.additionalFilter.divDOM.innerHTML = 'cat'
        break;
      }
      case 'dog': {
        this.domStorage.additionalFilter.divDOM.innerHTML = 'dog';
        break;
      }
      case 'bird': {
        this.domStorage.additionalFilter.divDOM.innerHTML = 'bird';
        break;
      }
      case 'fish': {
        this.domStorage.additionalFilter.divDOM.innerHTML = 'fish';
        break;
      }     
    }
  }

  getSearchValue() {
    return this.domStorage.name.inputDOM.value;
  }

  getPriceOrQuantityMinMaxValue(type) {
    return {
      min: this.domStorage[type].minInputDOM.value,
      max: this.domStorage[type].maxInputDOM.value,
    }
  }

  setSearchValue(val) {
    this.domStorage.name.inputDOM.value = val;
  }

  setPriceOrQuantityValue(type, min, max){
    this.domStorage[type].minInputDOM.value = min;
    this.domStorage[type].maxInputDOM.value = max;
  }

}

export { FilterView };