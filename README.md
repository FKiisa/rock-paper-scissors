# Rock-Paper-Scissors Betting Game

## Overview

This is a Rock-Paper-Scissors betting game built with React and TypeScript. Players can bet on one or two positions (Rock, Paper, Scissors) with a starting balance and earn rewards based on the outcome. The application is designed with modular components, state management using Redux, and follows strict TypeScript typing for robust error handling and scalability.

You can view a live version of the application [here](https://rock-paper-scissors-six-zeta.vercel.app/).

## Installation and Setup

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/FKiisa/rock-paper-scissors
   cd rock-paper-scissors
   ```
2. **Install dependencies**:
    ```bash
    npm install
    ```
3. **Start the project**:
    ```bash
    npm start
    ```
4. **Build for production**:
    ```bash
    npm build
    ```

## How to Use the App

1. **Placing Bets**: 
   - Select Rock, Paper, or Scissors to place your bets. You can bet on one or two positions.
   - Each bet is an increment of 500. The total bet will be deducted from your balance when you click "Play".

2. **Starting the Game**:
   - After placing your bets, click "Play" to see the result.
   - The computer will randomly choose a position, and the outcome will be displayed.

3. **Winning**:
   - If you bet on the correct position, your balance will be updated based on the winning rate (14x for one position, 3x for two positions).
   - If you place one bet and it's a draw - the bet is returned to you, but when you place two bets, draw bet is not returned

## Error Handling

The app includes a custom `ErrorBoundary` that catches JavaScript errors anywhere in the child component tree, logs them, and displays a fallback UI (`ErrorPage`). This ensures that users have a smooth experience even when something goes wrong in the application.


