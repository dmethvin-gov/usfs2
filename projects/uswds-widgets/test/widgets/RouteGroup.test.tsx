import React from 'react';
import { mount } from 'enzyme';
import RouteGroup from '../../src/widgets/RouteGroup';

function noop(){};

describe('<RouteGroup/>', () => {
  it('should render defaults (no Next/Back)', () => {
    const tree = mount(
      <RouteGroup>
        <span>Salutations</span>
      </RouteGroup>
    );
    expect(tree.find('div').length).toBe(1);
    expect(tree.find('span').length).toBe(1);
    expect(tree.find('button').length).toBe(0);
    expect(tree.text()).toContain('Salutations');
    tree.unmount();
  });
  it('should render buttons with default text', () => {
    const tree = mount(
      <RouteGroup goBack={noop} goNext={noop}>
        <span>Salutations</span>
      </RouteGroup>
    );
    expect(tree.find('div').length).toBe(2);
    expect(tree.find('span').length).toBe(1);
    const buttons = tree.find('button');
    expect(buttons.length).toBe(2);
    expect(buttons.at(0).text()).toBe("Back");
    expect(buttons.at(1).text()).toBe("Next");
    tree.unmount();
  });
  it('should render buttons with custom text', () => {
    const tree = mount(
      <RouteGroup goNext={noop} nextLabel="ONWARD!">
        <span>Salutations</span>
      </RouteGroup>
    );
    const button = tree.find('button');
    expect(button.length).toBe(1);
    expect(button.text()).toContain("ONWARD!");
    tree.unmount();
  });
  it('should call goBack and goNext', () => {
    const goBack = jest.fn();
    const goNext = jest.fn();
    const tree = mount(
      <RouteGroup goBack={goBack} goNext={goNext}>
        <span>Salutations</span>
      </RouteGroup>
    );
    const button = tree.find('button');
    button.at(0).simulate("click");
    button.at(1).simulate("click");
    expect(goBack.mock.calls.length).toBe(1);
    expect(goNext.mock.calls.length).toBe(1);
    tree.unmount();
  });
});
