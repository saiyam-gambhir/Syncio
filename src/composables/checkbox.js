export function useCheckbox() {
  const isCheckboxSelected = (data = {}, selectedItems = [], key = 'id') => {
    const row = selectedItems.filter(item => item[key] === data[key])[0];
    return row ? 'selected' : '';
  };

  const checkboxUncheckHandler = (data = {}, selectedItems = [], key = 'id') => {
    if(isCheckboxSelected(data, selectedItems) === 'selected') {
      const index = selectedItems.findIndex(item => item[key] === data[key]);
      selectedItems.splice(index, 1);
      return true;
    }

    return false;
  };

  const onInputHandler = (data = {}, selectedItems = [], key = 'id') => {
    if(checkboxUncheckHandler(data, selectedItems, key)) return;
    selectedItems.push(data);
  };

  return {
    isCheckboxSelected,
    onInputHandler,
  };
};
