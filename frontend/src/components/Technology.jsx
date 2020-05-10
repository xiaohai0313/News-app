//import React, { useState, useEffect } from "react";
//import Card from "./Card";
//import axios from "axios";
import React from 'react';
import Page from './userhook';


function Technology(props)
{
    return (<Page 
        sources={props.sources}
        local = {'technology'}
        />
        )
}


export default Technology;


