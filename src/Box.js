import React, { Component } from 'react';
import './Box.css';

export default class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      one: '#',
      two: '#',
      three: '#',
      four: '#',
      five: '#'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    console.log(evt.target.textContent);
    let num = evt.target.textContent;
    if (this.state.one === '#') this.setState({ one: num });
    else {
      if (this.state.two === '#') this.setState({ two: num });
      else {
        if (this.state.three === '#') this.setState({ three: num });
        else {
          if (this.state.four === '#') this.setState({ four: num });
          else {
            if (this.state.five === '#') this.setState({ five: num });
            else {
              // ADD A PAUSE AFTER 5 and check entry. If not correct maybe flash something or just clear
              this.setState({
                one: '#',
                two: '#',
                three: '#',
                four: '#',
                five: '#'
              });
            }
          }
        }
      }
    }
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
        <div className="Box-display">
          {this.state.one}
          {this.state.two}
          {this.state.three}
          {this.state.four}
          {this.state.five}
        </div>
        <div className="Box-dialpad-cont">
          <div className="Box-dialpad">{dialpad}</div>
        </div>
      </div>
    );
  }
}
