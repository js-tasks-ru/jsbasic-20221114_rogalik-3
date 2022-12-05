function makeFriendsList(friends) {
  let ul = document.createElement("ul");
  let result = friends.map((item) => {
    return `<li>${item.firstName} ${item.lastName}</li>`;
  }).join("\n");
  ul.innerHTML = `${result}`;
  return ul;
}
