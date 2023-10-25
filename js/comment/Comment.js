import { Element } from '../common/Element.js';
import { setStorage } from '../storage.js';
import { append, create } from '../util.js';
import {
  validateBasic,
  validateComment,
  validatePassword,
} from '../validation.js';
export function Comment() {
  return new Element(() => {
    const $form = create('form', 'comment-form-container');
    const $commentInput = create('input', 'primary-input', 'comment', {
      type: 'text',
      placeholder: '댓글을 작성해주세요',
    });
    const $userInfoDiv = create('div', 'user-info-container');

    const $nickInput = create('input', 'user-info-item', 'nickname', {
      type: 'text',
      placeholder: '닉네임을 입력해주세요',
    });
    const $passwordInput = create('input', 'user-info-item', 'password', {
      type: 'password',
      placeholder: '비밀번호를 입력해주세요',
    });
    const $confirmPasswordInput = create(
      'input',
      'user-info-item',
      'confirmPasswordInput',
      {
        type: 'password',
        placeholder: '비밀번호를 다시 한번 입력해주세요',
      },
    );
    const $submitButton = create('button', 'comment-btn', '', {
      type: 'submit',
    });
    $submitButton.innerText = '등록';

    // 이벤트 핸들러
    const errorHandler = () => {
      alert('error');
    };
    const handleEnrollComment = (e) => {
      e.preventDefault();

      // 유효성 검사
      console.log(
        validateComment($commentInput.value),
        validatePassword($passwordInput),
        validateBasic($nickInput),
        $passwordInput.value !== $confirmPasswordInput,
      );
      if (
        !validateComment($commentInput.value) ||
        !validatePassword($passwordInput) ||
        !validateBasic($nickInput) ||
        $passwordInput.value !== $confirmPasswordInput
      )
        return errorHandler();

      // 유효성 검사가 완료한 이후에는 ...
      // 로컬 스토리지에 등록을 해야 한다.
      // comment를 추가를 해야하는데... localStorage에 어떻게 데이터가
      // 들어가지?
      // 그냥 comment만 ㄴ한다?
      // 객체의 형태가 들어가야 하고
      /*  {
            nickname: string;
            password: string; // dㅣ거 나중에 해시해서 넣을 수 있어야 겟다.
            comment: string;
            id : string;
            // 코멘트를 구분할 수 있는 건 뭐가 잇을까? 
            // 코멘트 내에서도 id가 필요한데 ... 
         } */

      const [nickname, password, comment] = [
        $nickInput,
        $passwordInput,
        $commentInput,
      ].map((v) => v.value);
      setStorage(id, { nickname, password, comment, id: Date.now() }, () =>
        Array.prototype.concat.apply(...arguments),
      );
    };

    // 이벤트 할당
    $form.addEventListener('submit', handleEnrollComment);

    return [
      append($form, [
        $commentInput,
        append($userInfoDiv, [
          $nickInput,
          $passwordInput,
          $confirmPasswordInput,
        ]),
        $submitButton,
      ]),
      [
        {
          type: 'submit',
          element: $form,
          handlerFunc: handleEnrollComment,
        },
      ],
    ];
  });
}

/* 
<form class="comment-form-container">
    <input type="text" class="primary-input" id="comment/>
    <div class="user-info-container">
        <input type="text" class="user-info-item" id="nickname"/>
        <input type="password" class="user-info-item" id="password"/>
        <input type="password" class="user-info-item" id="confiromPassword"/>
    </div>    
</form>
*/
