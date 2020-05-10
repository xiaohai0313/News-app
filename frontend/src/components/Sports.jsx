import Page from './userhook'
import React from 'react';

function Sports(props)
{
    var sp = '';
    if (props.sources ==='G')
    {
        sp = 'sport';
    }
    else {sp='sports'}
    return (<Page 
        sources={props.sources}
        local = {sp}
        />
        )
}


export default Sports;