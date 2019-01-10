import React, { Component } from 'react';
import './Box.css';
import tmSound from './time-machine.mp3';
import clickSound from './click.wav';

export default class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '#####'
    };
    this.handleClick = this.handleClick.bind(this);
    this.audioClick = new Audio(clickSound);
  }

  handleClick(evt) {
    //get dialpad number
    let num = evt.target.textContent;

    let btn = evt.target;
    evt.target.className = 'Box-dialpad-btn Box-press';

    this.audioClick.play();

    setTimeout(() => {
      btn.className = 'Box-dialpad-btn';
    }, 100);

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
    let audioTT = new Audio(tmSound);
    audioTT.play();
  }

  render() {
    //
    //create dialpad
    let dialpad = [];
    let d = 0;
    let dialNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, ''];
    let row = [];
    for (let btn of dialNums) {
      if (btn === '') {
        dialpad.push(
          <div id="Box-dialpad-empty" key={btn}>
            {btn}
          </div>
        );
      } else {
        dialpad.push(
          <div
            className="Box-dialpad-btn"
            key={btn}
            onClick={this.handleClick}
            style={{ zIndex: btn > 0 ? btn : 10 }}
          >
            {btn}
          </div>
        );
      }
    }
    /*
    for (let i = 0; i < 4; i++) {
      let col = [];
      for (let j = 0; j < 3; j++) {
        if (dialNums[d] === '') {
          col
            .push
            // <td id="Box-dialpad-empty" key={d}>
            //   {dialNums[d]}
            // </td>
            // <div id="Box-dialpad-empty" key={d}>
            //   {dialNums[d]}
            // </div>
            ();
        } else {
          col
            .push
            // <td key={d} onClick={this.handleClick}>
            //   {dialNums[d]}
            // </td>
            // <div key={d} onClick={this.handleClick}>
            //   {dialNums[d]}
            // </div>
            ();
        }
        d++;
      }
      // row.push(<tr>{col}</tr>);
      // row.push({ col });
      // console.log(row);
    }
    dialpad
      .push
      // <table>
      //   <tbody>{row}</tbody>
      // </table>
      // <div>{row}</div>
      ();
    // console.log(dialpad);
    */

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
