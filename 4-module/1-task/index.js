function makeFriendsList(friends) {
  const ulList = document.createElement('ul');

  for (let friend of friends) {
    let ulItem = document.createElement('li');
    ulItem.textContent = `${friend.firstName} ${friend.lastName}`;
    ulList.append(ulItem);
  }

  return ulList;
}
