class ModelFilter{
  constructor(contr) {
    this.controller = contr;
    this.initFilterStatus();
    window.addEventListener('unload', () => this.saveFilterStatus());
  }

  setFilterStatus(filterName, state){
    console.log(this.filterStatus);
    this.filterStatus[filterName].status = state;
  }

  initFilterStatus() {
    // localStorage.removeItem('filterStatus');
    if(Boolean(localStorage.getItem('filterStatus')) === false){
      localStorage.setItem('filterStatus', JSON.stringify(
        {
          name: {
            status: "cancel",
            funName: 'filterByName'
          },
          category: {
            status: "cancel",
            funName: 'filterByCateg'
          }
        }
      ));
    }
    this.filterStatus = JSON.parse(localStorage.getItem('filterStatus'));
  }

  saveFilterStatus(){
    localStorage.setItem('filterStatus', JSON.stringify(this.filterStatus));
  }

  beginFilterProcess(){
    let prodArr = JSON.parse(localStorage.getItem('productList'));

    Object.values(this.filterStatus).forEach((filter) => {
      if(filter.status !== "cancel"){
        console.log(prodArr, filter.status);
        prodArr = this[filter.funName](prodArr);
      }
    });
    console.log(prodArr);
    this.controller.buildFilteredProductList(prodArr);
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
      console
      return prodObj.type.toLowerCase() === categName;
    })
  }
}

export { ModelFilter };