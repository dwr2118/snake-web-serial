var writer;
var reader;
var port;
var inputDone;
var writableStreamClosed;

// called when user clicks Serial Connect button
const serialConnect = async () => {
  // Prompt user to select any serial port.
  port = await navigator.serial.requestPort();

  // be sure to set the baudRate to match the ESP32 code
  await port.open({ baudRate: 115200 });

  // setup decoder to read messages from arduino
  let decoder = new TextDecoderStream();
  inputDone = port.readable.pipeTo(decoder.writable);
  inputStream = decoder.readable;
  reader = inputStream.getReader();
  handleSerial();

  // setup encoder to send messages to arduino
  const textEncoder = new TextEncoderStream();
  writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
  writer = textEncoder.writable.getWriter();
};

async function handleSerial() {
  while (true) {
    const { value, done } = await reader.read(); // value is a value received via Serial
    if (done) {
      reader.releaseLock();
      break;
    }
    // if (value) {
    //   document.getElementById("section").style.visibility = "hidden";
    // }
    // document.getElementById("value").innerHTML = value;
    let trimmed_value = value.trim(); 

    // grab the xyz positions from the value communicated to us
    let xyz = split(value, ',');

    if(xyz.length > 2){

      let x = parseInt(xyz[0]);
      let y = parseInt(xyz[1]);
      let z = parseInt(xyz[2]);
      // let buttonPressed = xyz[3];
      let potValue = xyz[3];
      let selectPressed = xyz[4];

      if (selectPressed){
        selectPressed = selectPressed.trim();
      }

      if (null in xyz || NaN in xyz){
        console.log("null value detected");
        continue;
      }
      
      console.log(trimmed_value, x, y, z, potValue, selectPressed); 

      // right: (4095, 1770)
      // left: (0, 1770)
      // up: (1770, 0)
      // down: (1770, 4095)
      if (xyz.length > 3){
        if (x > 1770 && y < 100) {
          console.log("Up arrow pressed");
          keyCode = UP_ARROW;
          keyPressed();
        } else if (x > 1770 && y > 3200) {
          console.log("Down arrow pressed");
          keyCode = DOWN_ARROW;
          keyPressed();
        } else if (x > 4000 && y > 1770) {
          console.log("Right arrow pressed");
          keyCode = RIGHT_ARROW;
          keyPressed();
        } else if (x < 300 && y > 1760) {
          console.log("Left arrow pressed");
          keyCode = LEFT_ARROW;
          keyPressed();
        }
      }

      
      if (potValue){
        changeDifficulty(potValue);
      }

      if (selectPressed == "SELECT" && xyz.length > 4){
        console.log("Select Button pressed");
        changeGameState();
      } 

      // if (buttonPressed == "R"){
      //   console.log("Right button pressed");
      //   // raise the difficulty if Right button is pressed 
      //   changeDifficulty(5);
      // } else if(buttonPressed == "L"){
      //   console.log("Left button pressed");
      //   // lower difficulty if Left button is pressed 
      //   changeDifficulty(-5); 
      // }

    }

  }
}

const serialWrite = async () => {
  let message = document.getElementById("message").value;
  console.log("message: ", message);

  await writer.write(message);
};

const serialDisconnect = async() => {
  reader.cancel();
  await inputDone.catch(() => {});

  writer.close();
  await writableStreamClosed;
  await port.close();
  // document.getElementById("content").style.visibility = "hidden";
}
