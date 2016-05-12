var classNames = require('classnames');
var defaults = require('lodash.defaultsdeep');
var React = require('react');

var render = require('../../lib/render.jsx');

var Button = require('../../components/forms/button.jsx');
var Checkbox = require('../../components/forms/checkbox.jsx');
var CheckboxGroup = require('../../components/forms/checkbox-group.jsx');
var Form = require('../../components/forms/form.jsx');
var formset = require('../../components/forms/formset.jsx');
var FormSet = formset.FormSet;
var FormStep = formset.FormStep;
var Input = require('../../components/forms/input.jsx');
var Label = require('../../components/forms/label.jsx');
var Page = require('../../components/page/www/page.jsx');
var RadioGroup = require('../../components/forms/radio-group.jsx');
var Select = require('../../components/forms/select.jsx');
var TextArea = require('../../components/forms/textarea.jsx');

var COUNTRIES = require('./countries.json');
require('./teacherregistration.scss');


var UsernameStep = React.createClass({
    render: function () {
        return (
            <FormStep title="Create a Teacher Account"
                      description={
                        <p>
                            Creating a Teacher Account requires additional information
                            for review.
                            <strong>The approval process can take up to 24 hours</strong>
                        </p>}>
                <Form onValidSubmit={this.props.onNextStep} noValidate>
                    <Input label="Username"
                           type="text"
                           name="username"
                           validations={{
                               matchRegexp: /^[\w-]*$/,
                               minLength: 3,
                               maxLength: 20
                           }}
                           validationErrors={{
                               matchRegexp: 'Your username may only contain characters and -',
                               minLength: 'Usernames must be at least three characters',
                               maxLength: 'Usernames must be at most 20 characters'
                           }}
                           required />
                    <Input label="Password"
                           type="password"
                           name="password"
                           validations={{
                               minLength: 6,
                               notEquals: 'password',
                               notEqualsField: 'username'
                           }}
                           validationErrors={{
                               minLength: 'Passwords must be at least six characters',
                               notEquals: 'Your password may not be "password"',
                               notEqualsField: 'Your password may not be your username'
                           }}
                           required />
                    <Input label="Confirm Password"
                           type="password"
                           name="passwordConfirmation"
                           validations="equalsField:password"
                           validationError="The passwords do not match"
                           required/>
                    <Button type="submit">Next Step</Button>
                </Form>
            </FormStep>
        );
    }
});
var DemographicsStep = React.createClass({
    onSubmit: function () {
        this.props.onNextStep();
    },
    render: function () {
        var countryOptions = Object.keys(COUNTRIES).map(function (code) {
            return {value: code, label: COUNTRIES[code]};
        });
        var monthOptions = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ].map(function (label, id) {
            return {value: id+1, label: label};
        });
        var yearOptions = Array.apply(null, Array(100)).map(function (v, id) {
            var year = 2016 - id;
            return {value: year, label: year};
        });
        return (
            <FormStep title="Demographics"
                      description={
                        <p>
                            Your responses to these questions will be kept private.
                            Why do we ask for this information <a onClick={this.handle}>?</a>
                        </p>}>
                <Form onSubmit={this.onSubmit}>
                    <Select label="Birth Month" name="month" options={monthOptions} />
                    <Select label="Birth Yeah" name="year" options={yearOptions} />
                    <RadioGroup label="Gender"
                                name="gender"
                                options={[
                                    {value: 'female', label: 'Female'},
                                    {value: 'male', label: 'Male'},
                                    {value: 'other', label: 'Other'}
                                ]}
                    />
                    <Input name="genderOther" type="text" />
                    <Select label="Country" name="country" options={countryOptions} />
                    <Button type="submit">Next Step</Button>
                </Form>
            </FormStep>
        );
    }
});
var NameStep = React.createClass({
    onSubmit: function () {
        this.props.onNextStep();
    },
    render: function () {
        return (
            <FormStep title="First &amp; Last Name"
                      description={
                        <p>
                            Your responses to these questions will be kept private.
                            Why do we ask for this information <a onClick={this.handle}>?</a>
                        </p>}>
                <Form onSubmit={this.onSubmit}>
                    <Label htmlFor="first">First Name</Label>
                    <Input type="text" name="first" />
                    <Label htmlFor="last">Last Name</Label>
                    <Input type="text" name="last" />
                    <Button type="submit">Next Step</Button>
                </Form>
            </FormStep>
        );
    }
});
var PhoneNumberStep = React.createClass({
    onSubmit: function () {
        this.props.onNextStep();
    },
    render: function () {
        return (
            <FormStep title="Phone Number"
                      description={
                        <p>
                            Your responses to these questions will be kept private.
                            Why do we ask for this information <a onClick={this.handle}>?</a>
                        </p>}>
                <Form onSubmit={this.onSubmit}>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input type="tel" name="phone" />
                    <Checkbox name="phoneConsent" />
                    <Label htmlFor="phoneConsent">
                        Yes, I consent to lorem ipsum dolor sit amet,
                        consectetur adipiscing elit.
                    </Label>
                    <Button type="submit">Next Step</Button>
                </Form>
            </FormStep>
        );
    }
});
var OrganizationStep = React.createClass({
    onSubmit: function () {
        this.props.onNextStep();
    },
    render: function () {
        var organizationOptions = [
            'Elementary School', 'Middle School', 'High School', 'University / College',
            'Museum', 'Library', 'Camp'
        ].map(function (type) { return {value: type, label: type}; });
        return (
            <FormStep title="Organization"
                      description={
                        <p>
                            Your responses to these questions will be kept private.
                            Why do we ask for this information <a onClick={this.handle}>?</a>
                        </p>}>
                <Form onSubmit={this.onSubmit}>
                    <Label htmlFor="organization">Organization</Label>
                    <Input type="text" name="organization" />
                    <Label htmlFor="title">Title / Position</Label>
                    <Input type="text" name="title" />
                    <CheckboxGroup label="Type of Organization"
                                   options={organizationOptions} />
                    <Checkbox name="organizationType" value="other" />
                    <Input type="text" name="organizationTypeOther" />
                    <Label htmlFor="website">Website URL (not required)</Label>
                    <Input type="url" name="website" />
                    <Button type="submit">Next Step</Button>
                </Form>
            </FormStep>
        );
    }
});
var AddressStep = React.createClass({
    onSubmit: function () {
        this.props.onNextStep();
    },
    render: function () {
        var countryOptions = Object.keys(COUNTRIES).map(function (code) {
            return {value: code, label: COUNTRIES[code]};
        });
        var stateOptions = ['every','state','in','the','world'].map(function (name) {
            return {value: name, label: name};
        });
        return (
            <FormStep title="Address"
                      description={
                        <p>
                            Your responses to these questions will be kept private.
                            Why do we ask for this information <a onClick={this.handle}>?</a>
                        </p>}>
                <Form onSubmit={this.onSubmit}>
                    <Label htmlFor="addressCountry">Country</Label>
                    <Select name="addressCountry" options={countryOptions} />
                    <Label htmlFor="addressLine1">Address Line 1</Label>
                    <Input type="text" name="addressLine1" />
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input type="text" name="addressLine2" />
                    <Label htmlFor="addressCity">City</Label>
                    <Input type="text" name="addressCity" />
                    <Label htmlFor="addressZip">Zip Code</Label>
                    <Input type="text" name="addressZip" />
                    <Label htmlFor="addressState">State / Province</Label>
                    <Select name="addressState" options={stateOptions} />
                    <Button type="submit">Next Step</Button>
                </Form>
            </FormStep>
        );
    }
});
var UseScratchStep = React.createClass({
    onSubmit: function () {
        this.props.onNextStep();
    },
    render: function () {
        return (
            <FormStep title="How do you use Scratch?"
                      description={
                        <p>
                            Tell us a little how you plan to use Scratch.
                            Why do we ask for this information <a onClick={this.handle}>?</a>
                        </p>}>
                <Form onSubmit={this.onSubmit}>
                    <Label htmlFor="useScratch">How do you use Scratch?</Label>
                    <TextArea name="useScratch" />
                    <Button type="submit">Next Step</Button>
                </Form>
            </FormStep>
        );
    }
});
var EmailStep = React.createClass({
    onSubmit: function () {
        this.props.onNextStep();
    },
    render: function () {
        return (
            <FormStep title="Email Address"
                      description={
                        <p>
                            We will send you a <strong>confirmation email</strong> that will
                            allow you to access your Scratch Teacher Account.
                        </p>}>
                <Form onSubmit={this.onSubmit}>
                    <Label htmlFor="email">Email</Label>
                    <Input type="text" name="email" />
                    <Label htmlFor="confirmEmail">Confirm Email</Label>
                    <Input type="text" name="confirmEmail" />
                    <Button type="submit">Next Step</Button>
                </Form>
            </FormStep>
        );
    }
});
var LastStep = React.createClass({
    render: function () {
        return (
            <FormStep title="Almost Done"
                      description={
                        <p>
                            Lorem ipsum dolor sit amet
                        </p>}>
                <div className="confirm">
                    <h2>Confirm Your Email</h2>
                    <p>
                        Click the link in the confirmation email that we
                        sent to the following address:<br />
                        <strong>{this.state.email}</strong>
                    </p>
                    <div className="box-footer">
                        <a onClick="">Wrong email?</a>
                        <a onClick="">Having trouble?</a>
                    </div>
                </div>
                <div className="wait">
                    <h2>Wait for Approval</h2>
                    <p>
                        Your information is being reviewed. Please be
                        patient, the approval process can take up to 24hrs.
                    </p>
                </div>
            </FormStep>
        );
    }
});


