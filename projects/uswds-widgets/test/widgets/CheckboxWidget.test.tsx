import React from 'react';
import { mount } from 'enzyme';
import CheckboxWidget from '../../src/widgets/CheckboxWidget';

function noop(){};

describe('<CheckboxWidget/>', () => {
  it('should render defaults', () => {
    const tree = mount(
      <CheckboxWidget id="test" label="Check Me" onChange={noop}/>
    );
    const input = tree.find('input');
    expect(input.length).toBe(1);
    expect(tree.text()).toBe("Check Me");

    const node = (input.getDOMNode() as any);
    expect(node.type).toBe("checkbox");
    expect(node.disabled).toBe(false);
    expect(node.name).toBe("test");
    expect(node.id).toBe("test");
    tree.unmount();
  });
  it('should render checked', () => {
    const tree = mount(
      <CheckboxWidget id="test" value={true} onChange={noop}/>
    );
    const input = tree.find('input');
    const node = (input.getDOMNode() as any);
    expect(node.checked).toBe(true);
    tree.unmount();
  });
  it('should call onChange unchecked', () => {
    const onChange = jest.fn(v => {
      expect(v).toBe(false);
    });
    const tree = mount(
      <CheckboxWidget id="test" onChange={onChange}/>
    );
    const input = tree.find('input');
    input.simulate("click");
    input.simulate("change");
    expect(onChange.mock.calls.length).toBe(1);
    tree.unmount();
  });
  it('should call onChange checked', () => {
    const onChange = jest.fn(v => {
      expect(v).toBe(true);
    });
    const tree = mount(
      <CheckboxWidget id="test" value={true} onChange={onChange}/>
    );
    const input = tree.find('input');
    input.simulate("click");
    input.simulate("change");
    expect(onChange.mock.calls.length).toBe(1);
    tree.unmount();
  });
  it('should use optional title over label', () => {
    const tree = mount(
      <CheckboxWidget id="test" options={{title: "Really Check Me"}} onChange={noop}/>
    );
    expect(tree.text()).toBe("Really Check Me");
    tree.unmount();
  });
});
