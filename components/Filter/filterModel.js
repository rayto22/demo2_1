class FilterModel{
  constructor() {
    this.cancelButtonsArr = [];
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
  }

  getCategoriesList() {
    return new Set(JSON.parse(localStorage.getItem('productList')).map(prodObj => prodObj.type));
  }

  setFilterProperty(filterName, property, val){
    this.filterStatus[filterName][property] = val;
  }

  saveFilterStatus(){
    localStorage.setItem('filterStatus', JSON.stringify(this.filterStatus));
  }

  filterProductList(prodArr){
    this.cancelButtonsArr.length = 0;
    Object.values(this.filterStatus).forEach((filter) => {
      if(filter.status !== 'cancel'){
        prodArr = this[filter.funName](prodArr, filter);
        this.cancelButtonsArr.push(filter.type);
      }
      return false;
    });
    return prodArr;
  }

  filterByName(prodArr){
    return prodArr.filter((prodObj) => {
      return prodObj.name.toLowerCase().indexOf(this.filterStatus.name.lastValue) !== -1;
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

  getCancelButtonsArr() {
    return this.cancelButtonsArr;
  }
}

export { FilterModel };