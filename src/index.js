import './sass/main.scss';
import a from 'lodash.debounce';
import fetchCountries from './fetchCountries.js';
import  cardRender from './country_card.hbs';
import {notice, defaults, Stack} from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';

const inputRef = document.querySelector('[name="country"]');
const countryListRef = document.querySelector('ul#country-list');
const noticeBox = document.querySelector('div#notice');

const myStack = new Stack({
  dir1: 'up',
  context: noticeBox
});

defaults.closer = false;
defaults.sticker =  false;
defaults.delay =  3000;

const filterResult = function (searchResult) {
    if(searchResult.length > 10) {
      return notice ({
        title: 'Too many matches found.',
        text: 'Please enter a more specific query!',
        animation: 'none',
        stack: myStack,
      });
    };

    if(searchResult.length >= 2 && searchResult.length <= 10) {
      const searchList = searchResult.map(result => 
        `<li style= "background-color: white; margin-bottom: 30px; padding-left: 10px; padding-right: 8px; border-radius: 10px; font-size: 30px; font-weight: 500; display: flex; justify-content:center; list-style: none;">${result.name}</li>`
        ).join('');
      return countryListRef.innerHTML = searchList;
    };

    if(searchResult.length === 1) {
      countryListRef.innerHTML = '';
      countryListRef.style.display = 'flex'; 
      countryListRef.style.justifyContent = 'center';
      countryListRef.style.backgroundColor = 'white';
      countryListRef.insertAdjacentHTML('beforeend', cardRender(searchResult[0]));
    };
    return;
  };

  const onCountryNameSearch = function () {
    let inputValue = inputRef.value;
    countryListRef.style.display = 'block'; 
    countryListRef.style.backgroundColor = '';
    countryListRef.innerHTML = '';
  
   return  fetchCountries(inputValue).then(filterResult).catch(()=>console.log('ERROR!')); 
  };
    
  inputRef.addEventListener('input', a(onCountryNameSearch, 500));
