import React from 'react';

export const required = value => (value ? undefined : 'Field is required');

export const maxLength = max => value =>
    value && value.length > max ? `Field must has ${max} characters or less` : undefined;
