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
        navElDOMcoll: document.querySelectorAll('.nav_category')
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
    [...this.DOMStorage.category.navElDOMcoll].forEach((categ) => {
      categ.addEventListener('click', () => this.initFilterByCateg(categ.getAttribute('data-categ-name')));
    });

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
      this.controller.setFilterProperty(type, 'min', Number(this.DOMStorage[type].minInputDOM.value.replace(/\D/g, "")) || 0);
      this.controller.setFilterProperty(type, 'max', Number(this.DOMStorage[type].maxInputDOM.value.replace(/\D/g, "")) || Infinity);
    }
    this.controller.rebuildProductList();
  }

  clearCancelButtonsDiv() {
    this.DOMStorage.cancelFilter.divDOM.innerHTML = "";
  }

  renderCancelButton(type) {
    const newDiv = document.createElement('span');
    this.DOMStorage.cancelFilter.divDOM.appendChild(newDiv);
    newDiv.innerHTML += `<a class="button is-rounded ${this.cancelBtnObj[type].className}">${this.cancelBtnObj[type].btnName} <i class="far fa-times-circle fa-lg"></i></a>`;
    document.querySelector(`.${this.cancelBtnObj[type].className}`).addEventListener('click', () => this[this.cancelBtnObj[type].funName]('cancel', type));
  }

  renderAdditionalFilter(categName) {
    
    switch (categName) {
      case 'cancel': {
        this.DOMStorage.additionalFilter.divDOM.innerHTML = '';
        break;
      }
      case 'cat': {
        this.DOMStorage.additionalFilter.divDOM.innerHTML = `
        <div class="additional_filter">
        <div class="box">

          <h5>Additional filters</h5>
          <hr></hr>

          <h6>Color</h6>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
            <label class="form-check-label" for="defaultCheck1">
              Some property 1
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
            <label class="form-check-label" for="defaultCheck1">
              Some property 2
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
            <label class="form-check-label" for="defaultCheck1">
              Some property 3
            </label>
          </div>

          <hr></hr>
          <h6>Property choise 2</h6>

          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
            <label class="form-check-label" for="exampleRadios1">
              Some property 1
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
            <label class="form-check-label" for="exampleRadios2">
              Some property 2
            </label>
          </div>

        </div>
      </div>`;
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