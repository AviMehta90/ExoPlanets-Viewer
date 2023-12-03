# Interactive Exo-Planets Visualization

## Overview

This GitHub repository contains an interactive and innovative visualization of exo-planets data from NASA. The project aims to provide a visually engaging exhibit for museum visitors, presenting information about various exo-planets in a unique and creative manner.

## Features

- **Bubble Chart:** The main visualization is a dynamic bubble chart that showcases the relationship between the distance of exo-planets from Earth (in light years), their mass multiplier, and their radius multiplier.
- **Interactive Controls:** Users can navigate through the data using "Next 10 Planets" and "Previous 10 Planets" buttons, allowing for a more detailed exploration of the dataset.
- **Color-Coded Legend:** Different types of planets are color-coded for easy identification. The legend provides information about the planet types, enhancing the interpretability of the chart.
- **Tooltips:** Hovering over each planet on the chart reveals a tooltip with detailed information, including the planet's name, distance, and type.

## How to Use

1. Clone the repository to your local machine.
2. Open the `index.html` file in your web browser.
3. Explore the interactive bubble chart and use the "Next" and "Previous" buttons to navigate through the dataset.

## Data Source

The exo-planets data used in this project is sourced from NASA's exoplanet catalog. The dataset includes information such as distance, mass multiplier, radius multiplier, planet type, and more.

## Technologies Used

- [D3.js](https://d3js.org/): A powerful JavaScript library for creating dynamic and interactive data visualizations in the browser.
- [Bootstrap](https://getbootstrap.com/): A popular front-end framework for building responsive and mobile-first web pages.

## Project Structure

- `index.html`: The main HTML file containing the structure of the web page.
- `index.js`: The JavaScript file handling data loading, chart initialization, and interactivity.
- `style.css`: The CSS file defining the styles and layout of the web page.
- `data/new_data.csv`: The CSV file containing the exo-planets dataset.


## Instructions to run

- Download the entire zip from this github repository and extract
- Create a local web server
  ```
  python -m http.server 3000
  ```
- Go to the webbrowser and enter [http://localhost:3000/index.html](http://localhost:3000/index.html)