var TeacherRegistration = React.createClass({
    type: 'TeacherRegistration',
    getInitialState: function () {
        return {
            step: 0,
            formData: {}
        };
    },
    setStep: function (step) {
        this.setState({step: step});
    },
    advanceStep: function (formData) {
        formData = formData || {};
        this.setState({
            step: this.state.step + 1,
            formData: defaults({}, formData, this.state.formData)
        });
    },
    render: function () {
        var classes = classNames(
            'teacher-registration',
            'inner',
            this.props.className);
        return (
            <div {...this.props} className={classes}>
                <FormSet {... this.props}
                         step={this.state.step}>
                    <UsernameStep onNextStep={this.advanceStep} />
                    <DemographicsStep onNextStep={this.advanceStep} />
                    <NameStep onNextStep={this.advanceStep} />
                    <PhoneNumberStep onNextStep={this.advanceStep} />
                    <OrganizationStep onNextStep={this.advanceStep} />
                    <AddressStep onNextStep={this.advanceStep} />
                    <UseScratchStep onNextStep={this.advanceStep} />
                    <EmailStep onNextStep={this.advanceStep} />
                    <LastStep />
                </FormSet>
            </div>
        );
    }
});

render(<Page><TeacherRegistration /></Page>, document.getElementById('app'));
