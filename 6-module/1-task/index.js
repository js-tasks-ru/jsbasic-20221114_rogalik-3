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
    let table = document.createElement("table");
    table.innerHTML = `
    <thead>
        <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
    </tbody>
    `;
    for (let obj of rows) {
      let tr = document.createElement("tr");
      for (let elem in obj) {
        let td = document.createElement("td");
        td.textContent = `${obj[elem]}`;
        tr.append(td);
      }
      let td = document.createElement("td");
      td.innerHTML = `<button>X</button>`;
      tr.append(td);
      table.lastElementChild.append(tr);
    }
    table.addEventListener("click", (event) => {
      if (!event.target.closest("button")) return;
      event.target.closest("tr").remove();
    })
    this.elem = table;
  }
}
