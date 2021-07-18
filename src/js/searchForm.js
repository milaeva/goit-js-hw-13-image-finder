import refs from './refs';
import markupSearchForm from '../templates/searchFormTpl.hbs';
import NewApiService from './apiService';
import { clearGallery, makeMarkupGallery } from './gallery';
import actionButtonLoadMore from './btnMoreLoad';

const debounce = require('lodash.debounce');

const newApiService = new NewApiService();

const actionSearchForm = {
  checkForResponses() {
    return newApiService.no_more_response
      ? (actionButtonLoadMore.disable(), actionButtonLoadMore.loadMoreTextContent())
      : (actionButtonLoadMore.enable(), actionButtonLoadMore.loadMoreTextContent());
  },

  addEventListenerSearchForm() {
    const searchInputRef = document.querySelector('.search-field__input');
    searchInputRef.addEventListener('input', debounce(actionSearchForm.getValueForSearch, 1000));
  },

  createSearchForm() {
    refs.searchForm.innerHTML = markupSearchForm();
  },

  hiddenSearchForm() {
    refs.searchButton.classList.add('is-hidden');
  },

  makeActiveSearchForm() {
    actionSearchForm.createSearchForm();
    actionSearchForm.addEventListenerSearchForm();
    actionSearchForm.hiddenSearchForm();
    actionButtonLoadMore.visibility();
    actionButtonLoadMore.disable();
  },

  getValueForSearch(e) {
    const value = e.target.value.trim();
    if (!value) {
      return clearGallery();
    }
    actionButtonLoadMore.disable();
    actionButtonLoadMore.loadTextContent();
    newApiService.setValueForSearch(value);
    clearGallery();
    newApiService.resetPage();
    newApiService.no_more_response = false;
    newApiService.fetchGallery().then(array => {
      makeMarkupGallery(array);
    });
    setTimeout(() => {
      actionSearchForm.checkForResponses();
      actionButtonLoadMore.onScroll();
    }, 500);
  },
};

refs.searchButton.addEventListener('click', actionSearchForm.makeActiveSearchForm);

export { newApiService };
