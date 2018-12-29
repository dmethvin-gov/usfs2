import React from 'react';
import { mount } from 'enzyme';
import TextWidget from '../../src/widgets/TextWidget';

function noop(){};

describe('<TextWidget/>', () => {
  it('should render defaults', () => {
    const tree = mount(
      <TextWidget id="test" onChange={noop} onBlur={noop}/>
    );
    const input = tree.find('input');
    expect(input.length).toBe(1);

    const node = (input.getDOMNode() as any);
    expect(node.type).toBe("text");
    expect(node.value).toBe("");
    expect(node.disabled).toBe(false);
    expect(node.name).toBe("test");
    expect(node.id).toBe("test");
    tree.unmount();
  });
  it('should render optional values', () => {
    const tree = mount(
      <TextWidget id="test" value="initial" onChange={noop} onBlur={noop}/>
    );
    const input = tree.find('input');
    const node = (input.getDOMNode() as any);
    expect(node.value).toBe("initial");
    tree.unmount();
  });
  it('should call onChange and onBlur', () => {
    const onChange = jest.fn((id, name, value, event) => {
      expect(value).toBe("initial");
    });
    const onBlur = jest.fn((id, name, value, event) => {
      expect(value).toBe("initial");
    })
    const tree = mount(
      <TextWidget id="test" value="initial" onChange={onChange} onBlur={onBlur}/>
    );
    const input = tree.find('input');
    input.simulate("blur");
    input.simulate("change");
    expect(onBlur.mock.calls.length).toBe(1);
    expect(onChange.mock.calls.length).toBe(1);
    tree.unmount();
  });
  it('should use undefined for onChange on empty input', () => {
    const onChange = jest.fn((id, name, value, event) => {
      expect(value).toBe(undefined);
    });
    const tree = mount(
      <TextWidget id="test" onChange={onChange} onBlur={noop}/>
    );
    const input = tree.find('input');
    input.simulate("change");
    expect(onChange.mock.calls.length).toBe(1);
    tree.unmount();
  });
});
