/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;

    this.render();
    this.addEventListener();
  }

  render () {
    this.elem = document.createElement("table");

    this.elem.innerHTML = "<thead><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr></thead>";
    this.elem.innerHTML += this.rows.map(row => `<tr><td>${row.name}</td><td>${row.age}</td><td>${row.salary}</td><td>${row.city}</td><td><button>X</button></td></tr>`).join("");

    return this.elem;
  }

  addEventListener () {
    this.elem.addEventListener("click", this.deleteRow);
  }

  deleteRow (event) {
    if (event.target.tagName === "BUTTON") {
      event.target.closest("tr").remove();
    }
  }
}
