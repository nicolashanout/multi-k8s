import React from 'react';

import {Link} from 'react-router-dom';

export default () => {
    return (
        <div>
            In Some Other Page.
            <Link to='/'> Go Back Home!</Link>
        </div>
    );
}