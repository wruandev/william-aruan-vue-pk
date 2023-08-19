const shuffleArray = (arr) => {
  const newArr = [...arr];
  let i = newArr.length;
  while (--i > 0) {
    let randIndex = Math.floor(Math.random() * (i + 1));
    [newArr[randIndex], newArr[i]] = [newArr[i], newArr[randIndex]];
  }

  return newArr;
};

const shuffleGroup = (arr) => {
  const shuffleRounds = 1000;
  let newGroup = [...arr];

  for (let i = 0; i < shuffleRounds; i++) {
    newGroup = shuffleArray(newGroup);
  }

  return newGroup;
};

const distributeGroup = (arr, total) => {
  const shuffledGroup = shuffleArray([...arr]);
  const groups = [];

  for (let g = 0; g < total; g++) {
    groups.push([]);
  }

  let index = 0;

  while (shuffledGroup.length !== 0) {
    const data = shuffledGroup.pop();

    groups[index].push(data);

    index = index === total - 1 ? 0 : index + 1;
  }

  return groups;
};

export { shuffleArray, shuffleGroup, distributeGroup };
