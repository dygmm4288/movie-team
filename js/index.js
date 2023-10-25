import { CommentList } from './comment/CommentList.js';

// document.body.insertAdjacentElement('afterbegin', Comment(123).render());
document.querySelector('#detail-page').append(CommentList(123).render());
