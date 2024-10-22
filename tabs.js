const tabWajib = document.getElementById('tab-wajib');
const tabQWC = document.getElementById('tab-qwc');
const tabRebutan = document.getElementById('tab-rebutan');

const listWajib = document.querySelectorAll('.listscore.wajib');
const listQWC = document.querySelectorAll('.listscore.qwc');
const listRebutan = document.querySelectorAll('.listscore.rebutan');

// console.log(tabWajib)

// console.log(listWajib)

tabWajib.addEventListener("click", () => {
  listWajib.forEach(el => {
    // console.log(el);
    el.classList.add('active');
  });
  listQWC.forEach(el => {
    el.classList.remove('active');
  });
  listRebutan.forEach(el => {
    el.classList.remove('active');
  });
})

