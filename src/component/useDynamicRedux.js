import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const useDynamicRedux = (actions, selectors) => {
  const dispatch = useDispatch();
  const data = useSelector(selectors);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(actions.getAll());
  }, [dispatch, actions]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setRows(data.map(item => ({
        ...item,
        id: item.id || item.customerId,
        dateOfBirth: item.dateOfBirth ? new Date(item.dateOfBirth) : null,
        applicationDate: item.applicationDate ? new Date(item.applicationDate) : null,
      })));
    } else {
      console.error('Data is not an array:', data);
    }
  }, [data]);

  const addRow = async (row) => {
    try {
      const result = await dispatch(actions.add(row));
      if (result?.response?.success) {
        setRows(prevRows => [...prevRows, { ...row, id: result.response.data.id }]);
        return result.response.data;
      }
      console.error('Add operation failed:', result?.response?.message);
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };

  const updateRow = async (row) => {
    try {
      const result = await dispatch(actions.update(row));
      if (result?.response?.success) {
        setRows(prevRows => prevRows.map(r => r.id === row.id ? row : r));
        return result.response.data;
      }
      console.error('Update operation failed:', result?.response?.message);
    } catch (error) {
      console.error('Error updating row:', error);
    }
  };

  const deleteRow = async (id) => {
    try {
      const result = await dispatch(actions.delete(id));
      if (result?.response?.success) {
        setRows(prevRows => prevRows.filter(r => r.id !== id));
        return result.response.message;
      }
      console.error('Delete operation failed:', result?.response?.message);
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  return { rows, addRow, updateRow, deleteRow };
};

export default useDynamicRedux;
