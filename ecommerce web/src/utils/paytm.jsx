function isDate(val) {
    // Check if the value is a Date object
    return Object.prototype.toString.call(val) === '[object Date]';
}

function isObj(val) {
    // Check if the value is an object (but not null)
    return typeof val === 'object' && val !== null;
}

function stringifyValue(val) {
    // Convert objects (except Dates) to JSON strings, return other values as is
    if (isObj(val) && !isDate(val)) {
        return JSON.stringify(val);
    } else {
        return val;
    }
}

function buildForm({ action, params }) {
    // Validate action and params
    if (!action || typeof action !== 'string') {
        throw new Error('Invalid action: must be a non-empty string');
    }

    if (!params || typeof params !== 'object') {
        throw new Error('Invalid params: must be an object');
    }

    // Create a form element
    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', action);

    // Add hidden input fields for each parameter
    Object.keys(params).forEach(key => {
        const input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', key);
        input.setAttribute('value', stringifyValue(params[key]));
        form.appendChild(input);
    });

    return form;
}

export function post(details) {
    try {
        // Validate the details object
        if (!details || typeof details !== 'object' || !details.action || !details.params) {
            throw new Error('Invalid details: must include action and params');
        }

        // Debugging: Log the details object
        console.log('Submitting form with details:', details);

        // Build the form
        const form = buildForm(details);

        // Append the form to the document and submit it
        document.body.appendChild(form);
        form.submit();

        // Remove the form after submission
        form.remove();
    } catch (error) {
        // Log any errors that occur
        console.error('Error in post function:', error.message);
    }
}
