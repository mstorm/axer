import React, { Component } from 'react';
import './App.css';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

/**
 * 용의 보물 대전장의 황금용 토벌에 참가하여 얻은 전리품입니다.<br><br><color=#fee6ac>기본 : 에메랄드 6개 획득</color><br><br>다음 중 <color=#fee6ac>1개</color> 랜덤 획득<br><br>1. 화려한 장비 상자 2개<br>2. 연마석 상자 1개<br>3. 강화 보호권 1개<br>4. 승급석 상자 2개<br>5. 희귀 정수 상자 3개<br>6. 영웅 정수 상자 2개<br>7. 10만~1000만 골드 상자 3개<br>8. 빛나는 가루 3개<br>9. 빛나는 깃대 1개<br>10. 생명의 돌 1개<br>11. 암흑의 돌 1개<br>12. 날카로운 이빨 1개
 */

const compose = (text, color) => color ? `<color=${color}>${text}</color>` : text;

const inputs = [{
  name: 'desc',
  label: '아이템 설명',
  rows: 2
}, {
  name: 'final-reward',
  label: '확정 보상',
  color: '#fee6ac',
  rows: 2
}, {
  name: 'rule',
  label: '보상 규칙',
  color: '#ffffff',
  rows: 2
}, {
  name: 'optional-reward',
  label: '획득 가능한 아이템',
  rows: 10
}];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
  }

  handleChange(e) {
    const color = e.target.getAttribute('color');
    const text = e.target.value.replace(/\n/g, '<br>');

    const newState = {};
    newState[e.target.name] = compose(text, color);

    this.setState(newState);
  }

  handleCopy(e) {
    e.target.select();
    document.execCommand('copy');
  }

  render() {
    console.log(this.state);

    const text = inputs.map(input => input.name).map(name => this.state[name]).filter(o => o).reduce((text, current) => {
      return text ? `${text}<br><br>${current}` : current;
    }, '');

    return (
      <div className="App">
        <form>
          {inputs.map((input) => (
            <FormGroup key={input.name}>
              <ControlLabel>{input.label}</ControlLabel>
              <FormControl componentClass="textarea"
                           placeholder={input.label}
                           name={input.name}
                           color={input.color}
                           rows={input.rows}
                           onChange={this.handleChange} />
            </FormGroup>
          ))}
        </form>

        <ControlLabel>결과</ControlLabel>
        <FormControl componentClass="textarea" rows={5} onClick={this.handleCopy} readOnly value={text} />
      </div>
    );
  }
}

export default App;
