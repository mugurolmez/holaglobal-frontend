import ApiService from "../../Services/ApiService";
import { loginError, loginSuccess, registerError, registerSuccess } from "../actions/authActions";


export const register=(values)=>{
    let response
    return async(dispatch)=>{
        try{
            response= await new ApiService.registerUser(values)
            dispatch(registerSuccess(response))

        }catch(error){
            dispatch(registerError(error))

        }
    }

}

export const login = (credentials) => async (dispatch) => {
    try {
        const response = await ApiService.loginUser(credentials);
        dispatch(loginSuccess(response));
        return response;
    } catch (error) {
        dispatch(loginError(error));
        throw error;
    }
};

