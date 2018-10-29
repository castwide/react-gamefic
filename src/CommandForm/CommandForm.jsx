import React from 'react';

export class CommandForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { working: false };
	}
  
	handleChangeCapture(event) {
		this.formElement.setAttribute('data-command', this.textInput.value);
	}
  
	componentDidUpdate() {
		this.textInput.value = '';
		this.textInput.focus();
	}

	componentDidMount() {
		this.textInput.value = '';
		this.textInput.focus();
	}
  
	render() {
	  return (
			<form action="#" ref={(form) => {this.formElement = form}}>
				<label>{this.props.prompt}</label>
				<input type="text" ref={(input) => {this.textInput = input}} onChangeCapture={(event) => this.handleChangeCapture(event)} />
			</form>
	  );
	}
}
