export function useCheckbox(items) {

  const isCheckboxSelected = (data = {}, selectedItems = [], key = 'id') => {
    const row = selectedItems.filter(item => item[key] === data[key])[0];
    if(row) return 'selected';
  };

  const onInputHandler = (data, selectedItems) => {
    selectedItems.push(data);
    isCheckboxSelected(data, selectedItems);
  };

  const isRowSelected = (data) => {
    return isCheckboxSelected(data, items);
  };

  return {
    isCheckboxSelected,
    onInputHandler,
    isRowSelected,
  };
}
