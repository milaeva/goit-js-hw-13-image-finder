import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const { error } = require('@pnotify/core');

const invalidMessage = 'Sorry we couldn’t find anything =/. Change your request, please!';
const errorMessage = 'Sorry, but we can’t get an answer now. Please try again later.';
const noMoreMessage = 'Sorry, we haven’t found anything else. You can send a new request!';

const pnotify = text => {
  const options = {
    text,
    styling: 'brighttheme',
    icons: 'brighttheme',
    animation: 'fade',
    animateSpeed: 'slow',
    delay: 2000,
    width: '350px',
    sticker: false,
    maxTextHeight: null,
  };
  error(options);
};

const pnotifyInvalidResponse = () => pnotify(invalidMessage);
const pnotifyErrorResponse = () => pnotify(errorMessage);
const pnotifyNoMoreResponse = () => pnotify(noMoreMessage);

export { pnotifyInvalidResponse, pnotifyErrorResponse, pnotifyNoMoreResponse };