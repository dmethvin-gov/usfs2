import React from 'react';
import { mount } from 'enzyme';
import RadioWidget from '../../src/widgets/RadioWidget';

function noop(){};

describe('<RadioWidget/>', () => {
  it('should render defaults', () => {
    const tree = mount(
      <RadioWidget id="test" onChange={noop}
        options={{
          enumOptions: [
            { value: 1, label: "One" },
            { value: 2, label: "Two" }
          ]
        }}
      />
    );
    const radios = tree.find('input');
    expect(radios.length).toBe(2);

    const node1 = (radios.at(0).getDOMNode() as any);
    expect(node1.type).toBe("radio");
    expect(node1.value).toBe("1");
    expect(node1.disabled).toBe(false);
    expect(node1.checked).toBe(false);
    expect(node1.name).toBe("test");

    const node2 = (radios.at(1).getDOMNode() as any);
    expect(node2.type).toBe("radio");
    expect(node2.value).toBe("2");
    expect(node2.disabled).toBe(false);
    expect(node2.checked).toBe(false);
    expect(node2.name).toBe("test");

    const labels = tree.find("label");
    expect(labels.at(0).text()).toBe("One");
    expect(labels.at(1).text()).toBe("Two");

    tree.unmount();
  });
  it('should render initial value', () => {
    const tree = mount(
      <RadioWidget id="test" value="2" onChange={noop}
        options={{
          enumOptions: [
            { value: "1", label: "One" },
            { value: "2", label: "Two" }
          ]
        }}
      />
    );
    const radios = tree.find('input');
    const node2 = (radios.at(1).getDOMNode() as any);
    expect(node2.checked).toBe(true);
    tree.unmount();
  });
  it('should process options.labels', () => {
    const tree = mount(
      <RadioWidget id="test" onChange={noop}
        options={{
          enumOptions: [
            { value: "1", label: "One" },
            { value: "2", label: "Two" },
            { value: "3", label: "Three" }
          ],
          labels: { "1": "RealOne", "3": "RealThree" }
        }}
      />
    );
    const labels = tree.find('label');
    expect(labels.at(0).text()).toBe("RealOne");
    expect(labels.at(1).text()).toBe("Two");
    expect(labels.at(2).text()).toBe("RealThree");
    tree.unmount();
  });
  it('should call onChange', () => {
    const onChange = jest.fn((id, name, value, event) => {
      expect(id).toBe("test");
      expect(value).toBe("2");
    });
    const tree = mount(
      <RadioWidget id="test" onChange={onChange}
        options={{
          enumOptions: [
            { value: 1, label: "One" },
            { value: 2, label: "Two" }
          ]
        }}
      />
    );
    const radio2 = tree.find("input").at(1); // "Two"
    radio2.simulate("click");
    radio2.simulate("change");
    expect(onChange.mock.calls.length).toBe(1);
    tree.unmount();
  });
});
