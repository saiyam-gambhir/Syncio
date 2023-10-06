export function useCheckbox(selectedItems = []) {

  const isCheckboxSelected = (data = {}, key = 'id') => {
    const row = selectedItems.filter(item => item[key] === data[key])[0];
    if(row) return 'selected';
  };

  const checkboxUncheckHandler = (data) => {
    if(isCheckboxSelected(data) === 'selected') {
      const index = selectedItems.findIndex(item => item.id === data.id);
      selectedItems.splice(index, 1);
      return true;
    }

    return false;
  };

  const onInputHandler = (data) => {
    if(checkboxUncheckHandler(data)) return;
    selectedItems.push(data);
    //isCheckboxSelected(data);
  };

  const isRowSelected = (data) => {
    return isCheckboxSelected(data);
  };

  return {
    isCheckboxSelected,
    onInputHandler,
    isRowSelected,
  };
}
