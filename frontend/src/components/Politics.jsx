import Page from './userhook'
import React from 'react';

function Politics(props)
{
    return (<Page 
        sources={props.sources}
        local = {'politics'}
        />
        )
}


export default Politics;
