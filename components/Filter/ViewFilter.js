class ViewFilter{
  constructor(contr) {
    this.controller = contr;

    this.serchInputDOM = document.querySelector('.search_input');
    this.categNavDOMcoll = document.querySelectorAll('.nav_category');

    [...this.categNavDOMcoll].forEach((categ) => {
      categ.addEventListener('click', () => this.initFilterByCateg(categ.getAttribute('data-categ-name')));
    });

    

    this.serchInputDOM.addEventListener('keyup', () => this.initFilterByName());

  }

  initFilterByName() {
    if(this.serchInputDOM.value !== ""){
      this.controller.setFilterStatus("name", true);
    } else {
      this.controller.setFilterStatus("name", "cancel");
    }
    this.controller.beginFilterProcess();
  }

  initFilterByCateg(categName){
    this.controller.setFilterStatus("category", categName);
    this.controller.beginFilterProcess();

  }

  getSearchValue() {
    return this.serchInputDOM.value;
  }

}

export { ViewFilter };