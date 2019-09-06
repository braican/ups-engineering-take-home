
const BASE_ROUTE = 'https://api.trello.com/1/boards/';
const API_KEY = process.env.VUE_APP_TRELLO_KEY;
const TOKEN = process.env.VUE_APP_TRELLO_OAUTH_TOKEN;
const BOARD_ID = process.env.VUE_APP_TRELLO_BOARD_ID;

class TrelloService {
  constructor() {
    // Hold the "For Review" list ID.
    this.forReviewListId = null;
  }

  /**
   * Adds the authentication values to the parameters that will get passed to the request.
   *
   * @param {object} args Existing parameters for the request.
   *
   * @reutrn object
   */
  _addAuthArgs(args = {}) {
    args.key = API_KEY;
    args.token = TOKEN;
    return args;
  }

  /**
   * Perform a GET request on the API.
   *
   * @param {string} endpoint Endpoint to hit on the API.
   * @param {object} args Parameters to send with the request.
   *
   * @return json data from the endpoint, or an error if there was a problem.
   */
  async get(endpoint, args = {}) {
    args = this._addAuthArgs(args);
    const query = Object.keys(args).map(key => `${key}=${args[key]}`).join('&');
    const route = `${BASE_ROUTE}${BOARD_ID}${endpoint}?${query}`;

    try {
      const response = await fetch(route);
      return response.json();
    } catch (error) {
      console.error('Error in TrelloServices.get', error);
      throw error;
    }
  }

  /**
   * Perform a PUT request on the API.
   *
   * @param {string} endpoint Endpoint to hit on the API.
   * @param {object} args Parameters to send with the request.
   */
  async put(endpoint, args = {}) {
    args = this._addAuthArgs(args);
  }

  /**
   * Retrieve the cards from the Trello board that have the CLIENT label. The cards will also get a
   * completed status based on which list they are in on the Trello board.
   *
   * @return array of cards.
   */
  async getClientTasks() {
    const labelRequest = this.get('/labels');
    const listsRequest = this.get('/lists', {
      cards: 'open',
      card_fields: 'name,desc,idLabels',
      filter: 'open',
      fields: 'name',
    });

    const [labels, lists] = await Promise.all([labelRequest, listsRequest]).catch(e => console.error(`Error: ${e}`));
    const cards = [];
    const clientLabels = labels.filter(label => label.name === 'CLIENT').map(label => label.id);

    lists.forEach(list => {
      const listCards = list.cards;
      const completeLists = ['For Review', 'Accepted'];
      const newCards = listCards
        .filter(card => card.idLabels.some(l => clientLabels.includes(l)))
        .map(card => ({ ...card, completed: completeLists.includes(list.name), listname: list.name }));

      if (list.name === 'For Review') {
        this.forReviewListId = list.id;
      }

      cards.push(...newCards);
    });

    return cards;
  }
}

const trelloService = new TrelloService();

export default trelloService;
