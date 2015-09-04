import React, {Component} from 'react';



export default class Avatar extends Component {

  constructor(options) {
    super(options);

    this.state = {};
    this.state.items = [];
    this.state.add = false;

    this.textOver = this.textOver.bind(this);
    this.textOut = this.textOut.bind(this);
    this.logoOver = this.logoOver.bind(this);
    this.logoOut = this.logoOut.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('text:over', this.textOver);
    PubSub.subscribe('text:out', this.textOut);

    PubSub.subscribe('logo:over', this.logoOver);
    PubSub.subscribe('logo:out', this.logoOut);
  }

  textOver(topic, item) {
    this.setState({ type: item.item.type });
    this.forceUpdate();
  }
  
  textOut(topic, item) {
    this.setState({ type: null });
    this.forceUpdate();
  }

  logoOver(topic, item) {
    this.setState({ hover: true });
    this.forceUpdate();
  }

  logoOut(topic, item) {
    this.setState({ hover: false });
    this.forceUpdate();
  }

  get className() {
    var types = {
      'medium':   ' medium shake shake-slow',
      'twitter':  ' twitter shake shake-vertical',
      'github':   ' github shake shake-crazy'
    };

    var type = types[this.state.type] || '';
    var hover = (this.state.hover === true) ? ' hover': '';
    return `avatar${hover}${type}`;
  }

  render() {
    var className = this.className;
    return (
      <div className="wrap">
        <div className={className}>
          <div className="img">
          </div>
        </div>
      </div>
    );
  }
}
