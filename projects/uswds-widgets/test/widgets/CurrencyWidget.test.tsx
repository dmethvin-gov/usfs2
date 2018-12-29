import React from 'react';
import { mount } from 'enzyme';
import CurrencyWidget, { CurrencyWidgetProps } from '../../src/widgets/CurrencyWidget';

function noop(){};

function makeCurrency(p?: object) {
  const props: CurrencyWidgetProps = {
    onChange: noop,
    onBlur: noop,
    id: "id025",
    name: "test",
    ...p
  };
  return mount(<CurrencyWidget {...props}/>);
}

describe('<CurrencyWidget/>', () => {
  it('should render defaults', () => {
    const tree = makeCurrency();
    const input = tree.find('input');
    expect(input.length).toBe(1);
    const node = (input.getDOMNode() as HTMLInputElement);
    expect(node.type).toBe("text");
    expect(node.id).toBe("id025");
    expect(node.name).toBe("test");
    expect(node.value).toBe("");
    tree.unmount();
  });
  it('should render initial value', () => {
    const tree = makeCurrency({value: "27.50"});
    const input = tree.find('input');
    const node = (input.getDOMNode() as HTMLInputElement);
    expect(node.value).toBe("27.50");
    tree.unmount();
  });
  it('should call onChange and onBlur', () => {
    const onChange = jest.fn((id, name, value, e) => {
      expect(value).toBe("27.50");
    });
    const onBlur = jest.fn((id, name, value, e) => {
      expect(value).toBe("27.50");
    });
    const tree = makeCurrency({value: "27.5", onChange, onBlur});
    const input = tree.find('input');
    input.simulate("change");
    expect(onChange.mock.calls.length).toBe(1);
    input.simulate("blur");
    expect(onBlur.mock.calls.length).toBe(1);
    tree.unmount();
  });
  it('should use undefined for onChange on empty input', () => {
    const onChange = jest.fn((id, name, value, e) => {
      expect(value).toBe(undefined);
    });
    const tree = makeCurrency({value: "", onChange});
    const input = tree.find('input');
    input.simulate("change");
    expect(onChange.mock.calls.length).toBe(1);
    tree.unmount();
  });
  it('should use strings in onChange on non-currency input', () => {
    const onChange = jest.fn((id, name, value, e) => {
      expect(value).toBe("90.");
    });
    const tree = makeCurrency({onChange});
    const input = tree.find('input');
    const node = (input.getDOMNode() as HTMLInputElement);
    node.value = "90.";
    input.simulate("change");
    expect(onChange.mock.calls.length).toBe(1);
    tree.unmount();
  });
});
