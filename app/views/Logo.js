import React, {Component} from 'react';


export default class Logo extends Component {

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
  }

  componentDidUnmount() {
    PubSub.unsubscribe('text:over');
    PubSub.unsubscribe('text:out');
  }

  textOver(topic, item) {
    this.setState({ type: item.item.type });
    this.forceUpdate();
  }
  
  textOut(topic, item) {
    this.setState({ type: null });
    this.forceUpdate();
  }

  onOver() {
    PubSub.publish('logo:over', null);
  }

  onOut() {
    PubSub.publish('logo:out', null);
  }

  get className() {
    var types = {
      'github':   'shake shake-crazy',
      'twitter':   'shake shake-slow',
    }
    var type = types[this.state.type] || '';
    return `${type}`;
  }

  render() {
    var className = this.className;
    return (
      <div className="wrap">
        <h1 className={className} 
            onMouseOver={this.onOver}
            onMouseOut={this.onOut} >
          dev360
        </h1>
      </div>
    );
  }
}
