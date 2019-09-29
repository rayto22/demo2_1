class ModelFilter{
  constructor(contr) {
    this.controller = contr;

    window.addEventListener('unload', () => this.saveFilterStatus());

    this.initFilterStatus();
  }

  initFilterStatus() {
    // localStorage.removeItem('filterStatus');
    if(Boolean(localStorage.getItem('filterStatus')) === false){
      localStorage.setItem('filterStatus', JSON.stringify(
        {
          category: {
            type: 'category',
            status: 'cancel',
            funName: 'filterByCateg'
          },
          name: {
            type: 'name',
            status: 'cancel',
            funName: 'filterByName'
          }
        }
      ));
    }
    this.filterStatus = JSON.parse(localStorage.getItem('filterStatus'));

  }

  setFilterStatus(filterName, state){
    console.log(this.filterStatus);
    this.filterStatus[filterName].status = state;
  }

  saveFilterStatus(){
    localStorage.setItem('filterStatus', JSON.stringify(this.filterStatus));
  }

  filterProductList(){
    let prodArr = JSON.parse(localStorage.getItem('productList'));
    this.controller.clearCancelButtonsDiv();

    Object.values(this.filterStatus).forEach((filter) => {
      if(filter.status !== 'cancel'){
        prodArr = this[filter.funName](prodArr);
        this.controller.renderCancelButton(filter.type);
      }
    });

    return prodArr;
  }

  filterByName(prodArr){
    const searchValue = this.controller.getSearchValue();
    return prodArr.filter((prodObj) => {
      return prodObj.name.toLowerCase().indexOf(searchValue) !== -1
    })
  }

  filterByCateg(prodArr){
    const categName = this.filterStatus.category.status;
    return prodArr.filter((prodObj) => {
      return prodObj.type.toLowerCase() === categName;
    })
  }
}

export { ModelFilter };