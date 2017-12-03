import React from 'react';

export class CommandForm extends React.Component {
	constructor(props) {
		super(props);
	}
  
	handleSubmit(event) {
		event.preventDefault();
		var input = this.textInput.value;
		this.props.handleCommand(input);
		this.textInput.value = '';
	}
  
	componentDidMount() {
		this.textInput.focus();
	}
  
	render() {
	  return (
			<form className="CommandForm" action="#" onSubmit={(event) => this.handleSubmit(event)}>
				<label>{this.props.state.prompt}</label>
				<input type="text" ref={(input) => {this.textInput = input}} />
			</form>
	  );
	}
}
