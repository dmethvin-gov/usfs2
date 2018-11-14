import React from 'react';
import { mount } from 'enzyme';
import SelectWidget from '../../src/widgets/SelectWidget';

function noop(){};

describe('<SelectWidget/>', () => {
  it('should render defaults', () => {
    const tree = mount(
      <SelectWidget id="test" onChange={noop} onBlur={noop}
        options={{
          enumOptions: [
            { value: 1, label: "One" },
            { value: 2, label: "Two" }
          ]
        }}
      />
    );
    const select = tree.find('select');
    expect(select.length).toBe(1);

    const node = (select.getDOMNode() as any);
    expect(node.value).toBe("");
    // Placeholder is automatically injected if no initial value
    expect(node.options.length).toBe(3);
    expect(node.disabled).toBe(false);
    expect(node.name).toBe("test");
    expect(node.id).toBe("test");
    tree.unmount();
  });
  it('should render optional values', () => {
    const tree = mount(
      <SelectWidget id="test" value="initial" onChange={noop} onBlur={noop}
        options={{
          enumOptions: [
            { value: "1", label: "One" },
            { value: "2", label: "Two" },
            { value: "initial", label: "Initial" }
          ]
        }}
      />
    );
    const select = tree.find('select');
    expect(select.length).toBe(1);

    const node = (select.getDOMNode() as any);
    expect(node.value).toBe("initial");
    expect(node.selectedIndex).toBe(2); // 0-based
    // No placeholder entry should have been added
    expect(node.options.length).toBe(3);
    tree.unmount();
  });
  it('should process options.labels', () => {
    const tree = mount(
      <SelectWidget id="test" onChange={noop} onBlur={noop}
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
    const select = tree.find('select');
    const options = select.find("option");
    expect(options.at(1).text()).toBe("RealOne");
    expect(options.at(2).text()).toBe("Two");
    expect(options.at(3).text()).toBe("RealThree");
    tree.unmount();
  });
  it('should call onChange and onBlur', () => {
    const onChange = jest.fn(v => {
      expect(v).toBe(undefined);
    });
    const onBlur = jest.fn(v => {
      expect(v).toBe("test");
    })
    const tree = mount(
      <SelectWidget id="test" onChange={onChange} onBlur={onBlur}
        options={{
          enumOptions: [
            { value: 1, label: "One" },
            { value: 2, label: "Two" }
          ]
        }}
      />
    );
    const select = tree.find('select');
    const option = select.find("option").at(2); // "Two"
    option.simulate("click");
    select.simulate("blur");
    select.simulate("change");
    expect(onBlur.mock.calls.length).toBe(1);
    expect(onChange.mock.calls.length).toBe(1);
    tree.unmount();
  });
  it('should use undefined for onChange on empty input', () => {
    const onChange = jest.fn(v => {
      expect(v).toBe(undefined);
    });
    const tree = mount(
      <SelectWidget id="test" onChange={onChange} onBlur={noop}
        options={{
          enumOptions: [
            { value: 1, label: "One" },
            { value: 2, label: "Two" }
          ]
        }}
      />
    );
    const select = tree.find('select');
    // Placeholder ("") still selected
    select.simulate("change");
    expect(onChange.mock.calls.length).toBe(1);
    tree.unmount();
  });
  it('should handle select-multiple', () => {
    let expected: string|undefined;
    const onChange = jest.fn(v => {
      expect(v).toBe(expected);
    });
    const tree = mount(
      <SelectWidget id="test" onChange={onChange} onBlur={noop}
        multiple={true}
        options={{
          enumOptions: [
            { value: 1, label: "One" },
            { value: 2, label: "Two" },
            { value: 3, label: "Three" }
          ]
        }}
      />
    );
    // No initial value so placeholder is added at 0
    const select = tree.find('select');
    // Placeholder is empty so undefined
    expected = undefined;
    select.simulate("change");
    //TODO: why doesn't a click event select these?
    const option1 = select.find("option").at(1);  // "One"
    (option1.getDOMNode() as any).selected = true;
    const option2 = select.find("option").at(3);  // "Three"
    (option2.getDOMNode() as any).selected = true;
    // Selected two options
    expected = "1,3";
    select.simulate("change");
    expect(onChange.mock.calls.length).toBe(2);
    tree.unmount();
  });
});
