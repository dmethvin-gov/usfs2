import React from 'react';
import { mount } from 'enzyme';
import CheckboxWidget, { CheckboxWidgetProps } from '../../src/widgets/CheckboxWidget';

function noop(){};

function makeCheckbox(p?: object) {
  const props: CheckboxWidgetProps = {
    onChange: noop, id: "id025", name: "test", label: "Check Me", ...p
  };
  return mount(<CheckboxWidget {...props}/>);
}

describe('<CheckboxWidget/>', () => {
  it('should render defaults', () => {
    const tree = makeCheckbox();
    const input = tree.find('input');
    expect(input.length).toBe(1);
    expect(tree.text()).toBe("Check Me");

    const node = (input.getDOMNode() as HTMLInputElement);
    expect(node.type).toBe("checkbox");
    expect(node.disabled).toBe(false);
    expect(node.name).toBe("test");
    expect(node.id).toBe("id025");
    tree.unmount();
  });
  it('should render name as id by default', () => {
    const tree = makeCheckbox({name: undefined});
    const node = (tree.find('input').getDOMNode() as HTMLInputElement);
    expect(node.name).toBe("id025");
    tree.unmount();
  });
  it('should render checked', () => {
    const tree = makeCheckbox({value: true});
    const node = (tree.find('input').getDOMNode() as HTMLInputElement);
    expect(node.checked).toBe(true);
    tree.unmount();
  });
  it('should call onChange', () => {
    let checkState: boolean;
    const onChange = jest.fn((id, name, value, event) => {
      expect(id).toBe("id025")
      expect(name).toBe("test")
      expect(value).toBe(checkState);
      expect(event.target.checked).toBe(checkState);
    });
    const tree = makeCheckbox({onChange});
    const input = tree.find('input');
    const node = (input.getDOMNode() as HTMLInputElement);
    node.click();
    checkState = true;
    input.simulate("change");
    expect(onChange.mock.calls.length).toBe(1);
    node.click();
    checkState = false;
    input.simulate("change");
    expect(onChange.mock.calls.length).toBe(2);
    tree.unmount();
  });
  it('should use optional title over label', () => {
    const tree = makeCheckbox({options: {title: "Really Check Me"}});
    expect(tree.text()).toBe("Really Check Me");
    tree.unmount();
  });
});
