import axios from "axios"

export default class ApiService {

    static BASE_URL = "http://localhost:8080"

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    /**AUTH */

    /* This  register a new user */
    static async registerUser(registration) {
        const response = await axios.post(`${this.BASE_URL}/register`, registration)
        return response.data
    }

    /* This  login a registered user */
    static async loginUser(loginDetails) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails)
        return response.data
    }

    /***USERS */
    /*  This is  to get the user profile */
    static async getAllUsers() {
        const response = await axios.get(`${this.BASE_URL}/users/all`, {
            headers: this.getHeader()
        })
        return response.data
    }
  

    static async getUserProfile() {
        const response = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`, {
            headers: this.getHeader()
        })
        return response.data
    }


    /* This is the  to get a single user */
    static async getUser(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }


     /*Customers */
    static async getAllCustomers() {
        const response = await axios.get(`${this.BASE_URL}/customers/all`, {
            headers: this.getHeader()
        })
        return response.data
    }
    static async addCustomer(formData) {
       try{

     const result = await axios.post(`${this.BASE_URL}/customers/add`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'application/json'
            }  
        });
        return result.data;
     }catch (error) {
        throw error;
    }
    }
    static async updateCustomer(customer) {
        try{
 
      const result = await axios.put(`${this.BASE_URL}/customers/update`, customer, {
             headers: {
                 ...this.getHeader(),
                 'Content-Type': 'application/json'
             }  
         });
         return result.data;
      }catch (error) {
         throw error;
     }
     }
    
    static async deleteCustomer(id) {
        const result = await axios.delete(`${this.BASE_URL}/customers/delete/${id}`, {
            headers: this.getHeader()
        })
        return result.data
    }



    /**ROOM */
    /* This  adds a new room room to the database */
    static async addRoom(formData) {
        const result = await axios.post(`${this.BASE_URL}/rooms/add`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return result.data;
    }




    /* This  deletes a room by the Id */
    static async deleteRoom(roomId) {
        const result = await axios.delete(`${this.BASE_URL}/rooms/delete/${roomId}`, {
            headers: this.getHeader()
        })
        return result.data
    }





  

    /**AUTHENTICATION CHECKER */
    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin() {
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser() {
        const role = localStorage.getItem('role')
        return role === 'USER'
    }
}
// export default new ApiService();