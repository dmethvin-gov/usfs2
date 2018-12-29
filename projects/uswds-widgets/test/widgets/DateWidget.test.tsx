import React from 'react';
import { mount } from 'enzyme';
import DateWidget from '../../src/widgets/DateWidget';

function noop(){};

describe('<DateWidget/>', () => {
  it('should render defaults', () => {
    const tree = mount(
      <DateWidget id="test" onChange={noop} onBlur={noop}/>
    );
    const inputs = tree.find('input');
    expect(inputs.length).toBe(1);
    const selects = tree.find('select');
    expect(selects.length).toBe(2);
    tree.unmount();
  });
  it('should render initial value', () => {
    const tree = mount(
      <DateWidget id="test" value="2018-03-12" onChange={noop} onBlur={noop}/>
    );
    // Assumes USA month, day, year order in document
    const month = (tree.find('select').at(0).getDOMNode() as any);
    const day = (tree.find('select').at(1).getDOMNode() as any);
    const year = (tree.find('input').getDOMNode() as any);
    expect(year.value).toBe("2018");
    expect(month.value).toBe("3");
    expect(day.value).toBe("12");
    tree.unmount();
  });
  it('should call onChange and onBlur', () => {
    const onChange = jest.fn((id, name, value, event) => {
      expect(id).toBe("test");
      expect(value).toBe("2019-02-01");
    });
    const onBlur = jest.fn((id, name, value, event) => {
      expect(id).toBe("test");
      expect(value).toBe("2019-02-01");
    })
    const tree = mount(
      <DateWidget id="test" value="2019-02-01" onChange={onChange} onBlur={onBlur}/>
    );
    const input = tree.find('input');
    input.simulate("change");
    expect(onChange.mock.calls.length).toBe(1);
    // Gotta touch them all
    tree.find('select').at(0).simulate("change");
    tree.find('select').at(1).simulate("change");
    input.simulate("change").simulate("blur");
    expect(onBlur.mock.calls.length).toBe(1);
    tree.unmount();
  });
  it('should use undefined for onChange on empty input', () => {
    const onChange = jest.fn((id, name, value, event) => {
      expect(value).toBe(undefined);
    });
    const tree = mount(
      <DateWidget id="test" onChange={onChange} onBlur={noop}/>
    );
    const input = tree.find('input');
    input.simulate("change");
    expect(onChange.mock.calls.length).toBe(1);
    tree.unmount();
  });
});
