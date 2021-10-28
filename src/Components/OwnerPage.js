//
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { axiosWithAuth } from '../Utils/axiosWithAuth';


function Account(props) {
    const { username } = props;

    return (
        <div>
            <h1>Hi {username}!</h1>
            <p>You're logged in! This is a <b>Owner</b> page.</p>
        </div>
    );
}
export default (Account);
