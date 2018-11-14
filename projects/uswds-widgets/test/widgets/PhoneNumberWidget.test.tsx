import React from 'react';
import { mount } from 'enzyme';
import PhoneNumberWidget from '../../src/widgets/PhoneNumberWidget';

function noop(){};

describe('<PhoneNumberWidget/>', () => {
  it('should render defaults', () => {
    const tree = mount(
      <PhoneNumberWidget id="test" onChange={noop} onBlur={noop}/>
    );
    const input = tree.find('input');
    expect(input.length).toBe(1);
    const node = (input.getDOMNode() as any);
    expect(node.type).toBe("text");
    expect(node.value).toBe("");
    tree.unmount();
  });
  it('should render initial value', () => {
    const tree = mount(
      <PhoneNumberWidget id="test" value="234-56-7890" onChange={noop} onBlur={noop}/>
    );
    const input = tree.find('input');
    const node = (input.getDOMNode() as any);
    // The value isn't groomed until it's saved onChange
    expect(node.value).toBe("234-56-7890");
    tree.unmount();
  });
  it('should call onChange and onBlur', () => {
    const onChange = jest.fn(v => {
      expect(v).toBe("234567890");
    });
    const onBlur = jest.fn(v => {
      expect(v).toBe("test");
    })
    const tree = mount(
      <PhoneNumberWidget id="test" value="234-56-7890" onChange={onChange} onBlur={onBlur}/>
    );
    const input = tree.find('input');
    input.simulate("blur");
    input.simulate("change");
    expect(onBlur.mock.calls.length).toBe(1);
    expect(onChange.mock.calls.length).toBe(1);
    tree.unmount();
  });
  it('should use undefined for onChange on empty input', () => {
    const onChange = jest.fn(v => {
      expect(v).toBe(undefined);
    });
    const tree = mount(
      <PhoneNumberWidget id="test" onChange={onChange} onBlur={noop}/>
    );
    const input = tree.find('input');
    input.simulate("change");
    expect(onChange.mock.calls.length).toBe(1);
    tree.unmount();
  });
});
