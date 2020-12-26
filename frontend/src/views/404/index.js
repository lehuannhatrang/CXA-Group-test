import React, { Component } from "react";
import "./style.scss"
let userWriteTo = ''
const EXCLUSE_CHAR = ['Meta', 'Tab', 'Control', 'Alt', 'Shift', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12']
class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mt-4 d-flex justify-content-center">
        <div className="d-flex flex-column flex-center flex-middle">
            <div id="app">
                <div>404</div>
                    <div className="txt">
                        Not found<span id="write-able"></span><span className="blink">_</span>
                    </div>
                </div>
            </div>
      </div>
    );
  }
}

document.addEventListener('keydown', function(event) {
  if(event.key === "Backspace" ) {
    if(userWriteTo.length > 0) userWriteTo = userWriteTo.slice(0,-1)
  } else if(event.key === "Enter") {
    userWriteTo += '\n'
  }
  else if (!EXCLUSE_CHAR.includes(event.key) && event.key.length === 1) {
    userWriteTo += event.key
  }
  document.getElementById('write-able').innerHTML = userWriteTo
});

export default NotFound;
