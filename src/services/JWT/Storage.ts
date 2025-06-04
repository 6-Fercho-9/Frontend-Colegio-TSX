class Storage {
  static TOKEN: string = "token";
  static storeToken = (token: string) => {
    localStorage.setItem(Storage.TOKEN, token);
  };

  static getStoredToken = () => {
    return localStorage.getItem(Storage.TOKEN);
  };

  static revokeToken = () => {
    return localStorage.removeItem(Storage.TOKEN);
  };
}
export default Storage;