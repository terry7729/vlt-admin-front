export default {
  set (key, data) {
    let _data = typeof data === "object" ? JSON.stringify(data) : data;
    localStorage.setItem(key, _data);
  },
  get (key) {
    let data = localStorage.getItem(key), result;
    if (typeof data === "string") {
      try {
        result = JSON.parse(data);
      } catch (err) {
        result = data;
      }
      return result;
    }
    return false;
  },
  remove (key) {
    if (typeof key === 'string') {
      localStorage.removeItem(key);
    } else if (typeof key === 'object') {
      if (key.excludes) {
        for (let i in localStorage) {
          if (key.excludes.indexOf(i) < 0) {
            localStorage.removeItem(i);
          }
        }
      }
      if (key.includes) {
        for (let i in localStorage) {
          if (key.excludes.indexOf(i) >= 0) {
            localStorage.removeItem(i);
          }
        }
      }
    }
  },
  clear () {
    localStorage.clear();
  }
}