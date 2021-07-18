import { pnotifyNoMoreResponse, pnotifyInvalidResponse, pnotifyErrorResponse } from './pnotify';

export default class NewApiService {
  constructor() {
    this.BASE_URL = 'https://pixabay.com/api/';
    this.keyPixabay = '22386152-abae1819f5d508cdb2a741e4a';
    this.valueForSearch = '';
    this.image_type = 'photo';
    this.orientation = 'horizontal';
    this.numberPage = '1';
    this.per_page = '12';
    this.no_more_response = false;
  }

  getURLRequest() {
    return `${this.BASE_URL}?image_type=${this.image_type}&orientation=${this.orientation}&q=${this.valueForSearch}&page=${this.numberPage}&per_page=${this.per_page}&key=${this.keyPixabay}`;
  }

  async fetchGallery() {
    try {
      const response = await fetch(this.getURLRequest());
      const responseObject = await response.json();
      const array = await responseObject.hits;
      return this.makesValidationArray(array);
    } catch {
      pnotifyErrorResponse();
    }
  }

  setValueForSearch(value) {
    this.valueForSearch = value;
  }

  makesValidationArray(array) {
    if (array.length === 0 && this.numberPage === 1) {
      pnotifyInvalidResponse();
      this.no_more_response = true;
    }

    if (array.length === 0 && this.numberPage > 1) {
      pnotifyNoMoreResponse();
      this.no_more_response = true;
    }

    this.incrementPage();
    return array;
  }

  incrementPage() {
    this.numberPage += 1;
  }

  resetPage() {
    this.numberPage = 1;
  }
}
