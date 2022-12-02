function showSalary(users, age) {
  let specialUsers = users.filter(element => element.age <= age);
  let usersData = specialUsers.map(element => `${element.name}, ${element.balance}`);
  return usersData.join("\n");
}
