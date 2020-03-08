import React from 'react';
export default class Button extends React.Component {
	state = {
		open: false
	};

	handleClick = () => {
		this.setState(prevState => ({
			open: !prevState.open
		}));
	};

	render() {
		const { title, content } = this.props;
		const { open } = this.state;

		return (
			<div>
				<button onClick={this.handleClick}>
					{open ? title : title}
				</button>
				{open ? <div className="content">{content}</div> : null}
			</div>
		);
	}
}
