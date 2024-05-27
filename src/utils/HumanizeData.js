export const Humanize = (arr) => {
  const newArr = [];

  const dateHumanize = (date) => {
    const str = date.split("T")[0];
    return `${str.split("-")[2]}.${str.split("-")[1]}.${str.split("-")[0]}`;
  };

  arr.forEach((el) => {
    newArr.push({
      ...el,
      active: el.active ? "да" : "нет",
      sex: el.sex === 1 ? "мужской" : "женский",
      birthDate: el.birthDate ? dateHumanize(el.birthDate) : null,
      birthdate: el.birthdate ? dateHumanize(el.birthdate) : null,
    });
  });

  return newArr;
};
