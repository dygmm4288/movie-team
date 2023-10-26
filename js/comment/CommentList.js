import { Element } from '../common/Element.js';
import { getStorage, setStorage } from '../storage.js';
import { append, create, select } from '../util.js';
import { validateBasic } from '../validation.js';

export function CommentList(id) {
  return new Element(() => {
    const $listWrapper = create('ul', 'comment-list-wrapper');
    const commentLists = getStorage(id);
    let commentItems = [];
    // updateComment(commetId:name,commentText: text)
    const updateComment = (commentId, commentText) => {
      console.log(commentId, commentText);
      const comments = getStorage(id);

      if (!comments) return null;
      const nextComments = comments.map((comment) => {
        if (comment.id !== commentId) return comment;
        return {
          ...comment,
          comment: commentText,
        };
      });
      setStorage(id, nextComments);
      render(nextComments);
    };
    const removeComment = (commentId, password) => {
      const comments = getStorage(id);
      if (!comments) return;
      let success = false;
      let nextComments = comments.filter((comment) => {
        if (comment.id === commentId) {
          if (password === comment.password) {
            success = true;
            return false;
          }
          return true;
        }
        return true;
      });
      if (!success) {
        console.error('삭제에 실패했습니다.');
        alert('비밀번호가 일치하지 않습니다!');
        return;
      }
      setStorage(id, nextComments);
      render(nextComments);
    };
    const render = (commentLists) => {
      commentItems.forEach((commentItem) => commentItem.remove());
      $listWrapper.innerHTML = '';
      commentItems = commentLists?.map(
        ({ comment, id, password, nickname }) => {
          const item = CommentListItem(
            id,
            comment,
            nickname,
            password,
            updateComment,
            removeComment,
          );
          $listWrapper.appendChild(item.render());
          return item;
        },
      );
    };
    render(commentLists);
    return [$listWrapper];
  });
}
function CommentListItem(
  id,
  comment,
  nickname,
  password,
  updateComment,
  removeComment,
) {
  return new Element(() => {
    const $commentItem = create('li', 'comment-list-item');
    const $comment = create('p', 'comment-desc');
    const $updateComment = create('textarea', 'comment-desc');
    const $modalWrapper = select('#confirm-modal');

    const $controlWrapper = create('div', 'control-wrapper');
    const $nickSpan = create('span', 'comment-span');
    const $updateBtn = create('button', 'comment-update-btn');
    const $removeBtn = create('button', 'comment-remove-btn');

    $comment.innerText = comment;
    $updateBtn.innerText = '수정';
    $removeBtn.innerText = '삭제';
    $nickSpan.innerText = nickname;

    function convert(a, b) {
      // remove a and b insert after begin
      a.remove();
      $commentItem.insertAdjacentElement('afterbegin', b);
    }
    /* const processForm = (func) => {
        const $modalForm = CommentConfirmForm(
            func,
            handlerCanclebutton,
            password,
          ).render();
          $modalWrapper.innerHTML = '';
          append($modalWrapper, $modalForm);
    } */
    function enrollModalForm(controlFunc) {
      const $modalForm = CommentConfirmForm(
        controlFunc,
        handlerCancleButton,
        password,
      );
      $modalWrapper.innerHTML = '';

      append($modalWrapper, $modalForm.render());
    }

    const handleUpdate = () => {
      // update를 하기 위해서는
      // 업데이트하고자 하는 텍스트로 변경이 되어야 한다.

      const isCanUpdate = $commentItem.querySelector('p');
      const prevValue = $comment.innerText;
      if (isCanUpdate) {
        // "수정" 상태라면
        enrollModalForm(() => {
          $updateComment.value = $comment.innerText;
          convert($comment, $updateComment);
          $updateBtn.innerText = '수정 완료';
          handlerCancleButton();
        });

        return;
      }
      // 이미 변화돼어있는 상태라면

      const nextValue = $updateComment.value;
      $updateBtn.innerText = '수정';
      convert($comment, $updateComment);
      if (prevValue === nextValue || !validateBasic(nextValue)) {
        // 내용의 변화가 없다면
        $comment.innerText = prevValue;
        convert($updateComment, $comment);
        return;
      }
      // 내용의 변화가 있다면
      updateComment(id, nextValue);
    };
    const handleRemove = () => {
      enrollModalForm(() => {
        // 여기서는 만약 비밀번호가 일치한다면
        removeComment(id, password);
        handlerCancleButton();
      });
    };
    const handlerCancleButton = () => {
      $modalWrapper.innerHTML = '';
    };

    $updateBtn.addEventListener('click', handleUpdate);
    $removeBtn.addEventListener('click', handleRemove);
    append($controlWrapper, [$updateBtn, $removeBtn]);
    append($commentItem, [$comment, $controlWrapper]);

    return [
      $commentItem,
      [
        { type: 'click', element: $updateBtn, handlerFunc: handleUpdate },
        { type: 'click', element: $removeBtn, handlerFunc: handleRemove },
      ],
    ];
  });
}
function CommentConfirmForm(controlFunction, handlerCancleButton, password) {
  return new Element(() => {
    const $form = create('form', 'confirm-modal-form');
    const $input = create(
      'input',
      'confirm-modal-input',
      'confirm-modal-input',
      {
        type: 'password',
        placeholder: '비밀번호를 입력해 주세요',
      },
    );
    const $submitButton = create('button', 'confirm-button', '', {
      type: 'submit',
    });
    const $cancleButton = create('button', 'cancle-button', '');
    $submitButton.innerText = '확인';
    $cancleButton.innerText = '취소';

    // [todo] : 주어진 비밀번호와 제출된 비밀번호가 일치하는 지 확인을 해야 한다.
    // 일치한다면 어딘가에 true를 전해야하는데 그것을 어디에 전해야할지를 확인을 해야한다.
    // 그걸 어떻게 할 수 잇을까... 전역은 좀 힘들것 같은데 차라리 store의 리덕스의 형태를 직접 구현을 할가?
    // 확실히 왜 리덕스가 필요한지를 느끼겠네 리덕스를 이용한 구현이 필요할 것 같으니까 나중에 리팩토링 할때 해당 부분을 추가해보자
    // 그리고 지금은 그냥 데이터를 어떻게 넘길 수 잇을지를 생각해본다면
    const handlerConfirmButton = function (e) {
      e.preventDefault();
      const value = $input.value;

      if (value !== password) {
        console.error('비밀번호가 일치하지 않습니다.');
        alert('비밀번호가 일치하지 않습니다.');
        $input.value = ''; // 비밀번호가 틀릴 경우에 새롭게 입력할 수 있도록 내부 value값을 지워준다.
        $input.focus(); // 내부 value값을 지운 다음에 focus를해서 바로 입력할 수 있도록 해준다.
        return;
      }
      // 비밀번호가 일치한다면 무엇을 해야하는가
      // 1. targetElement가 수정 혹은 삭제를 했을 경우에 해당 기능을 수행할 수 잇도록 해야한다.
      // 2. 수정의경우 수정을 할 수 있게끔 하고
      // 3. 삭제의 경우 삭제 기능을 수행할 수 잇게끔 해야한다.
      // 4. 둘 다 프린팅을 할 때 어떻게 프린팅을 할 것인가가 중요한데
      // 5. 수정의 경우 수정완료 버튼을 눌러야 하는데
      // 6. 수정을 하기 위해서는 어떻게 해야 수정이 가능할까?
      // 7. 각각의 이벤트들은 수정을 위해서 상위 컴포넌트로 부터 내려와야 한다.
      // 8. 뭐가 올지는 모르겠고 상위 컴포넌트로부터 위임한다.
      controlFunction();
      // 뭐가 됐든 이제 해당 컴포넌트는 사라져야 하니까.
      $form.removeEventListener('submit', handlerConfirmButton);
    };
    $form.addEventListener('submit', handlerConfirmButton);
    $cancleButton.addEventListener('click', handlerCancleButton);

    append($form, [$input, $submitButton, $cancleButton]);
    return [$form];
  });
}

/* 
<ul class="comment-list-wrapper">
    <li class="comment-list-item">
        <p class="comment-desc">{comment}</p>
        // 수정 버튼 눌를 시<textarea class="comment-desc">{comment}</textarea>
        <div class="control-wrapper">
            <button class="comment-update-btn">수정</button>
            <button class="comment-remove-btn">삭제</button>
        </div>
    </li>
</ul>
 */
