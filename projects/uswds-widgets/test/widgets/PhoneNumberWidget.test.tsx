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
    const node = (input.getDOMNode() as HTMLInputElement);
    expect(node.type).toBe("text");
    expect(node.value).toBe("");
    tree.unmount();
  });
  it('should render initial value', () => {
    const tree = mount(
      <PhoneNumberWidget id="test" value="234-506-7890" onChange={noop} onBlur={noop}/>
    );
    const input = tree.find('input');
    const node = (input.getDOMNode() as HTMLInputElement);
    // The value isn't groomed until it's saved onChange
    expect(node.value).toBe("234-506-7890");
    tree.unmount();
  });
  it('should call onChange and onBlur', () => {
    const onChange = jest.fn((id, name, value, event) => {
      expect(value).toBe("2345067890");
    });
    const onBlur = jest.fn((id, name, value, event) => {
      expect(value).toBe("2345067890");
    })
    const tree = mount(
      <PhoneNumberWidget id="test" value="234-506-7890" onChange={onChange} onBlur={onBlur}/>
    );
    const input = tree.find('input');
    input.simulate("change");
    input.simulate("blur");
    expect(onChange.mock.calls.length).toBe(1);
    expect(onBlur.mock.calls.length).toBe(1);
    tree.unmount();
  });
  it('should use undefined for onChange on empty input', () => {
    const onChange = jest.fn((id, name, value, event) => {
      expect(value).toBe(undefined);
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
