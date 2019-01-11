import React, { Component } from 'react';
import './TimeMachine.css';
import tmSound from './time-machine.mp3';
import clickSound from './click.wav';

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
  }

  handleClick(evt) {
    //
    //get dialpad number
    let num = evt.target.textContent;

    let btn = evt.target;
    evt.target.className = 'TimeMachine-dialpad-btn TimeMachine-press';

    this.audioClick.play();

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
    this.state.power
      ? this.setState({ power: false })
      : this.setState({ power: true });
    //reset input if power on or off
    this.setState({ display: '#####' });
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
    } else {
      this.setState({ display: 'ERROR' });
      setTimeout(() => {
        this.setState({ display: '#####' });
      }, 750);
    }
  }

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
    let dialNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, ''];
    for (let btn of dialNums) {
      if (btn === '') {
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
        <div className="TimeMachine-display">
          {this.state.power ? this.state.display : ''}
        </div>
        <div className="TimeMachine-dialpad-cont">
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
        </div>
      </div>
    );
  }
}
