import React, { Component } from 'react';
import './scss/styles.scss';

// Typical header and footer just to show how it would be used
// Normally we'd import these from somewhere
function SiteHeader() {
  return <div>SITE HEADER</div>;
}
function SiteFooter() {
  return <div>SITE FOOTER</div>;
}

class App extends Component {
  render() {
    return (
      <>
        <SiteHeader/>
        <div>content</div>
        <SiteFooter/>
      </>
    );
  }
}

export default App;
