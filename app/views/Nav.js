import React, {Component} from 'react';
import Text from './Text.js';


export default class Nav extends Component {

  constructor(options) {
    super(options);
    this.state = {};
  }

  createLinks() {
    var links = [];
    links.push({ 
      type: 'medium',
      text: 'Teachings',
      href: "https://medium.com/@dev360/"
     });
    links.push({ 
      type: 'github',
      text: 'Confoosions',
      href: "https://github.com/dev360/"
     });
    links.push({ 
      type: 'twitter',
      text: 'Tweetlings',
      href: "https://twitter.com/dev360/"
     });
    return links.map(function(link, i) {
      return (<Text item={link} key={i} />);
    });
  }

  render() {
    var links = this.createLinks();
    return (
      <div className="text">
        {links}
      </div>
    );
  }
}
