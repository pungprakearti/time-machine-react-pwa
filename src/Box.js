import React, { Component } from 'react';
import './Box.css';
import tmSound from './time-machine.mp3';

export default class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '#####'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    let num = evt.target.textContent;

    for (let i = 0; i < this.state.display.length; i++) {
      if (this.state.display[i] === '#') {
        let str =
          this.state.display.slice(0, i) +
          num +
          this.state.display.slice(i + 1);

        if (i === 4) {
          this.setState(st => {
            st.display = str;
            this.checkCode(st.display);
          });
        } else {
          return this.setState({ display: str });
        }
      }
    }
  }

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
                        }, 3000);
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

  timeTravel() {
    let audio = new Audio(tmSound);
    audio.play();
  }

  render() {
    //
    //create dialpad
    let dialpad = [];
    let d = 0;
    let dialNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, ''];
    let row = [];
    for (let i = 0; i < 4; i++) {
      let col = [];
      for (let j = 0; j < 3; j++) {
        if (dialNums[d] === '') {
          col.push(<td id="Box-dialpad-empty">{dialNums[d]}</td>);
        } else {
          col.push(<td onClick={this.handleClick}>{dialNums[d]}</td>);
        }
        d++;
      }
      row.push(<tr>{col}</tr>);
    }
    dialpad.push(
      <table>
        <tbody>{row}</tbody>
      </table>
    );

    return (
      <div className="Box-cont">
        <div className="Box-display">{this.state.display}</div>
        <div className="Box-dialpad-cont">
          <div className="Box-dialpad">{dialpad}</div>
        </div>
      </div>
    );
  }
}
