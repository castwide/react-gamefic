import React from 'react';

export class CommandForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { working: false };
	}
  
	handleSubmit(event) {
		event.preventDefault();
		var input = this.textInput.value;
		this.props.handleCommand(input);
	}
  
	componentDidUpdate() {
		this.textInput.value = '';
		this.textInput.focus();
	}

	componentDidMount() {
		this.textInput.value = '';
		this.textInput.focus();
	}
  
	formClassName() {
		return 'CommandForm' + (this.state.working ? ' working' : '');
	}

	render() {
	  return (
			<form className={this.formClassName()} action="#" onSubmit={(event) => this.handleSubmit(event)}>
				<label>{this.props.state.prompt}</label>
				<input type="text" ref={(input) => {this.textInput = input}} />
			</form>
	  );
	}
}
