import { storiesOf } from '@storybook/react';
import Form from './Form';
var field1 = {
    _uid: '123',
    component: 'form_textfield',
    label: 'First text',
    name: 'first'
};
var field2 = {
    _uid: '1123',
    component: 'form_textfield',
    label: 'Second text',
    name: 'second'
};
var email = {
    _uid: '123123',
    component: 'form_textfield',
    label: 'Email',
    name: 'email',
    required: true
};
var select = {
    _uid: '234234',
    component: 'form_select',
    name: 'select',
    label: 'Select',
    options: [{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }]
};
var check = {
    _uid: '2314124',
    component: 'form_checkbox',
    label: 'Checkbox',
    name: 'check'
};
var button = {
    _uid: '23423',
    component: 'button',
    label: 'Submit'
};
var props = {
    _uid: '123312',
    component: 'form',
    body: [field1, field2, email, select, check, button]
};
var props2 = {
    _uid: '3545234',
    component: 'form',
    border: ['outlined'],
    body: [field1, field2, email, select, check, button]
};
var props3 = {
    _uid: '32424322',
    component: 'form',
    border: ['shaped'],
    body: [field1, field2, email, select, check, button]
};
storiesOf('Form', module)
    .add('Form', function () { return (<>
        <Form content={props}/>
      </>); })
    .add('Outlined Form', function () { return (<>
        <Form content={props2}/>
      </>); })
    .add('Shaped Form', function () { return (<>
        <Form content={props3}/>
      </>); });
