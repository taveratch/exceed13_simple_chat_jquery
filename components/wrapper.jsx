var ReactDOM = require("react-dom");
var HelloWorld = React.createClass({
	render: function() {
    /* HTML JSX */
		return (
			<div>
        <h1>Hello World</h1>
			</div>
		);
	}
});

module.exports = HelloWorld;

var Wrapper = require('./wrapper.jsx');
ReactDOM.render(
	<Wrapper/>, document.getElementById("container"));
