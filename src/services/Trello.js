import Request from './Request';

class TrelloService {
  constructor() {
    // Hold the "For Review" and "Sprint Backlog" list IDs.
    this.forReviewList = null;
    this.sprintBacklogList = null;


    // Board ID from Trello.
    this.BOARD_ID = process.env.VUE_APP_TRELLO_BOARD_ID;
  }

  /**
   * Retrieve the cards from the Trello board that have the CLIENT label. The cards will also get a
   * completed status based on which list they are in on the Trello board.
   *
   * @return array of cards.
   */
  async getClientTasks() {
    const labelRequest = new Request(`boards/${this.BOARD_ID}/labels`);
    const listsRequest = new Request(`boards/${this.BOARD_ID}/lists`, {
      cards: 'open',
      card_fields: 'name,desc,idLabels',
      filter: 'open',
      fields: 'name',
    });

    const [labels, lists] = await Promise.all([labelRequest.get(), listsRequest.get()]).catch(e => console.error(`Error: ${e}`));
    const cards = [];
    const clientLabels = labels.filter(label => 'CLIENT' === label.name).map(label => label.id);

    lists.forEach(list => {
      const listCards = list.cards;
      const completeLists = ['For Review', 'Accepted'];
      const newCards = listCards
        .filter(card => card.idLabels.some(l => clientLabels.includes(l)))
        .map(card => ({
          ...card,
          completed: completeLists.includes(list.name),
          listId: list.id,
          listname: list.name,
        }));

      if ('For Review' === list.name) {
        this.forReviewList = list.id;
      } else if ('Sprint Backlog' === list.name) {
        this.sprintBacklogList = list.id;
      }

      cards.push(...newCards);
    });

    return cards;
  }

  /**
   * Move the card to the "For Review" list.
   *
   * @param {object} task Trello task data.
   *
   * @return void
   */
  async completeTask(task) {
    if (!this.forReviewList) {
      throw new Error('There is no "For Review" list defined.');
    }

    try {
      const request = new Request(`cards/${task.id}`, { idList: this.forReviewList });
      await request.put();
    } catch (error) {
      console.error('Error in TrelloService.completeTask()');
      throw error;
    }
  }


  /**
   * Move the card from the "For Review" list back to the
   *
   * @param {object} task Trello task data.
   *
   * @return void
   */
  async uncompleteTask(task) {
    if (!this.sprintBacklogList) {
      throw new Error('There is no "Sprint Backlog" list defined.');
    }

    try {
      const request = new Request(`cards/${task.id}`, { idList: this.sprintBacklogList });
      await request.put();
    } catch (error) {
      console.error('Error in TrelloService.completeTask()');
      throw error;
    }
  }
}

const trelloService = new TrelloService();

export default trelloService;
