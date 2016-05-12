var classNames = require('classnames');
var FRCCheckbox = require('formsy-react-components').Checkbox;
var React = require('react');

var Checkbox = React.createClass({
    type: 'Checkbox',
    render: function () {
        var classes = classNames(
            'checkbox',
            this.props.className
        );
        return (
            <FRCCheckbox {... this.props} className={classes} />
        );
    }
});

module.exports = Checkbox;
