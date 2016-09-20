"use strict";

var ReactDOM = require('react-dom');
var React = require('react');

var Piano = React.createClass({
  render: function() {
    return (
      <div id='piano'>
      <div className='key' onClick={this.props.onCall.bind(this,'tryAnswer','c')}></div>
      <div className='key' onClick={this.props.onCall.bind(this,'tryAnswer','d')}></div>
      <div className='key' onClick={this.props.onCall.bind(this,'tryAnswer','e')}></div>
      <div className='key' onClick={this.props.onCall.bind(this,'tryAnswer','f')}></div>
      <div className='key' onClick={this.props.onCall.bind(this,'tryAnswer','g')}></div>
      <div className='key' onClick={this.props.onCall.bind(this,'tryAnswer','a')}></div>
      <div className='key' onClick={this.props.onCall.bind(this,'tryAnswer','b')}></div>
      <div className='blackKey cSharp' onClick={this.props.onCall.bind(this,'tryAnswer','c')}></div>
      <div className='blackKey dSharp' onClick={this.props.onCall.bind(this,'tryAnswer','c')}></div>
      <div className='blackKey fSharp' onClick={this.props.onCall.bind(this,'tryAnswer','c')}></div>
      <div className='blackKey gSharp' onClick={this.props.onCall.bind(this,'tryAnswer','c')}></div>
      <div className='blackKey aSharp' onClick={this.props.onCall.bind(this,'tryAnswer','c')}></div>
      </div>
    );
  }
});

module.exports = Piano;
