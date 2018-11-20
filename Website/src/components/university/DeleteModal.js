import React from 'react';

var Confirm = require('react-confirm-bootstrap');
var ConfirmAction = React.createClass({
    onConfirm() {
        // Preform your action.
    },

    render() {
        return (
            <Confirm
                onConfirm={this.onConfirm}
                body="Are you sure you want to delete this?"
                confirmText="Confirm Delete"
                title="Deleting Stuff">
                <button>Delete Stuff</button>
            </Confirm>
        )
    },
});