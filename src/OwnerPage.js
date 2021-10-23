import React from 'react';

export function OwnerPage(props)
{
    const { username } = props;

    return (
        <div>
            <h1>Hi {username}!</h1>
            <p>You're logged in! This is a <b>Owner</b> page.</p>
        </div>
    );
}