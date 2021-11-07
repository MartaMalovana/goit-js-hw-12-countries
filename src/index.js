import './sass/main.scss';
import a from 'lodash.debounce';

import {notice} from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';

const inputRef = document.querySelector('[name="country"]');

const onCountryNameSearch = function () {
  const inputValue = inputRef.value;
  console.log(inputValue);

  const filterResult = function (searchResult) {
    if(searchResult.length > 5) {
      return notice ({
        title: 'Too many matches found.',
        text: 'Please enter a more specific query!',
        animation: 'none',
      });
    };
  };

  const searchCountryByName = function (name) {
    const url = `https://restcountries.com/v2/name/${name}`;
    return fetch(url).then(a => a.json()).then(filterResult).catch(()=>console.log('bad'));
  };

  searchCountryByName (inputValue); 

};

inputRef.addEventListener('input', a(onCountryNameSearch, 500));

