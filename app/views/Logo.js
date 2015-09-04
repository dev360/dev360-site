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

  textOver(topic, item) {
    var types = {
      'github':   'shake shake-crazy',
      'twitter':   'shake shake-slow',
    }
    var type = types[item.item.type] || '';
    var className = `${type}`;
    this.setState({ className: className });
    this.forceUpdate();
  }
  
  textOut(topic, item) {
    var className = '';
    this.setState({ className: className });
    this.forceUpdate();
  }

  render() {
    var className = this.state.className || '';
    return (
      <div className="wrap">
        <h1 className={className}>dev360</h1>
      </div>
    );
  }
}
