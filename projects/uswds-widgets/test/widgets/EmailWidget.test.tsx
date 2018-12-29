import React from 'react';
import { mount } from 'enzyme';
import EmailWidget from '../../src/widgets/EmailWidget';

function noop(){};

describe('<EmailWidget/>', () => {
  it('should render defaults', () => {
    const tree = mount(
      <EmailWidget id="test" onChange={noop} onBlur={noop}/>
    );
    const input = tree.find('input');
    expect(input.length).toBe(1);
    const node = (input.getDOMNode() as HTMLInputElement);
    expect(node.type).toBe("email");
    expect(node.value).toBe("");
    tree.unmount();
  });
  it('should render initial value', () => {
    const tree = mount(
      <EmailWidget id="test" value="me@my.com" onChange={noop} onBlur={noop}/>
    );
    const input = tree.find('input');
    const node = (input.getDOMNode() as HTMLInputElement);
    expect(node.value).toBe("me@my.com");
    tree.unmount();
  });
  it('should call onChange and onBlur', () => {
    const onChange = jest.fn((id, name, value, event) => {
      expect(value).toBe("me@my.com");
    });
    const onBlur = jest.fn((id, name, value, event) => {
      expect(value).toBe("me@my.com");
    })
    const tree = mount(
      <EmailWidget id="test" value="me@my.com" onChange={onChange} onBlur={onBlur}/>
    );
    const input = tree.find('input');
    input.simulate("blur");
    input.simulate("change");
    expect(onBlur.mock.calls.length).toBe(1);
    expect(onChange.mock.calls.length).toBe(1);
    tree.unmount();
  });
});
