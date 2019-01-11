import React, { Component } from 'react';
import './TimeMachine.css';
import tmSound from './time-machine.mp3';
import clickSound from './click.wav';
import puSound from './power-up.wav';
import errorSound from './error.mp3';
import ghIcon from './github_icon.svg';

export default class TimeMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '#####',
      power: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePower = this.handlePower.bind(this);
    this.audioClick = new Audio(clickSound);
    this.audioTT = new Audio(tmSound);
    this.audioPower = new Audio(puSound);
    this.audioError = new Audio(errorSound);
  }

  handleClick(evt) {
    //
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
              st.display = str;
              this.checkCode(st.display);
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
      this.setState({ power: false });
      this.setState({ display: '#####' });
      this.audioTT.muted = true;
      this.audioPower.muted = true;
      document.body.className = '';

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
    if (code === '42069') {
      this.setState({ display: '2019' });
      setTimeout(() => {
        this.setState({ display: '2018' });
        setTimeout(() => {
          this.setState({ display: '2017' });
          setTimeout(() => {
            this.setState({ display: '2016' });
            setTimeout(() => {
              this.setState({ display: '2015' });
              setTimeout(() => {
                this.setState({ display: '2014' });
                setTimeout(() => {
                  this.setState({ display: '2013' });
                  setTimeout(() => {
                    this.setState({ display: '2012' });
                    setTimeout(() => {
                      this.setState({ display: '2011' });
                      this.timeTravel();
                      setTimeout(() => {
                        this.setState({ display: 'YEAH' });
                        setTimeout(() => {
                          this.setState({ display: 'FUN' });
                          setTimeout(() => {
                            this.setState({ display: '#####' });
                          }, 4000);
                        }, 2800);
                      }, 20000);
                    }, 10);
                  }, 30);
                }, 70);
              }, 120);
            }, 200);
          }, 300);
        }, 500);
      }, 800);
      // if (code === '42069') {
      //   this.setState({ display: 'TRAVL' });
      //   this.countDown();
    } else {
      this.audioError.play();
      this.setState({ display: 'ERROR' });
      setTimeout(() => {
        this.setState({ display: '#####' });
      }, 750);
    }
  }

  // countDown() {

  // }

  //travel through time!
  timeTravel() {
    this.audioTT.play();
    document.body.className = 'flash';
    setTimeout(() => {
      document.body.className = '';
    }, 27000);
  }

  render() {
    //
    //create dialpad
    let dialpad = [];
    let dialNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, -1, 0, -2];
    for (let btn of dialNums) {
      if (btn < 0) {
        dialpad.push(
          <div id="TimeMachine-dialpad-empty" key={btn}>
            {btn}
          </div>
        );
      } else {
        dialpad.push(
          <div
            className="TimeMachine-dialpad-btn"
            key={btn}
            onClick={this.handleClick}
            style={{ zIndex: btn > 0 ? btn : 10 }}
          >
            {btn}
          </div>
        );
      }
    }

    return (
      <div className="TimeMachine-cont">
        <div className="TimeMachine-rivet1" />
        <div className="TimeMachine-rivet2" />
        <div className="TimeMachine-rivet3" />
        <div className="TimeMachine-rivet4" />
        {this.state.power ? (
          <div className="TimeMachine-display display-on">
            {this.state.power ? this.state.display : ''}
          </div>
        ) : (
          <div className="TimeMachine-display" />
        )}

        <div className="TimeMachine-dialpad-cont">
          <div className="TimeMachine-rivet1" />
          <div className="TimeMachine-rivet2" />
          <div className="TimeMachine-rivet3" />
          <div className="TimeMachine-rivet4" />
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
