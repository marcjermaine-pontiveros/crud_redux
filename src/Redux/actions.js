export function getEmployee() {  
    return dispatch => {  
        return dispatch({  
            type: 'GET_EMPLOYEE'  
        });  
    }  
}; 

export function getSharedData(){
    return dispatch => {
        return dispatch({
            type: "GET_SHARED_DATA",
        });
    }
}

export function addEmployee(data) {  
    return dispatch => {  
        return dispatch({  
            type: 'ADD_EMPLOYEE',  
            payload: data  
        });  
    }  
};  

export function editEmployee(data) {  
    return dispatch => {  
        return dispatch({  
            type: 'EDIT_EMPLOYEE',  
            payload: data  
        });  
    }  
};  

export function editSharedData(data) {
    return dispatch => {
        return dispatch({
            type: 'EDIT_SHARED_DATA',
            payload: data
        });
    }
}

export function deleteEmployee(employeeId) {  
    return dispatch => {  
        return dispatch({  
            type: 'DELETE_EMPLOYEE',  
            payload: employeeId  
        });  
    }  
};