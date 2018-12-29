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
    expect(tree.text()).toBe("YesNo");
    // Neither radio should be selected since there was no `value`
    inputs.forEach(i => {
      expect((i.getDOMNode() as HTMLInputElement).checked).toBe(false);
    });
    tree.unmount();
  });
  it('should render false value', () => {
    const tree = mount(
      <YesNoWidget id="test" label="label" value={false} onChange={noop}/>
    );
    const falsy = tree.find('input')
      .filterWhere(i => (i.getDOMNode() as HTMLInputElement).checked);
    expect(falsy.length).toBe(1);
    expect((falsy.getDOMNode() as HTMLInputElement).value).toBe("N");
    tree.unmount();
  });
  it('should reverse value', () => {
    const tree = mount(
      <YesNoWidget id="test" label="label" value={false} options={{yesNoReverse: true}} onChange={noop}/>
    );
    const falsy = tree.find('input')
      .filterWhere(i => (i.getDOMNode() as HTMLInputElement).checked);
    expect(falsy.length).toBe(1);
    expect((falsy.getDOMNode() as HTMLInputElement).value).toBe("Y");
    tree.unmount();
  });
  it('should handle onChange Yes', () => {
    const onChange = jest.fn((id, name, value, event) => {
      expect(value).toBe(true);
    });
    const tree = mount(
      <YesNoWidget id="test" label="label" onChange={onChange}/>
    );
    const yes = tree.find("input").first();
    const yesNode = (yes.getDOMNode() as HTMLInputElement);
    yesNode.click();
    expect(yesNode.checked).toBe(true);
    yes.simulate("change");
    expect(onChange.mock.calls.length).toBe(1);
    tree.unmount();
  });
  it('should handle onChange No', () => {
    const onChange = jest.fn((id, name, value, event) => {
      expect(value).toBe(false);
    });
    const tree = mount(
      <YesNoWidget id="test" label="label" onChange={onChange}/>
    );
    const no = tree.find("input").at(1);
    const noNode = (no.getDOMNode() as HTMLInputElement);
    noNode.click();
    expect(noNode.checked).toBe(true);
    no.simulate("change");
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
