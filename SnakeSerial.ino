/*
  Shenron Snake Serial
  Writes the x and y position of the joystick connected to pins 39 and 32; respectively.
  The z variable records if the internal joystick's button has been pushed down. 
  We also record if a button and potentiometer (pot) connected to the ESP32 board have been utilized.
  Prints to serial the x, y, z values of the joystick, pot's values and whether or not a button was pressed. 
*/

#define SELECT_BUTTON 27 // select a convenient pin to read the digital input of the button
#define POT_PIN 36 // select a convenient ADC pin to read the analog input from the potentiometer

volatile bool selectButtonPressed = false; // button is not pressed initially
unsigned long lastSelectPressed = 0;  
unsigned long debounceDelay = 200;    // ms

int xyzPins[] = {39, 32, 33};   //x, y, z(switch) pins

void setup() {

  Serial.begin(115200);
  pinMode(xyzPins[2], INPUT_PULLUP);  // pullup resistor for switch on joystick 
  pinMode(SELECT_BUTTON, INPUT_PULLUP); // using internal pullup resistor for button 

  // define when to combat button bouncing: PIN, function and on which edge of the button press 
  attachInterrupt(digitalPinToInterrupt(SELECT_BUTTON), pressedSelectButton, FALLING);
  
}

// provide a time buffer for the button input to be recorded and prevent signal bouncing 
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
  
  // read the input from the potentiometer 
  int potValue = analogRead(POT_PIN);
  
  // format the output from the joystick & potentiometer 
  Serial.printf("%d,%d,%d,%d", xVal, yVal, zVal, potValue);

  // print out when the select button is pressed and give the bounce back some time to settle 
  if (selectButtonPressed){

    // 
    Serial.println(",SELECT");
    selectButtonPressed = false;
  }

  delay(100);
}
