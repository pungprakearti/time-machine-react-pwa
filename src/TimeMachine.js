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
      displayTimeout: null,
      displayInterval: null,
      travelData: {
        10101: {
          year: 2011,
          countDisplay: {
            10: 'FRDAY',
            75: 'WKEND',
            95: 'FRDAY',
            170: 'WKEND',
            180: 'PARTY',
            198: 'YEAH',
            225: 'FUN'
          }
        }
      }
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePower = this.handlePower.bind(this);

    //timeout and interval ID's
    // this.displayTimeout = null;
    // this.displayInterval = null;

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
      // if (this.displayTimeout) {
      //   clearTimeout(this.displayTimeout);
      //   clearInterval(this.displayInterval);
      //   this.displayTimeout = null;
      //   this.displayInterval = null;
      // }
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
    setTimeout(() => {
      //
      //other years and codes can be entered here
      if (code === '10101') {
        this.setState({ display: 'TRAVL' });
        setTimeout(() => {
          this.countDown(2011);
        }, 500);
        //
        // wrong code
      } else {
        this.audioError.play();
        this.setState({ display: 'ERROR' });
        setTimeout(() => {
          this.setState({ display: '#####' });
        }, 750);
      }
    }, 500);
  }

  //display countdown effect on display
  countDown(endYear) {
    let currentYear = new Date().getFullYear();
    let count = 0;

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
        this.timeTravel(endYear);
      }

      count++;
    }, 100);
  }

  //travel through time!
  timeTravel(endYear) {
    let count = 0;
    let timeoutDuration = 0;

    //more years can be added here. Need new sound, duration of sound,
    //and interval for display effects.
    if (endYear === 2011) {
      //
      //set time travel sound and duration
      this.audioTT = new Audio(tmSound2011);
      timeoutDuration = 27000;

      //display text effects
      this.displayInterval = setInterval(() => {
        if (count === 10) this.setState({ display: 'FRDAY' });
        if (count === 75) this.setState({ display: 'WKEND' });
        if (count === 95) this.setState({ display: 'FRDAY' });
        if (count === 170) this.setState({ display: 'WKEND' });
        if (count === 180) this.setState({ display: 'PARTY' });
        if (count === 198) this.setState({ display: 'YEAH!' });
        if (count === 225) this.setState({ display: 'FUN!!' });
        count++;
      }, 100);
    }

    //play time travel sound
    this.audioTT.play();

    //activate time travel effects
    document.body.className = 'flash';

    //after sound, reset display and effects
    // this.displayTimeout = setTimeout(() => {
    //   document.body.className = '';
    //   this.setState({ display: '#####' });

    //   //kill timeout for display count
    //   if (this.displayInterval) clearTimeout(this.displayInterval);
    // }, timeoutDuration);
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
