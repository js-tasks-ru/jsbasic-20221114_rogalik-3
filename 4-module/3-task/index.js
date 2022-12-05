function highlight(table) {
  for (let i = 0; i < table.rows.length; i++) {
    let row = table.rows[i];
    if (row.cells[3].dataset.available === "true") {
      row.classList.add("available"); 
    } else if (row.cells[3].dataset.available === "false") {
      row.classList.add("unavailable"); 
    } else {
      row.hidden = true;
    }
    (row.cells[2].innerHTML === "m") ? row.classList.add("male") : row.classList.add("female");
    if (Number(row.cells[1].innerHTML) < 18) row.setAttribute('style', "text-decoration: line-through");
  }
} 
