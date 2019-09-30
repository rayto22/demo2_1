import { Templater} from '../Templater/Templater.js';

class ViewFilter{
  constructor(contr) {
    this.controller = contr;

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
        funName: 'initFilterByPriceAndQuantity'
      },
      quantity: {
        btnName: 'Quantity',
        className: 'quantity_filter_cancel',
        funName: 'initFilterByPriceAndQuantity'
      }
    };

    this.DOMStorage = {
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

    this.templatePath = {
      categories: '/components/Filter/categoriesTemplate.html',
      cancelButton: '/components/Filter/cancelButtonTemplate.html'
    };

    this.hangEvents();
  }

  hangEvents(){
    this.DOMStorage.name.inputDOM.addEventListener('keyup', () => this.initFilterByName());

    this.DOMStorage.price.minInputDOM.addEventListener('keyup', () => this.initFilterByPriceAndQuantity(undefined, 'price'));
    this.DOMStorage.price.maxInputDOM.addEventListener('keyup', () => this.initFilterByPriceAndQuantity(undefined, 'price'));

    this.DOMStorage.quantity.minInputDOM.addEventListener('keyup', () => this.initFilterByPriceAndQuantity(undefined, 'quantity'));
    this.DOMStorage.quantity.maxInputDOM.addEventListener('keyup', () => this.initFilterByPriceAndQuantity(undefined, 'quantity'));
  }

  initFilterByName(arg) {
    if(this.DOMStorage.name.inputDOM.value !== '' && arg !== 'cancel'){
      this.controller.setFilterProperty('name', 'status', true);
    } else {
      this.DOMStorage.name.inputDOM.value = '';
      this.controller.setFilterProperty('name', 'status', 'cancel');
    }
    this.controller.rebuildProductList();
  }

  initFilterByCateg(categName) {
    this.controller.setFilterProperty('category', 'status', categName);
    this.renderAdditionalFilter(categName);
    this.controller.rebuildProductList();
  }

  initFilterByPriceAndQuantity(arg, type) {
    if(arg === 'cancel'){
      this.controller.setFilterProperty(type, 'status', 'cancel');
      this.DOMStorage[type].minInputDOM.value = "0";
      this.DOMStorage[type].maxInputDOM.value = "";
    } else {
      this.controller.setFilterProperty(type, 'status', true);
      this.controller.setFilterProperty(type, 'min', Number(this.DOMStorage[type].minInputDOM.value.replace(/\D/g, '')) || 0);
      this.controller.setFilterProperty(type, 'max', Number(this.DOMStorage[type].maxInputDOM.value.replace(/\D/g, '')) || Infinity);
    }
    this.controller.rebuildProductList();
  }

  clearCancelButtonsDiv() {
    this.DOMStorage.cancelFilter.divDOM.innerHTML = "";
  }

  renderCancelButton(type) {
    let arrOfData = [
      {
        className: this.cancelBtnObj[type].className, 
        buttonName: this.cancelBtnObj[type].btnName
      }];

    let eventObj = {
      one: [{
        selector: `.${this.cancelBtnObj[type].className}`,
        eventName: 'click',
        funName: () => this[this.cancelBtnObj[type].funName]('cancel', type)
      }],
      all: []}

    new Templater(this.templatePath.cancelButton, arrOfData, this.DOMStorage.cancelFilter.divDOM, eventObj, true);
  }

  renderCategories(categoriesList) {
    let arrOfData = [...categoriesList].map((categ) => {
      return {categName: categ, categContent: `${categ}s`};
    });

    let eventObj = {
      one: [...categoriesList].map((categ) => {
        return {
          selector: `.nav_category[data-categ-name='${categ}']`,
          eventName: 'click',
          funName: () => this.initFilterByCateg(categ)
        }}),
      all: []
    };

    new Templater(this.templatePath.categories, arrOfData, this.DOMStorage.category.divDOM, eventObj);
  }

  renderAdditionalFilter(categName) {
    
    switch (categName) {
      case 'cancel': {
        this.DOMStorage.additionalFilter.divDOM.innerHTML = '';
        break;
      }
      case 'cat': {
        this.DOMStorage.additionalFilter.divDOM.innerHTML = 'cat'
        break;
      }
      case 'dog': {
        this.DOMStorage.additionalFilter.divDOM.innerHTML = 'dog';
        break;
      }
      case 'bird': {
        this.DOMStorage.additionalFilter.divDOM.innerHTML = 'bird';
        break;
      }
      case 'fish': {
        this.DOMStorage.additionalFilter.divDOM.innerHTML = 'fish';
        break;
      }     
    }
  }

  getSearchValue() {
    return this.DOMStorage.name.inputDOM.value;
  }

  setSearchValue(val) {
    this.DOMStorage.name.inputDOM.value = val;
  }

}

export { ViewFilter };