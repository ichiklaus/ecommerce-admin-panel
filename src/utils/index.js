const handleUploadFiles = (files, originalArray, setArray) => {
  const uploaded = originalArray;
  files.some((file) => {
    if (uploaded.findIndex((f) => f.name === file.name) === -1) {
      uploaded.push(file);
    }
  });
  setArray(uploaded);
};

export { handleUploadFiles };
