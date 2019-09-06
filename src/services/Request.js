const API_KEY = process.env.VUE_APP_TRELLO_KEY;
const TOKEN = process.env.VUE_APP_TRELLO_OAUTH_TOKEN;
const BASE_ROUTE = 'https://api.trello.com/1/';


class Request {
  constructor(endpoint, args = {}) {
    this.endpoint = endpoint;
    this.args = args;
    this.requestUrl = '';

    this._setRequestUrl();
  }

  /**
   * Adds authentication values to the request parameters and then sets the request endpoint URL.
   *
   * @param {object} args Existing parameters for the request.
   *
   * @return void
   */
  _setRequestUrl() {
    this.args.key = API_KEY;
    this.args.token = TOKEN;
    const query = Object.keys(this.args).map(key => `${key}=${this.args[key]}`).join('&');
    this.requestUrl = `${BASE_ROUTE}${this.endpoint}?${query}`;
  }

  /**
   * Perform a GET request on the API.
   *
   * @return json data from the endpoint, or an error if there was a problem.
   */
  async get() {
    if ('' === this.requestUrl) {
      throw new Error('No request URL is set.');
    }

    try {
      const response = await fetch(this.requestUrl);
      return response.json();
    } catch (error) {
      console.error('Error in Request.get()');
      throw error;
    }
  }

  /**
   * Perform a PUT request on the API.
   *
   * @return json data from the endpoint, or an error if there was a problem.
   */
  async put() {
    if ('' === this.requestUrl) {
      throw new Error('No request URL is set.');
    }

    try {
      const response = await fetch(this.requestUrl, {
        method: 'PUT',
      });
      return response.json();
    } catch (error) {
      console.error('Error in Request.put()');
      throw error;
    }
  }
}

export default Request;
