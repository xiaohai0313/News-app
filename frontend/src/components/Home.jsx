import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import Page from './userhook'


function Home(props)
{
    return (<Page 
        sources={props.sources}
        local = {'home'}
        />
        )
}


export default Home;


