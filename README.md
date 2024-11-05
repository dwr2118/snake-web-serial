# Shenron the Snake Game

An embedded, retro-style snake game inspired by **Dragon Ball** and crafted as a web application that communicates with a joystick, button, and potentiometer. This project reimagines the classic game with a **Dragon Ball Z** twist, turning the snake into **Shenron**, the wish-granting dragon, who collects dragon balls instead of traditional food.

## Design Goals

- **Game Concept**: Create a retro-inspired snake game in Python, adapted as a web application.
- **Hardware Design**: Design a handheld enclosure inspired by a PlayStation Portable (PSP) for a nostalgic feel.
- **DBZ Theme**: Reimagine the snake as Shenron, collecting dragon balls in tribute to the Dragon Ball series.

[Watch a demo here.](https://youtu.be/faDeSPOOSgg)

## The Vision

This project aimed to combine the retro snake game experience with the visual aesthetics of a PSP and the theme of Dragon Ball Z. The original design included a TTGO T-Display to show game stats (menu, leaderboard, high scores), while the main game ran on a connected laptop.


## Installation and Setup

1. **Dependencies**: Follow this [tutorial](https://www.youtube.com/watch?v=vj9nDja8ZdQ) to set up a web server for p5.js.
2. **Hardware**: Connect a joystick, button, and potentiometer to the TTGO T-Display, housed in a 3D-printed enclosure. Also, I used 4 self-tapping screws to help construct a more rigid housing for the joystick & button. 
3. **Serial Communication**: Ensure serial communication setup between the TTGO and the computer. Here’s the [GitHub repo](https://github.com/ttseng/coms3930-fall2024-serial/tree/main) that helped set this up.

## Code Overview

The game is built with:
- **p5.js**: For the snake game rendering and interactive visuals.
- **Serial Communication**: To capture inputs from the joystick and buttons.
- **TTGO T-Display**: Displays essential game information.

## Usage

1. **Launch the Web Application**: Start the server to render the game in a browser by hitting the Go Live button on the bottom right of VS Code once you've 
2. **Control Shenron**: Use the joystick to navigate, and the button to interact with the menu.
3. **Game Mechanics**: Shenron "eats" dragon balls to grow, and the goal is to collect as many as possible.

## Troubleshooting Tips

- **Joystick Input Glitch**: If you encounter random directional movements, this may be due to faulty joystick hardware.
- **Serial Communication Lag**: Ensure that joystick values update only with three-value packets for accurate movement control.

## Acknowledgments

- **Tutorial Assistance**: p5.js tutorial by [The Coding Train](https://youtu.be/AaGK-fj-BAM?si=d8fyqQrSCMuo1Nub) for snake game basics.
- **Professor’s GitHub Repository**: Serial communication guidance.

## Closing Thoughts

This project brought new challenges in integrating hardware with game logic. Future improvements include refining the enclosure fit and adding functionalities like a button-smashing mini-game. 
