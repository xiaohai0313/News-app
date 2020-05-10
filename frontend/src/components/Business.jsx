import Page from './userhook'
import React from 'react';

function Business(props)
{
    return (<Page 
        sources={props.sources}
        local = {'business'}
        />
        )
}


export default Business;