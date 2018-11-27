import React from 'react';
import { mount } from 'enzyme';
import SectionNav from '../src/SectionNav';

function navOK(route: Object){ return true; };

const routes = [
  { name: "page1", route: "/page1" },
  { name: "page2", route: "/page2" },
  { name: "page3", route: "/page3" },
  { name: "page4", route: "/page4" }
];

const someLang = { backLabel: "Retreat", nextLabel: "Advance" };

describe('<SectionNav/>', () => {
  it('should render defaults', () => {
    const tree = mount(
      <SectionNav currentRoute={routes[1]} navigateTo={navOK} routeList={routes}>
        <div className="form">Form Content</div>
      </SectionNav>
    );
    expect(tree.find("div.form").text()).toBe("Form Content");
    const buttons = tree.find("button");
    expect(buttons.at(0).text()).toBe("Back");
    expect(buttons.at(1).text()).toBe("Next");
    tree.unmount();
  });
  it('should render custom button labels and title', () => {
    const tree = mount(
      <SectionNav currentRoute={routes[1]} navigateTo={navOK} routeList={routes} navTitle="Hey There!" LanguageContext={someLang}>
        <div className="form">Form Content</div>
      </SectionNav>
    );
    const buttons = tree.find("button");
    expect(buttons.at(0).text()).toBe(someLang.backLabel);
    expect(buttons.at(1).text()).toBe(someLang.nextLabel);
    expect(tree.find("#usfs-route-nav-title").text()).toBe("Hey There!");
    tree.unmount();
  });
  it('should navigate on Back or Next', () => {
    let nextName: string;
    const navTo = jest.fn(r => {
      expect(r.name).toBe(nextName);
    });
    const tree = mount(
      <SectionNav currentRoute={routes[1]} navigateTo={navTo} routeList={routes}>
        <div className="form">Form Content</div>
      </SectionNav>
    );
    const buttons = tree.find("button");
    nextName = "page1";
    buttons.at(0).simulate("click");
    nextName = "page3";
    buttons.at(1).simulate("click");
    expect(navTo.mock.calls.length).toBe(2);
    tree.unmount();
  });
  it('should navigate on click to different section', () => {
    let nextName: string;
    const navTo = jest.fn(r => {
      expect(r.name).toBe(nextName);
    });
    const tree = mount(
      <SectionNav currentRoute={routes[1]} navigateTo={navTo} routeList={routes}>
        <div className="form">Form Content</div>
      </SectionNav>
    );
    const links = tree.find("a");
    nextName = "page1";
    links.at(0).simulate("click");
    nextName = "page3";
    links.at(2).simulate("click");
    expect(navTo.mock.calls.length).toBe(2);
    tree.unmount();
  });
  it('should highlight the active link', () => {
    const tree = mount(
      <SectionNav currentRoute={routes[1]} navigateTo={navOK} routeList={routes} LanguageContext={someLang}>
        <div className="form">Form Content</div>
      </SectionNav>
    );
    const activeLink = tree.find("a.usfs-active-route");
    expect(activeLink.length).toBe(1);
    expect(activeLink.text()).toBe("page2");
    tree.unmount();
  });
  it('should not show Back on first route', () => {
    const tree = mount(
      <SectionNav currentRoute={routes[0]} navigateTo={navOK} routeList={routes}>
        <div className="form">Form Content</div>
      </SectionNav>
    );
    expect(tree.find("button").length).toBe(1);
    expect(tree.find("button").text()).toBe("Next");
    tree.unmount();
  });
  it('should not show Next on last route', () => {
    const tree = mount(
      <SectionNav currentRoute={routes[routes.length-1]} navigateTo={navOK} routeList={routes}>
        <div className="form">Form Content</div>
      </SectionNav>
    );
    expect(tree.find("button").length).toBe(1);
    expect(tree.find("button").text()).toBe("Back");
    tree.unmount();
  });
});
