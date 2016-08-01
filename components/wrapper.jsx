var ReactDOM = require("react-dom");
var currentMessage = '';
var HelloWorld = React.createClass({
  getInitialState: function() {
    var self = this;
    setInterval(function() {
        //Run every 1 second (1000 milliseconds)
        $.ajax({
                url: 'http://10.32.176.4/workshop'
            })
            .done(function(data) {
              if(data !== currentMessage){ //If message in website is older than message from server then update it.
                var oldChat = self.state.message; //Get current message
                var newChat = oldChat + '\n' + data; //Add new message into current message.
                self.setState({ //Set new message to state
                  message: newChat
                }); //set message to html element
                currentMessage = data; //update current message
              }
            });
    }, 1000);

    return {
      message: 'Hello world',
      myMessage: ''
    };
  },

  sendMessage: function(event) {
    if (event.key === 'Enter') { //When press Enter
        var message = this.state.myMessage; //Get message from html element
        var date = new Date(); // Create message time
        var now = date.toUTCString();
        this.setState({
          myMessage: ''
        });
        $.ajax({
            url: 'http://10.32.176.4/workshop/' + 'KANOON : ' + message + " (" + now +") "
        });
        /*Clear text in myMessage (<input />)*/
        this.refs.myMessage.value = '';
    }else{ // If user did not press Enter then update value in myMessage (state)
      this.setState({
        myMessage: event.target.value
      });
    }
  },

	render: function() {
    /* Components */
    var Header = require('./header.jsx');
    /* HTML JSX */
		return (
			<div>
        <div className="panel panel-success">
          <div className="panel-heading">
            <Header />
          </div>
          <div className="panel-body">
            <textarea disabled value={this.state.message} className="form-control" id="chat-list"></textarea>
            <br />
            <div>
              <input defaultValue={this.state.myMessage} //Set default value to myMessage
                onKeyUp={this.sendMessage} //When user press keyboard on this field then call sendMessage function
                className="form-control"
                ref="myMessage"/>
            </div>
          </div>
        </div>
			</div>
		);
	}
});

module.exports = HelloWorld;

var Wrapper = require('./wrapper.jsx');
ReactDOM.render(
	<Wrapper/>, document.getElementById("container"));
