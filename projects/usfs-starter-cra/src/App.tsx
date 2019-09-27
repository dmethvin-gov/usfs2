import React, { Component } from 'react';
import './scss/styles.scss';

import FormNav from 'usfs-nav/dist/WizardNav';
import SomePage from 'usfs-nav/dist/Pg01_YourInfo';

const Routes = [
  { name: "one" },
  { name: "two" },
  { name: "three" }
];

// Typical header and footer just to show how it would be used
// Normally we'd import these from somewhere
function SiteHeader() {
  return <div>SITE HEADER</div>;
}
function SiteFooter() {
  return <div>SITE FOOTER</div>;
}

// really not SomePage, instead use a wrapper with its own object ...
//   which is basically a FieldGroup, right?

class App extends Component {
  goThere(route: any) { return false };
  onChange(e: any) {
    console.log(arguments);
  };
  render() {
    return (
      <>
        <SiteHeader/>
        <div>content</div>
        <FormNav currentRoute={Routes[0]} routeList={Routes} navigateTo={this.goThere} >
          <SomePage fields={{moreInfo: {}}} values={{}} labels={{}} onChange={this.onChange} />
        </FormNav>
        <SiteFooter/>
      </>
    );
  }
}

export default App;
