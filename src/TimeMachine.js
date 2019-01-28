import React, { Component } from 'react';
import './TimeMachine.css';
import tmSound2011 from './sounds/timeMachine2011.mp3';
import clickSound from './sounds/click.wav';
import puSound from './sounds/powerUp.wav';
import errorSound from './sounds/error.mp3';
import ghIcon from './githubIcon.svg';

export default class TimeMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '#####',
      power: false,

      //timeout and interval ID's
      displayTimeout: null,
      displayInterval: null,

      //date for all time travel possibilities
      travelData: {
        10101: {
          year: 2011,
          countDisplay: {
            10: 'FRDAY',
            75: 'WKEND',
            95: 'FRDAY',
            170: 'WKEND',
            180: 'PARTY',
            198: 'YEAH!',
            225: 'FUN!!'
          },
          sound: tmSound2011,
          duration: 27000
        }
      }
    };

    this.handleClick = this.handleClick.bind(this);
    this.handlePower = this.handlePower.bind(this);

    //audio
    this.audioClick = new Audio(clickSound);
    this.audioTT = new Audio(tmSound2011);
    this.audioPower = new Audio(puSound);
    this.audioError = new Audio(errorSound);
  }

  handleClick(evt) {
    //get dialpad number
    let num = evt.target.textContent;

    //set button to pressed style
    let btn = evt.target;
    evt.target.className = 'TimeMachine-dialpad-btn TimeMachine-press';

    //reset audio click sound incase button clicks are fast
    this.audioClick.currentTime = this.audioClick.duration;
    this.audioClick.play();

    //after 100ms depress button
    setTimeout(() => {
      btn.className = 'TimeMachine-dialpad-btn';
    }, 100);

    if (this.state.power) {
      //loop through display string and search for #
      for (let i = 0; i < this.state.display.length; i++) {
        if (this.state.display[i] === '#') {
          //
          //replace current string with previous entry and current number
          let str =
            this.state.display.slice(0, i) +
            num +
            this.state.display.slice(i + 1);

          //on last number, check code
          if (i === 4) {
            this.setState(st => {
              this.checkCode(str);
              return { display: str };
            });

            //if not last number, add to state and update display
          } else {
            return this.setState({ display: str });
          }
        }
      }
    }
  }

  //turns on the time machine
  handlePower() {
    this.audioClick.play();

    //turn off
    if (this.state.power) {
      this.setState({ power: false, display: '#####' });
      this.audioTT.muted = true;
      this.audioPower.muted = true;
      document.body.className = '';

      //clear timeout used to control the display during time travel
      if (this.state.displayTimeout) {
        clearTimeout(this.state.displayTimeout);
        clearInterval(this.state.displayInterval);
        this.setState({ displayTimeout: null, displayInterval: null });
      }

      //turn on
    } else {
      this.setState({ power: true });
      this.audioTT.currentTime = this.audioTT.duration;
      this.audioTT.muted = false;
      this.audioPower.currentTime = this.audioPower.duration;
      this.audioPower.muted = false;
      this.audioPower.play();
    }
  }

  //check code and if is correct, time travel
  checkCode(code) {
    let checkCodeTimeout = setTimeout(() => {
      //
      //if travel code exists, start traveling sequence
      if (this.state.travelData[code]) {
        this.setState({ display: 'TRAVL' });
        let travelTimeout = setTimeout(() => {
          this.countDown(code);
        }, 500);
        this.setState({ displayTimeout: travelTimeout });
        //
        //else if wrong code error out
      } else {
        this.audioError.play();
        this.setState({ display: 'ERROR' });
        setTimeout(() => {
          this.setState({ display: '#####' });
        }, 750);
      }
    }, 500);

    this.setState({ displayTimeout: checkCodeTimeout });
  }

  //display countdown effect on display
  countDown(code) {
    let currentYear = new Date().getFullYear();
    let count = 0;
    let endYear = this.state.travelData[code].year;

    //display year effect
    let interval = setInterval(() => {
      //
      //start with current year
      if (count === 0) this.setState({ display: currentYear });

      //display random year between current year and end year
      if (count > 5) {
        this.setState({
          display: Math.floor(Math.random() * (currentYear - endYear)) + endYear
        });
      }

      //display end year
      if (count === 20) {
        clearInterval(interval);
        this.setState({ display: endYear });
        this.timeTravel(code);
      }

      count++;
    }, 100);
  }

  //travel through time!
  timeTravel(code) {
    let count = 0;
    let timeoutDuration = 0;
    let travelData = this.state.travelData[code];

    //set time travel sound and duration
    this.audioTT = new Audio(travelData.sound);
    timeoutDuration = travelData.duration;

    //display text effects
    let displayInterval = setInterval(() => {
      if (travelData.countDisplay[count])
        this.setState({ display: travelData.countDisplay[count] });
      count++;
    }, 100);

    this.setState({ displayInterval: displayInterval });

    //play time travel sound
    this.audioTT.play();

    //activate time travel effects
    document.body.className = 'flash';

    //after sound, reset display and effects
    let displayTimeout = setTimeout(() => {
      document.body.className = '';
      this.setState({ display: '#####' });

      //kill timeout for display count
      if (this.state.displayInterval) clearTimeout(this.state.displayInterval);
    }, timeoutDuration);

    this.setState({ displayTimeout: displayTimeout });
  }

  render() {
    //
    //create dialpad
    let dialpad = [];
    let dialNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, -1, 0, -2];
    for (let btn of dialNums) {
      //
      //using flex box to center buttons and keep them aligned so,
      //empty buttons are created and made invisible to center 0 button.
      if (btn < 0) {
        dialpad.push(
          <div
            className="TimeMachine-dialpad-btn TimeMachine-dialpad-empty"
            key={btn}
          >
            {btn}
          </div>
        );

        //all other buttons
      } else {
        dialpad.push(
          <div
            className="TimeMachine-dialpad-btn"
            id={`TimeMachine-btn-${btn}`}
            key={btn}
            onClick={this.handleClick}
            style={{ zIndex: btn > 0 ? btn : 10 }}
          >
            {btn}
          </div>
        );
      }
    }

    //rivets for panels
    let rivets = (
      <React.Fragment>
        <div className="TimeMachine-rivet1" />
        <div className="TimeMachine-rivet2" />
        <div className="TimeMachine-rivet3" />
        <div className="TimeMachine-rivet4" />
      </React.Fragment>
    );

    return (
      <div className="TimeMachine-cont">
        {rivets}

        {/* show display if power on */}
        {this.state.power ? (
          <div className="TimeMachine-display display-on">
            {this.state.power ? this.state.display : ''}
          </div>
        ) : (
          <div className="TimeMachine-display" />
        )}

        <div className="TimeMachine-dialpad-cont">
          {rivets}
          <div className="TimeMachine-dialpad">{dialpad}</div>
          <div className="TimeMachine-power-cont">
            {this.state.power ? (
              <div
                className="TimeMachine-power power-on"
                onClick={this.handlePower}
              />
            ) : (
              <div className="TimeMachine-power" onClick={this.handlePower} />
            )}
          </div>
          <div className="TimeMachine-github">
            <a href="https://github.com/pungprakearti/time-machine-react-pwa">
              <img id="github-icon" src={ghIcon} alt="github icon" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
