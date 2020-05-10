import React,{useState} from "react";
import AsyncSelect from 'react-select/async';
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom"

function Autosuggest(props) {
  
  let curValue = null;
  let location = useLocation();
  if (location.pathname.substring(0,7) === '/search') 
  {
    curValue = {value:location.pathname.substring(8,),label:location.pathname.substring(8,)}
  }
  else
  {
    curValue =  null
  }
  
  // Free Api key limit 1s / call
  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  }

  const promiseOptions = (inputValue,callback) => {
    if (inputValue == "" || inputValue===null) {
      return {
        value: '',
        label: ''
      }
    }
    const url = `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q=${inputValue}`;
    axios.get(url, {
      method: 'GET',
      headers: {
        "Ocp-Apim-Subscription-Key": "9c85981dd8db40a8b68540a9f9141e1a"
      }
    })
      .then(function (response) {
        const results = response.data.suggestionGroups[0].searchSuggestions;
        let options = results.map(function (result) {
          return {
            value: result.displayText,
            label: result.displayText
          }
        })
        callback(options);
      })
      .catch(err => {
        console.log('some error', err);
      });
  };
  
  let history = useHistory();
  function openSearch(selectValue)
  {
    history.push({ pathname: "/search/" + selectValue.value, state: { keyword: selectValue.value, source: props.source } });
  }
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'black' : 'black',
      padding: 12,
    })}
  const noOptionsMessage = (inputValue) => {
      return (<span style={{textAlign:'center'}}>No Match</span>)
  }
  
  return (
    <AsyncSelect 
      onChange={openSearch}
      //cacheOptions={null}
      loadOptions={debounce(promiseOptions,1000) }
      //loadOptions={promiseOptions}
      placeholder={"Enter keyword .."}
      noOptionsMessage ={noOptionsMessage}
      styles={customStyles}
      value={curValue}
    />
  )
}

export default Autosuggest