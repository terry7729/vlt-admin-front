//缓存控制
import Vue from 'vue'
import routes from '../router/list'


//keep-alive
let includes = [];
const writeInclude = arr => {
  routes.forEach(route => {
    if(route.meta && route.meta.keepAlive) {
      arr.push(route.name);
    }
  });
}
writeInclude(includes);

export const keepAlive = {
  includes,
  reset () {
    this.clear();
    writeInclude(this.includes);
  },
  remove (name) {
    const i = this.includes.indexOf(name);
    i > -1 && this.includes.splice(i, 1);
  },
  add (name) {
    const i = this.includes.indexOf(name);
    i === -1 && this.includes.push(name);
  },
  clear () {
    this.includes = [];
  }
}

//本地存储
export const storage = require('./storage').default;



export default {
  keepAlive,
  storage
}