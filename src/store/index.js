import { createStore } from "vuex";

import axios from '../axios'


const store = createStore({
    state: () => ({
        user: {},
    }),
    getters : {
        user(state) {
            return state.user;
        },
    },
    actions : {
        async updateUser({ commit }) {

          try {
            if(localStorage.getItem("token")){
                const response = await axios.get(localStorage.getItem("user_type") == "teacher" ? 'teacher/v1/details' : 
                localStorage.getItem("user_type") == "student" ? 'student/v1/details' : 'admin/v1/details');
                
                commit('SET_USER', response.data)
                console.log(response.data,'user')
                return response.data
            }
          } catch (error) {
            commit('SET_USER', null)
            localStorage.removeItem("token");
            localStorage.removeItem("user_type");
          }
        }
      
    },
    mutations : {
        SET_USER(state, user) {
            state.user = user
        },
        SET_CART_NUMBER(state,cart_number){
            state.cart_number = cart_number
        }
        
    }
});

export default store;