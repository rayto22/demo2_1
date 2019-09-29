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
      }
    }

    this.serchInputDOM = document.querySelector('.search_input');
    this.categNavDOMcoll = document.querySelectorAll('.nav_category');
    this.cancelButtonsDivDOM = document.querySelector('.cancel_buttuns_div');

    [...this.categNavDOMcoll].forEach((categ) => {
      categ.addEventListener('click', () => this.initFilterByCateg(categ.getAttribute('data-categ-name')));
    });
    this.serchInputDOM.addEventListener('keyup', () => this.initFilterByName());
  }

  initFilterByName(arg) {
    console.log(1);
    if(this.serchInputDOM.value !== '' && arg !== 'cancel'){
      this.controller.setFilterStatus("name", true);
    } else {
      this.serchInputDOM.value = '';
      this.controller.setFilterStatus("name", "cancel");
    }
    this.controller.rebuildProductList();
  }

  initFilterByCateg(categName) {
    this.controller.setFilterStatus("category", categName);
    this.controller.rebuildProductList();
  }

  clearCancelButtonsDiv() {
    this.cancelButtonsDivDOM.innerHTML = "";
  }

  renderCancelButton(type) {
    const newDiv = document.createElement('span');
    this.cancelButtonsDivDOM.appendChild(newDiv);
    newDiv.innerHTML += `<a class="button is-rounded ${this.cancelBtnObj[type].className}">${this.cancelBtnObj[type].btnName} <i class="far fa-times-circle fa-lg"></i></a>`;
    document.querySelector(`.${this.cancelBtnObj[type].className}`).addEventListener('click', () => this[this.cancelBtnObj[type].funName]('cancel'));
  }

  getSearchValue() {
    return this.serchInputDOM.value;
  }

}

export { ViewFilter };