const modalClose = document.querySelector('.cancle');
const modalForm = document.getElementById('confirm-modal');
const modalBg = document.querySelector('.modal-bg');

console.log(modalBg, modalForm);

modalClose.addEventListener('click', (e) => {
  modalForm.style.display = `none`
})