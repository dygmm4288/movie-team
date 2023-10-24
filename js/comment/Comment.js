import { append, create } from '../common/util.js';
export function Comment() {
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
  return append($form, [
    $commentInput,
    append($userInfoDiv, [$nickInput, $passwordInput, $confirmPasswordInput]),
  ]);
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
