"use strict";

var ReactDOM = require('react-dom');
var React = require('react');
var Cookies = require('./common/cookies')
$ = jQuery = require('jquery');
var update = require('react-addons-update');

var Note = React.createClass({
  constants: {
    delay: 30,
    timeLeft: 100,
    answerFadeInDelay: 100,
    answerFadeOutDelay: 1000
  },
  getInitialState: function() {
    var highScore = Cookies.getCookieValue('highScore') || 0;
    return {note:'a',score:0,timeLeft:this.constants.timeLeft,highScore:highScore};
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
    this.setState(update(this.state,{timeLeft: {$set: this.constants.timeLeft}}));
    this.setState(update(this.state,{score: {$set: 0}}));
    window.addEventListener("keydown", this.handleKeyDown, false);
    $('#answer').fadeOut(1);
    $('#start-game-button').hide();
    $('#start-game-button').text('Play Again');
    $('#bar').width(this.constants.timeLeft);
    $('#bar').show();
    setTimeout(this.decrementTimer,this.constants.delay);
  },
  handleKeyDown: function(event) {
    if (event.key === this.state.note)
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
    var suffix = Math.floor(Math.random() * 100 % 2);
    if (suffix == '1' && (this.state.note=='a' || this.state.note=='b'))
    {
      suffix = '0';
    }
    var scoreText = this.state.timeLeft > 0 ? 'Score: ' : 'Final Score: ';
    return (
      <div>
        <p id='highScore'>High Score: {this.state.highScore}</p>
        <img id='img' contentEditable src={'images/' + this.state.note + suffix + '.png'}/>
        <p id='score'>{scoreText}{this.state.score}</p>
        <div id='bar'></div>
        <button id='start-game-button' className='btn btn-success' onClick={this.startGame}>Start Game</button>
        <p id='answer'></p>
      </div>
    );
  }
});
module.exports = Note;