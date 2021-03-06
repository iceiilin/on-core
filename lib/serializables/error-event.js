// Copyright 2015, EMC, Inc.

'use strict';

module.exports = ErrorEventFactory;

ErrorEventFactory.$provide = 'ErrorEvent';
ErrorEventFactory.$inject = [
    'Assert',
    'Serializable'
];

function ErrorEventFactory (assert, Serializable) {
    function ErrorEvent (_error) {
        var error = {};
        if (_error !== undefined) {
            error.name = _error.name;
            error.message = _error.message;
            error.stack = _error.stack;
            error.context = _error.context || {};
            if (_error.status) {
                error.status = _error.status;
            }
        }
        Serializable.call(
            this,
            ErrorEvent.schema,
            // Chai As Promised will instantiate an empty ErrorEvent
            // in checks against error types such as the following:
            //   this.promise.should.be.rejectedWith(ErrorEvent)
            error
        );
    }

    ErrorEvent.schema = {
        id: 'ErrorEvent',
        type: 'object',
        properties: {
            name: {
                type: 'string'
            },
            message: {
                type: 'string'
            },
            stack: {
                type: 'string'
            },
            context: {
                type: 'object'
            },
            status: {
                type: 'number'
            }
        },
        required: [ 'name', 'message', 'stack', 'context' ]

    };

    Serializable.register(ErrorEventFactory, ErrorEvent);

    return ErrorEvent;
}

