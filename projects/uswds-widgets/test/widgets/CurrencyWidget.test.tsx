import React from 'react';
import { mount } from 'enzyme';
import CurrencyWidget from '../../src/widgets/CurrencyWidget';

function noop(){};

describe('<CurrencyWidget/>', () => {
  it('should render defaults', () => {
    const tree = mount(
      <CurrencyWidget id="test" onChange={noop} onBlur={noop}/>
    );
    const input = tree.find('input');
    expect(input.length).toBe(1);
    const node = (input.getDOMNode() as any);
    expect(node.type).toBe("text");
    expect(node.id).toBe("test");
    expect(node.name).toBe("test")
    expect(node.value).toBe("");
    tree.unmount();
  });
  it('should render initial value', () => {
    const tree = mount(
      <CurrencyWidget id="test" value="27.50" onChange={noop} onBlur={noop}/>
    );
    const input = tree.find('input');
    const node = (input.getDOMNode() as any);
    // The value is not groomed until onChange
    expect(node.value).toBe("27.50");
    tree.unmount();
  });
  it('should call onChange and onBlur', () => {
    const onChange = jest.fn(v => {
      expect(v).toBe(42.7);
    });
    const onBlur = jest.fn(v => {
      expect(v).toBe("test");
    })
    const tree = mount(
      <CurrencyWidget id="test" value="42.70" onChange={onChange} onBlur={onBlur}/>
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
      <CurrencyWidget id="test" onChange={onChange} onBlur={noop}/>
    );
    const input = tree.find('input');
    input.simulate("change");
    expect(onChange.mock.calls.length).toBe(1);
    tree.unmount();
  });
  it('should use strings in onChange on non-currency input', () => {
    const onChange = jest.fn(v => {
      expect(v).toBe("90.");
    });
    const tree = mount(
      <CurrencyWidget id="test" value="90." onChange={onChange} onBlur={noop}/>
    );
    const input = tree.find('input');
    input.simulate("change");
    expect(onChange.mock.calls.length).toBe(1);
    tree.unmount();
  });
});
