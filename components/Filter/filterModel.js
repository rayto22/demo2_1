class FilterModel{
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
            max: Infinity,
            minLastValue: '0',
            maxLastValue: ''
          },
          quantity: {
            type: 'quantity',
            status: 'cancel',
            funName: 'filterByMinMax',
            min: 0,
            max: Infinity,
            minLastValue: '0',
            maxLastValue: ''
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
    this.filterStatus.name.lastValue = this.controller.getSearchValue();
    this.filterStatus.price.minLastValue = this.filterStatus.price.min;
    this.filterStatus.price.maxLastValue = this.filterStatus.price.max !== Infinity ? this.filterStatus.price.max : '';
    this.filterStatus.quantity.minLastValue = this.filterStatus.quantity.min;
    this.filterStatus.quantity.maxLastValue = this.filterStatus.quantity.max !== Infinity ? this.filterStatus.quantity.max : '';
    
    localStorage.setItem('filterStatus', JSON.stringify(this.filterStatus));
  }

  filterProductList(prodArr){
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

export { FilterModel };