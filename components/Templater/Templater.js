class Templater{
  constructor(){
    if (!!Templater.instance) {
      return Templater.instance;
    }
    Templater.instance = this;

    this.eventsStorage = {};

    this.templatePathColl = {
      'cancelBtnTemplate': '/components/filter/cancelButtonTemplate.html',
      'categoryTemplate': '/components/filter/categoryTemplate.html',

      'sortBtnTemplate': '/components/sort/sortBtnTemplate.html',

      'productCardTemplate': '/components/product/productCardTemplate.html'
    };

    return this;
  }

  initTemplate(templName, arrOfData, dom, eventObj, containerFlag) {
    return fetch(this.templatePathColl[templName]).then(l=>l.text())
    .then(t=>{
      this.template = t;
      this.render(arrOfData, dom, containerFlag);
      if(Boolean(eventObj) === true) {
        this.hangEvents(eventObj);
      }
    });
  }

  clearContainer(dom) {
    dom.innerHTML = '';
  }

  render(arrOfData, dom, containerFlag) {
    let answ = this.template;

    const result = arrOfData.reduce((str, obj) => {
      return str + Object.entries(obj).reduce((domEl, keyValueArr) => {
        const re = new RegExp(`{{ ${keyValueArr[0]} }}`,"g");
        return domEl.replace(re, keyValueArr[1]);
      }, answ);
    }, "");

    if(containerFlag === true){
      const container = document.createElement('span');
      container.innerHTML += result;
      dom.appendChild(container);
    } else {
      dom.innerHTML += result;
    }
    
  }

  hangEvents(eventObj) {

    if(Boolean(this.eventsStorage[eventObj.name]) === true) {
      this.eventsStorage[eventObj.name].forEach(el => {
        el.domEl.removeEventListener(el.eventName, el.funName);
      });
      this.eventsStorage[eventObj.name].length = 0;
    } else {
      this.eventsStorage[eventObj.name] = [];
    }

    this.eventsStorage[eventObj.name] = eventObj.one.map(ev => {
      ev.domEl = document.querySelector(ev.selector);
      ev.domEl.addEventListener(ev.eventName, ev.funName);
      return ev;
    });

    eventObj.all.forEach(ev => {
      let coll = document.querySelector(ev.selector);
      [...coll].forEach(elDOM => {
        elDOM.addEventListener(ev.eventName, ev.funName);
      });
    });
  }
}

export { Templater };