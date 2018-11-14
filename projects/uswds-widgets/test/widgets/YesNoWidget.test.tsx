import React from 'react';
import { mount } from 'enzyme';
import YesNoWidget from '../../src/widgets/YesNoWidget';

function noop(){};

describe('<YesNoWidget/>', () => {
  it('should render defaults', () => {
    const tree = mount(
      <YesNoWidget id="test" label="label" onChange={noop}/>
    );
    const inputs = tree.find('input[type="radio"]');
    expect(inputs.length).toBe(2);
    // Neither radio should be selected since there was no `value`
    inputs.forEach(i => {
      expect((i.getDOMNode() as any).checked).toBe(false);
    });
    tree.unmount();
  });
  it('should render false value', () => {
    const tree = mount(
      <YesNoWidget id="test" label="label" value={false} onChange={noop}/>
    );
    const falsy = tree.find('input')
      .filterWhere(i => (i.getDOMNode() as any).checked);
    expect(falsy.length).toBe(1);
    expect((falsy.getDOMNode() as any).value).toBe("N");
    tree.unmount();
  });
  it('should reverse value', () => {
    const tree = mount(
      <YesNoWidget id="test" label="label" value={false} options={{yesNoReverse: true}} onChange={noop}/>
    );
    const falsy = tree.find('input')
      .filterWhere(i => (i.getDOMNode() as any).checked);
    expect(falsy.length).toBe(1);
    expect((falsy.getDOMNode() as any).value).toBe("Y");
    tree.unmount();
  });
  it('should handle onChange Yes', () => {
    const onChange = jest.fn(v => {
      expect(v).toBe(true);
    });
    const tree = mount(
      <YesNoWidget id="test" label="label" onChange={onChange}/>
    );
    const first = tree.find("input").first();
    (first.getDOMNode() as any).click();
    expect((first.getDOMNode() as any).checked).toBe(true);
    first.simulate("change");
    expect(onChange.mock.calls.length).toBe(1);
    tree.unmount();
  });
  it('should handle onChange No', () => {
    const onChange = jest.fn(v => {
      expect(v).toBe(false);
    });
    const tree = mount(
      <YesNoWidget id="test" label="label" onChange={onChange}/>
    );
    const first = tree.find("input").at(1);
    (first.getDOMNode() as any).click();
    expect((first.getDOMNode() as any).checked).toBe(true);
    first.simulate("change");
    expect(onChange.mock.calls.length).toBe(1);
    tree.unmount();
  });
  it('should process custom labels', () => {
    const tree = mount(
      <YesNoWidget
        id="test"
        label="label"
        value={false}
        options={{labels: { Y: "Yep", N: "Nope" }}}
        onChange={noop}
      />
    );
    expect(tree.text()).toBe("YepNope");
    tree.unmount();
  });
});
