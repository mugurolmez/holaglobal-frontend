import ApiService from "../../Services/ApiService"
import { addCustomerError, addCustomerSuccess, getAllCustomersError, getAllCustomersSuccess, deleteCustomerSuccess, deleteCustomerError, updateCustomerError, updateCustomerSuccess } from "../actions/customerActions"

export const getAllCustomer = () => async (dispatch) => {
    try {
        const response = await ApiService.getAllCustomers();
        dispatch(getAllCustomersSuccess(response.data));  // response.data bir dizi olmalı
    } catch (error) {
        dispatch(getAllCustomersError(error));
    }
}

// addCustomer thunk örneği
export const addCustomer = (customerData) => async (dispatch) => {
    try {
        const response = await ApiService.addCustomer(customerData);
        console.log('thunk add response'+response)
        if (response.success) {
       
            dispatch(addCustomerSuccess({ response}));
            return { response }; 
        } else {
            console.log(response)
            dispatch(addCustomerError(response.message || 'Müşteri Ekleme Hatası'));
            return { response }; 
        }
    } catch (error) {
        dispatch(addCustomerError(error.message || 'Müşteri Ekleme Hatası'));
        return { response: { message: error.message } }; 
        
    }
};
  
  export const updateCustomer = (customerData) => async (dispatch) => {
    try {
        const response = await ApiService.updateCustomer(customerData);
        
        if (response.success) {
            dispatch(updateCustomerSuccess(response));
            return { response }; 
        } else {
            dispatch(updateCustomerError(response.message || 'Müşteri Güncelleme Hatası'));
            return { response }; 
        }
    } catch (error) {
        dispatch(updateCustomerError(error.message || 'Müşteri Güncelleme Hatası'));
        return { response: { message: error.message } }; 
    }
};

export const deleteCustomer = (id) => async (dispatch) => {
    try {
        const response = await ApiService.deleteCustomer(id);
        
        if (response.success) {
            dispatch(deleteCustomerSuccess(id)); // id'yi payload olarak gönderiyoruz
            return { response };  // Başarılı yanıt dönülüyor
        } else {
            dispatch(deleteCustomerError(response.message || 'Müşteri Silme Hatası'));
            dispatch(getAllCustomer())
            return { response };  // Hatalı yanıt dönülüyor
        }
    } catch (error) {
        dispatch(deleteCustomerError(error.message || 'Müşteri Silme Hatası'));
        return { success: false, message: error.message || 'Müşteri Silme Hatası' };  // Hata durumunda başarısız yanıt
    }
};




