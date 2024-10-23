/*
  Serial Example
  Writes "L" when Left button (GPIO0) is pressed and "R" with Right button (GPIO35) is pressed
  Prints received message onto display (when receiving string over Serial port)
*/

#include "TFT_eSPI.h"

TFT_eSPI tft= TFT_eSPI();

#define BUTTON_LEFT 0
#define BUTTON_RIGHT 35
#define SELECT_BUTTON 27
#define POT 36

volatile bool leftButtonPressed = false;
volatile bool rightButtonPressed = false;
volatile bool selectButtonPressed = false;

unsigned long lastLeftPressTime = 0;  
unsigned long lastRightPressTime = 0;  
unsigned long lastSelectPressed = 0;  
unsigned long debounceDelay = 200;    // ms

int xyzPins[] = {39, 32, 33};   //x, y, z(switch) pins

void setup() {
  tft.init();
  tft.fillScreen(TFT_BLACK);
  tft.setRotation(1);

  pinMode(BUTTON_LEFT, INPUT_PULLUP);
  pinMode(BUTTON_RIGHT, INPUT_PULLUP);
  pinMode(xyzPins[2], INPUT_PULLUP);  // pullup resistor for switch on joystick 
  pinMode(SELECT_BUTTON, INPUT_PULLUP); // pull up select button 

  // more on interrupts here https://www.arduino.cc/reference/en/language/functions/external-interrupts/attachinterrupt/
  attachInterrupt(digitalPinToInterrupt(BUTTON_LEFT), pressedLeftButton, FALLING);
  attachInterrupt(digitalPinToInterrupt(BUTTON_RIGHT), pressedRightButton, FALLING);
  attachInterrupt(digitalPinToInterrupt(SELECT_BUTTON), pressedSelectButton, FALLING);
  Serial.begin(115200);
}

void pressedLeftButton() {
  unsigned long currentTime = millis();
  if (currentTime - lastLeftPressTime > debounceDelay) {
    lastLeftPressTime = currentTime;
    leftButtonPressed = true;
  }
}

void pressedRightButton() {
  unsigned long currentTime = millis();
  if (currentTime - lastRightPressTime > debounceDelay) {
    lastRightPressTime = currentTime;
    rightButtonPressed = true;
  }
}

void pressedSelectButton() {
  unsigned long currentTime = millis();
  if (currentTime - lastSelectPressed > debounceDelay) {
    lastSelectPressed = currentTime;
    selectButtonPressed = true;
  }
}

void loop() {

  // read the inputs from the joystick
  int xVal = analogRead(xyzPins[0]);
  int yVal = analogRead(xyzPins[1]);
  int zVal = digitalRead(xyzPins[2]);
  
  // read the input from the pot
  int potValue = analogRead(POT);
  
  // format the output from the joystick & potentiometer 
  Serial.printf("%d,%d,%d,%d", xVal, yVal, zVal, potValue);

  // print out when the select button is pressed
  if (selectButtonPressed){
    Serial.println(",SELECT");
    selectButtonPressed = false;
  }

  delay(100);

  // check if there's any incoming serial data
  if (Serial.available() > 0) {
    // clear last message
    tft.fillScreen(TFT_BLACK);

    // get new message
    String message = Serial.readStringUntil('\n');

    // display the message on the ESP32 display
    tft.setCursor(0, 0);
    tft.setTextSize(5);
    tft.println(message);
  }
}
