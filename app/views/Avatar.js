import React, {Component} from 'react';
import Text from './Text.js';
import Scene from './Scene.js';



export default class Avatar extends Component {

  constructor(options) {
    super(options);

    this.state = {};
    this.state.items = [];
    this.state.add = false;

    this.textOver = this.textOver.bind(this);
    this.textOut = this.textOut.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('text:over', this.textOver);
    PubSub.subscribe('text:out', this.textOut);

    this.scene = Scene();
  }

  textOver(topic, item) {
    var types = {
      'medium':   ' medium shake shake-slow',
      'twitter':  ' twitter shake shake-vertical',
      'github':   ' github shake shake-crazy',
    }
    var type = types[item.item.type] || '';
    var className = `avatar${type}`;
    this.setState({ className: className });
    this.forceUpdate();
  }
  
  textOut(topic, item) {
    var className = 'avatar';
    this.setState({ className: className });
    this.forceUpdate();
  }

  render() {
    var className = this.state.className || 'avatar';
    return (
      <div className={className}>
        <div className="img">
        </div>
      </div>
    );
  }
}
