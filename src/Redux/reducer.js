const initialstate = {  
    employees: [  
        { id: 1, employeeName: "Employee 1", employeeDepartment: ".NET Team" },  
        { id: 2, employeeName: "Employee 2", employeeDepartment: "Mobile Team" },  
        { id: 3, employeeName: "Employee 3", employeeDepartment: "Design Team" }  
    ],
    shareddata: [
        {id: 1, type: "componentProps", name: "searchPagePath", value: ""},
    ]  
};


const reducer = (state = initialstate, action) => {
    switch(action.type) {
        case 'GET_EMPLOYEE':
            return {
                ...state
            };
        case 'ADD_EMPLOYEE':
            return {
                ...state, employees: state.employees.concat(action.payload)
            };
        case 'EDIT_EMPLOYEE':
            return {
                ...state,
                    employees:
                        state.employees.map(
                            (content, i) => content.id === action.payload.id ? {...content, employeeName: action.payload.employeeName, employeeDepartment: action.payload.employeeDepartment} : content
                        )
            };
        case 'DELETE_EMPLOYEE':
            return {
                ...state, 
                employees: state.employees.filter
                    (item => item.id !== action.payload)
            }

        case 'GET_SHARED_DATA':
            return {
                ...state
            }

        case 'EDIT_SHARED_DATA':
            return {
                ...state,
                    shareddata:
                        state.shareddata.map(
                            (content, i) => content.id === action.payload.id ? {...content, type: action.payload.type, name: action.payload.name, value: action.payload.value} : content
                        )
            }
        default:
            return state;


    }
}

export default reducer;