class Storage {
  private _token = localStorage.getItem('token');

  get token() {
    try {
      return this._token;
    } catch (error) {
      return null;
    }
  }

  clearToken() {
    localStorage.removeItem('token');
    this._token = null;
  }
}

export default new Storage();
