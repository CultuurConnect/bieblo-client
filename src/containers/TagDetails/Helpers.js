export const addTag = (add, tagLabel) => (event) => {
  console.log('onclick add tag');
  event.preventDefault();
  add(tagLabel);
};
