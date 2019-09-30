class ModelFilter{
  constructor(contr) {
    this.controller = contr;

    window.addEventListener('unload', () => this.saveFilterStatus());
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
            funName: 'filterByName',
            lastValue: ''
          },
          price: {
            type: 'price',
            status: 'cancel',
            funName: 'filterByMinMax',
            min: 0,
            max: Infinity
          },
          quantity: {
            type: 'quantity',
            status: 'cancel',
            funName: 'filterByMinMax',
            min: 0,
            max: Infinity
          }
        }
      ));
    }
    this.filterStatus = JSON.parse(localStorage.getItem('filterStatus'));
    this.controller.setSearchValue(this.filterStatus.name.lastValue);
  }

  setFilterProperty(filterName, property, val){
    console.log(this.filterStatus);
    this.filterStatus[filterName][property] = val;
    console.log(this.filterStatus);
  }

  saveFilterStatus(){
    this.filterStatus.name.lastValue = this.controller.getSearchValue();
    localStorage.setItem('filterStatus', JSON.stringify(this.filterStatus));
  }

  filterProductList(){
    let prodArr = JSON.parse(localStorage.getItem('productList'));
    this.controller.clearCancelButtonsDiv();

    Object.values(this.filterStatus).forEach((filter) => {
      if(filter.status !== 'cancel'){
        prodArr = this[filter.funName](prodArr, filter);
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

  filterByMinMax(prodArr, filterData){
    const filterType = filterData.type;
    return prodArr.filter((prodObj) => {
        return prodObj[filterType] >= filterData.min && prodObj[filterType] <= filterData.max;
    })
  }
}

export { ModelFilter };