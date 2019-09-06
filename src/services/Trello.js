
const BASE_ROUTE = 'https://api.trello.com/1/boards/';
const API_KEY = process.env.VUE_APP_TRELLO_KEY;
const TOKEN = process.env.VUE_APP_TRELLO_OAUTH_TOKEN;
const BOARD_ID = process.env.VUE_APP_TRELLO_BOARD_ID;

class TrelloService {

  _addAuthArgs(args = {}) {
    args.key = API_KEY;
    args.token = TOKEN;
    return args;
  }

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

  async put(endpoint, args = {}) {
    args = this._addAuthArgs(args);
  }

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

      cards.push(...newCards);
    });

    return cards;
  }
}

const trelloService = new TrelloService();

export default trelloService;
