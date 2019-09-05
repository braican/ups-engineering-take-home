
const BASE_ROUTE = 'https://api.trello.com/1/boards/';
const API_KEY = process.env.VUE_APP_TRELLO_KEY;
const TOKEN = process.env.VUE_APP_TRELLO_OAUTH_TOKEN;
const BOARD_ID = process.env.VUE_APP_TRELLO_BOARD_ID;

class TrelloService {
  async get(endpoint, params = {}) {
    params.key = API_KEY;
    params.token = TOKEN;
    const query = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
    const route = `${BASE_ROUTE}${BOARD_ID}${endpoint}?${query}`;

    try {
      const response = await fetch(route);
      return response.json();
    } catch (error) {
      console.error('Error in TrelloServices.get', error);
      throw error;
    }
  }

  async getClientTasks() {
    const labelRequest = this.get('/labels');
    const listsRequest = this.get('/lists', {
      cards: 'open',
      card_fields: 'name,desc,idLabels',
      filter: 'open',
      fields: 'name',
    });

    const [labels, lists] = await Promise.all([labelRequest, listsRequest]).catch(e => {
      console.error(`Error: ${e}`);
    });

    const incompleteListCards = lists.filter(list => list.name !== 'For Review' && list.name !== 'Accepted').map(list => list.cards);
    const incompleteCards = [].concat(...incompleteListCards);
    const clientLabels = labels.filter(label => label.name === 'CLIENT').map(label => label.id);
    const clientCards = incompleteCards.filter(card => card.idLabels.some(l => clientLabels.includes(l)));

    return clientCards;
  }
}

const trelloService = new TrelloService();

export default trelloService;
