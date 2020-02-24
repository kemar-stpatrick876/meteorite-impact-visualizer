import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';
import { DataEditor } from './DataEditor';
import { MOCK_DATA } from '../../constants';
import { formattedDate } from '../../utils';

Enzyme.configure({ adapter: new Adapter() });
const info = MOCK_DATA[0];
const history = {
  goBack: jest.fn(),
  push: jest.fn()
};
const location = {
  state: {
    info
  }
};
const {
  name: originalName,
  recclass,
  mass,
  fall,
  year,
  reclat,
  reclong,
  nametype
} = info;
describe('DataEditor.js', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<DataEditor location={location} history={history} />);
  });
  afterEach(() => {
    history.goBack.mockClear();
  });
  test('should render', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('should have field with meteorite info  values ', () => {
    expect(wrapper.find('#name').props().value).toBe(originalName);
    expect(wrapper.find('#recclass').props().value).toBe(recclass);
    expect(wrapper.find('#mass').props().value).toBe(mass);
    expect(wrapper.find('#fall').props().value).toBe(fall);
    expect(wrapper.find('#year').props().value).toBe(formattedDate(year));
    expect(wrapper.find('#reclat').props().value).toBe(reclat);
    expect(wrapper.find('#reclong').props().value).toBe(reclong);
    expect(wrapper.find('#nametype').props().value).toBe(nametype);
  });

  test('Should reset state/form', () => {
    const component = mount(
      <DataEditor location={location} history={history} />
    );
    const input = component.find('#name');
    const newName = 'my new meteorite name';

    expect(input.prop('value')).toEqual(originalName);
    input.instance().value = newName;
    input.simulate('change');
    expect(component.state().meteorite.name).toEqual(newName);
    component.find('#resetBtn').simulate('click');
    expect(input.prop('value')).toEqual(originalName);
  });

  test('should submit meteorite data edit', () => {
    const mockDispatchProp = jest.fn();

    const component = mount(
      <DataEditor
        location={location}
        history={history}
        doPutMeteoriteData={mockDispatchProp}
      />
    );
    const nameInput = component.find('#name');
    const recClassSelect = component.find('#recclass');

    const newName = 'my new meteorite name';

    // make edits
    nameInput.instance().value = newName;
    nameInput.simulate('change');

    const optionAcapulcoite = component.find('#recclass option').at(0);
    optionAcapulcoite.instance().selected = true;
    recClassSelect.simulate('change');

    // submit form
    component.find('form.editor-form').simulate('submit');
    expect(mockDispatchProp.mock.calls.length).toBe(1);
    expect(mockDispatchProp.mock.calls[0][0]).toEqual({
      name: newName,
      recclass: 'Acapulcoite',
      id: '1'
    });

    expect(history.goBack.mock.calls.length).toBe(1);
  });

  test('should not submit meteorite data if not changes were made', () => {
    const mockDispatchProp = jest.fn();

    const component = mount(
      <DataEditor
        location={location}
        history={history}
        doPutMeteoriteData={mockDispatchProp}
      />
    );

    // submit form
    component.find('form.editor-form').simulate('submit');
    expect(mockDispatchProp.mock.calls.length).toBe(0);

    expect(history.goBack.mock.calls.length).toBe(1);
  });

  test('should handle year field changes', () => {
    const component = mount(
      <DataEditor location={location} history={history} />
    );

    expect(component.instance().state.meteorite.year).toBe('1880-01-01');

    component.instance().onYearFieldChange(moment('1980-01-01'));

    expect(component.instance().state.meteorite.year).toBe('1980-01-01');
  });
});
