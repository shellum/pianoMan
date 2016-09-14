var $ = require('jquery');
var ReactDOM = require('react-dom');
var React = require('react');
var Note = require('./components/note');
//require('./css/' + /^.*$/);
//require('./html/' + /^.*html$/);

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Note/>
      </div>
    );
  }
})

function render() {
  ReactDOM.render(<App/>, document.getElementById('app'));
}

render();
