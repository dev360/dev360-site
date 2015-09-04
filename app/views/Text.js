import React, {Component} from 'react';


export default class Text extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.item = props.item;

    this.onOver = this.onOver.bind(this);
    this.onOut = this.onOut.bind(this);
  }

  componentDidMount() {
  }

  onOver() {
    var link = this.refs.link.getDOMNode();
    var item = {
      item: this.state.item,
      el: link
    }
    PubSub.publish('text:over', item);
  }

  onOut() {
    var link = this.refs.link.getDOMNode();
    var item = {
      item: this.state.item,
      el: link
    }
    PubSub.publish('text:out', item);
  }
  
  render() {
    var className = `fi-social-${this.state.item.type}`;
    return (
      <a ref="link"
          href={this.state.item.href}
          onMouseOver={this.onOver}
          onMouseOut={this.onOut}>
        <h1>
          <i className={className}></i>
          {this.state.item.text}
        </h1>
      </a>
    );
  }
}
