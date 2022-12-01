function showSalary(users, age) {
  let specialUsers = users.filter(element => element.age <= age);
  let usersData = specialUsers.map(element => {
    if (element === specialUsers.at(-1)) {
      return `${element.name}, ${element.balance}`
    }
    return `${element.name}, ${element.balance}\n`;
  });
  return usersData.join("");
}
