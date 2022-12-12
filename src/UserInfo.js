//import FormValidator from './FormValidator.js';

export default class UserInfo {
  constructor(selectorName, selectorAbout) {
    this._name = document.querySelector(selectorName);
    this._about = document.querySelector(selectorAbout);
  };

  getUserInfo() {
    const userInfo = {
      name: this._name,
      about: this._about
    }

    return userInfo;
  };

  setUserInfo(name, about) {
    this._name.textContent = name;
    this._about.textContent = about;
  };

}
