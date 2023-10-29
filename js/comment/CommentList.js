import { Element } from "../common/Element.js";
import { getStorage, setStorage } from "../storage.js";
import { append, create, select } from "../util.js";
import { validateBasic } from "../validation.js";

export function CommentList(id) {
  return new Element(() => {
    const $listWrapper = create("ul", "comment-list-wrapper");
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
        console.error("삭제에 실패했습니다.");
        alert("비밀번호가 일치하지 않습니다!");
        return;
      }
      setStorage(id, nextComments);
      render(nextComments);
    };
    const render = (commentLists) => {
      commentItems.forEach((commentItem) => commentItem.remove());
      $listWrapper.innerHTML = "";
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
    const $commentItem = create("li", "comment-list-item");
    const $comment = create("p", "comment-desc");
    const $updateComment = create("textarea", "comment-desc");
    const $modalWrapper = select("#confirm-modal");

    const $controlWrapper = create("div", "control-wrapper");
    const $nickSpan = create("span", "comment-span");
    const $updateBtn = create("button", "comment-update-btn");
    const $removeBtn = create("button", "comment-remove-btn");

    $comment.innerText = comment;
    $updateBtn.innerText = "수정";
    $removeBtn.innerText = "삭제";
    $nickSpan.innerText = nickname;

    function convert(a, b) {
      // remove a and b insert after begin
      a.remove();
      $commentItem.insertAdjacentElement("afterbegin", b);
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
      $modalWrapper.innerHTML = "";

      append($modalWrapper, $modalForm.render());
    }

    const handleUpdate = (e) => {
      const modalForm = document.querySelector("#confirm-modal");
      modalForm.style.display = "block";

      const isCanUpdate = $commentItem.querySelector("p");
      const prevValue = $comment.innerText;
      if (isCanUpdate) {
        // "수정" 상태라면
        enrollModalForm(() => {
          $updateComment.value = $comment.innerText;
          convert($comment, $updateComment);
          $updateBtn.innerText = "수정 완료";
          handlerCancleButton();
        });

        return;
      }
      // 이미 변화돼어있는 상태라면

      const nextValue = $updateComment.value;
      $updateBtn.innerText = "수정";
      convert($comment, $updateComment);
      if (prevValue === nextValue || !validateBasic(nextValue)) {
        // 내용의 변화가 없다면
        $comment.innerText = prevValue;
        convert($updateComment, $comment);
        return;
      }
      // 내용의 변화가 있다면
      modalForm.style.display = "none";
      updateComment(id, nextValue);
    };
    const handleRemove = () => {
      const modalForm = document.querySelector("#confirm-modal");
      modalForm.style.display = "block";
      enrollModalForm(() => {
        // 여기서는 만약 비밀번호가 일치한다면
        removeComment(id, password);
        handlerCancleButton();
      });
    };
    const handlerCancleButton = () => {
      $modalWrapper.innerHTML = "";
      const modalForm = document.querySelector("#confirm-modal");
      modalForm.style.display = "none";
    };

    $updateBtn.addEventListener("click", handleUpdate);

    $removeBtn.addEventListener("click", handleRemove);
    append($controlWrapper, [$nickSpan, $updateBtn, $removeBtn]);
    append($commentItem, [$comment, $controlWrapper]);

    return [
      $commentItem,
      [
        { type: "click", element: $updateBtn, handlerFunc: handleUpdate },
        { type: "click", element: $removeBtn, handlerFunc: handleRemove },
      ],
    ];
  });
}
function CommentConfirmForm(controlFunction, handlerCancleButton, password) {
  return new Element(() => {
    const $form = create("form", "confirm-modal-form");
    const $input = create(
      "input",
      "confirm-modal-input",
      "confirm-modal-input",
      {
        type: "password",
        placeholder: "비밀번호를 입력해 주세요",
      },
    );
    const $heading = create("h4");
    const $submitButton = create("button", "confirm-button", "", {
      type: "submit",
    });
    const $cancleButton = create("button", "cancle-button", "");

    $heading.innerText = "게시물 비밀번호";
    $submitButton.innerText = "확인";
    $cancleButton.innerText = "취소";

    const handlerConfirmButton = function (e) {
      e.preventDefault();
      const value = $input.value;

      if (value !== password) {
        console.error("비밀번호가 일치하지 않습니다.");
        alert("비밀번호가 일치하지 않습니다.");
        $input.value = "";
        $input.focus();
        return;
      }

      controlFunction();

      const modalForm = document.querySelector("#confirm-modal");
      modalForm.style.display = "none";
      $form.removeEventListener("submit", handlerConfirmButton);
    };
    $form.addEventListener("submit", handlerConfirmButton);
    $cancleButton.addEventListener("click", handlerCancleButton);

    append($form, [$heading, $input, $submitButton, $cancleButton]);
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
