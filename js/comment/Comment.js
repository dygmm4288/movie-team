import { Element } from '../common/Element.js';
import { getStorage, setStorage } from '../storage.js';
import { append, create } from '../util.js';
import {
  validateBasic,
  validateComment,
  validatePassword,
} from '../validation.js';
export function Comment(id) {
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
        !validateComment($commentInput.value),
        !validatePassword($passwordInput.value),
        !validateBasic($nickInput.value),
        $passwordInput.value !== $confirmPasswordInput.value,
      );
      if (
        !validateComment($commentInput.value) ||
        !validatePassword($passwordInput.value) ||
        !validateBasic($nickInput.value) ||
        $passwordInput.value !== $confirmPasswordInput.value
      )
        return errorHandler();
      const [nickname, password, comment] = [
        $nickInput,
        $passwordInput,
        $commentInput,
      ].map((v) => v.value);
      if (!getStorage(id)) {
        setStorage(id, []);
      }
      setStorage(
        id,
        getStorage(id).concat({ id: Date.now(), nickname, password, comment }),
      );
    };
    // 이벤트 할당
    $form.addEventListener('submit', handleEnrollComment);
    append($userInfoDiv, [$nickInput, $passwordInput, $confirmPasswordInput]);
    append($form, [$commentInput, $userInfoDiv, $submitButton]);
    return [
      $form,
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
<form class=“comment-form-container”>
    <input type=“text” class=“primary-input” id=“comment/>
    <div class=“user-info-container”>
        <input type=“text” class=“user-info-item” id=“nickname”/>
        <input type=“password” class=“user-info-item” id=“password”/>
        <input type=“password” class=“user-info-item” id=“confiromPassword”/>
    </div>
    <button class="comment-btn" type="submit">등록</button>
</form>
*/








