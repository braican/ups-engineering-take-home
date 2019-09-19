# Upstatement Engineering Take-home: UpDos

Sets up a simpler way for clients to see their tasks and mark them as complete. Pulls cards labelled with the `CLIENT` label from [this public Trello board](https://trello.com/b/W7hrJAdI/ups-engineering-take-home-project).

Marking a todo as complete in the application will move the card to the `For Review` column on the Trello board. Unmarking a completed task in the application will move the related card to the `Sprint Backlog` column on the Trello board.

## Installation

1. Copy the `.env.sample` file to `.env.local` and update the following variables:

    * Add your Trello API key to `VUE_APP_TRELLO_KEY`.
    * Your OAuth token should go in `VUE_APP_TRELLO_OAUTH_TOKEN`.
    * The ID for the Trello board that holds the client's cards goes in `VUE_APP_TRELLO_BOARD_ID`.

1. Make sure we're using the right version of node:
    ```
    nvm install
    ```

2. Install front-end dependencies:
    ```
    yarn install
    ```

All set. You're all set to start the project.

## Development

1. Make sure we're using the right version of node:
    ```
    nvm install
    ```

2. Start the application:
    ```
    yarn start
    ```
