var $ = require('jquery');
var ReactDOM = require('react-dom');
var React = require('react');
var Note = require('./components/note');
var Piano = require('./components/piano');
var Bus = require('./components/common/bus');
var BusInstance = new Bus();
require('./css/main.css');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Note bus={BusInstance}/>
      </div>
    );
  }
})

function render() {
  ReactDOM.render(<App/>, document.getElementById('app'));
}

render();
