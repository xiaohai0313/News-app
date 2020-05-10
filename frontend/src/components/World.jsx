import React from 'react';
import Page from './userhook';


function World(props)
{
    return (<Page 
        sources={props.sources}
        local = {'world'}
        />
        )
}

export default World;