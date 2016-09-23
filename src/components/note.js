"use strict";

var ReactDOM = require('react-dom');
var React = require('react');
var Cookies = require('./common/cookies');
var Utils = require('./common/utils');
var $ = require('jquery');
var update = require('react-addons-update');
var Piano = require('./piano');

var Note = React.createClass({
  constants: {
    delay: 300,
    timeLeft: 100,
    answerFadeInDelay: 100,
    answerFadeOutDelay: 1000
  },
  getInitialState: function() {
    this.props.bus.add('tryAnswer', this.handleClick);
    var highScore = Cookies.getCookieValue('highScore') || 0;
    return {note:'a',score:0,timeLeft:0,highScore:highScore};
  },
  showTemporaryAnswer: function() {
    $('#answer').off();
    $('#answer').fadeIn(this.constants.answerFadeInDelay);
    var that = this;
    var timeout = setTimeout(function() {
      $('#answer').fadeOut(that.constants.answerFadeOutDelay);
    },1);
  },
  decrementTimer: function() {
    var w = --this.state.timeLeft;
    $('#bar').width(w-1);
    if (w>0)
      setTimeout(this.decrementTimer,this.constants.delay);
    else {
      window.removeEventListener("keydown", this.handleKeyDown, false);
      $('#start-game-button').show();
      if (this.state.score > this.state.highScore)
      {
        this.setState(update(this.state,{highScore: {$set: this.state.score}}));
        //this.state.highScore = this.state.score;
        document.cookie = 'highScore=' + this.state.highScore;
      }
      this.forceUpdate();
    }
  },
  componentDidMount: function() {
    $('#bar').hide();
  },
  startGame: function() {
    var newState = (update(this.state,{timeLeft: {$set: this.constants.timeLeft}}));
    var anotherNewState = (update(newState,{score: {$set: 0}}));
    this.state = anotherNewState;
    window.addEventListener("keydown", this.handleKeyDown, false);
    $('#answer').fadeOut(1);
    $('#start-game-button').hide();
    $('#start-game-button').text('Play Again');
    $('#bar').width(this.constants.timeLeft);
    $('#bar').show();
    setTimeout(this.decrementTimer,this.constants.delay);
  },
  handleKeyDown: function(event) {
    this.handleClick(event.key)
  },
  handleClick: function(key) {
    if (this.state.timeLeft <= 0)
      return;
    if (key === this.state.note)
    {
      $('#answer').css('color','blue');
      $('#answer').text('Great');
      this.showTemporaryAnswer();
      this.setState({score:this.state.score + 1,note:String.fromCharCode(Math.floor(Math.random()*100%7+97))});
    }
    else
    {
      $('#answer').css('color','red');
      $('#answer').text('Sorry');
      this.showTemporaryAnswer();
    }
  },
  render: function() {
    var suffix = Utils.getSuffix(this.state.note)
    var scoreText = this.state.timeLeft > 0 ? 'Score: ' : 'Final Score: ';
    return (
      <div>
        <div id="titleBar">
          <p id='title'>PianoMan</p>
          <p id='highScore'>High Score: {this.state.highScore}</p>
        </div>
        <img id='img' contentEditable src={'images/' + this.state.note + suffix + '.png'}/>
        <Piano onCall={this.props.bus.call}/>
        <p id='score'>{scoreText}{this.state.score}</p>
        <div id='bar'></div>
        <button id='start-game-button' className='btn btn-success' onClick={this.startGame}>Start Game</button>
        <p id='answer'></p>
      </div>
    );
  }
});
module.exports = Note;
