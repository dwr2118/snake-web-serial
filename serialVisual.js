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
    if (value) {
      document.getElementById("content").style.visibility = "visible";
    }
    document.getElementById("value").innerHTML = value;
    let trimmed_value = value.trim(); 

    // grab the xyz positions from the value communicated to us
    let xyz = int(split(value, ','));
    if(xyz.length == 3){
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];

      // right: (4095, 1770)
      // left: (0, 1770)
      // up: (1770, 0)
      // down: (1770, 4095)
      if (x > 1770 && y < 100) {
        keyCode = UP_ARROW;
        keyPressed();
      } else if (x > 1770 && y > 4000) {
        keyCode = DOWN_ARROW;
        keyPressed();
      } else if (x > 4000 && y > 1770) {
        console.log("Right arrow pressed");
        keyCode = RIGHT_ARROW;
        keyPressed();
      } else if (x < 100 && y > 1770) {
        console.log("Left arrow pressed");
        keyCode = LEFT_ARROW;
        keyPressed();
      }
    } else{

      // check if in this line there was a button serial input communicated
      if (trimmed_value[0] == "R" || trimmed_value[0] == "L"){

        // raise the difficulty if Right button is pressed 
        if (trimmed_value == "R"){
          console.log("Right button pressed");
          changeDifficulty(5);
        } else if(trimmed_value == "L"){
          console.log("Left button pressed");
          changeDifficulty(-5); // lower difficulty if Left button is pressed 
        }
      }
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
  document.getElementById("content").style.visibility = "hidden";
}
