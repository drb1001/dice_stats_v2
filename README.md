# Dice Probability Distribution

This project visualizes the probability distribution of dice rolls based on user-defined dice notation. It uses JavaScript and the Chart.js library to generate and display the distribution in a bar chart.

## Features
- Parse dice notation (e.g., `2d6+1d8+3`) to calculate probability distributions.
- Support for multiple dice types and modifiers.
- Interactive UI to input dice notation and generate distributions.
- Dynamic bar chart visualization using Chart.js.

## File Overview

### `index.html`
The main entry point of the application. It includes:
- A text input for dice notation.
- A button to generate the probability distribution.
- A canvas element for rendering the chart.

### `ui.js`
Handles the user interface and logic for generating the probability distribution:
- Parses dice notation using `parseDiceSpec`.
- Combines dice distributions and applies modifiers.
- Updates the chart dynamically.

### `chart.js`
Manages the Chart.js integration:
- Initializes the bar chart.
- Updates the chart with new data and labels.

### `dice.js`
Calculates the probability distribution for dice rolls:
- Supports single and multiple dice.
- Uses recursive logic to compute distributions for multiple dice.

## How to Run locally
1. Serve the project using a local web server (e.g., Python's `http.server` or Node.js `http-server`).
2. Open `index.html` in your browser.
3. Enter dice notation in the input field and click "Generate Distribution".

## Example Dice Notation
- `2d6+1d8+3`: Two six-sided dice, one eight-sided die, and a modifier of +3.
- `1d20-2`: One twenty-sided die with a modifier of -2.

## Locally Testing

To run tests locally, follow these steps:

1. Ensure you have Node.js installed on your system.
2. Install the required dependencies by running:  `npm install`
3. Run the tests using the following command:  `npm test`

## Dependencies
- [Chart.js](https://www.chartjs.org/) (loaded via CDN).

## License
This project is open-source and available under the MIT License.
