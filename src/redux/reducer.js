import { AddTask, ChangeCompleteStatus, UpdateTask,DeleteTask } from './event';

export const Tasks_reducer = (state = [], action) => {
    switch (action.type) {
        case AddTask:
            return [...state, action.payload];

        case ChangeCompleteStatus:

            let array = [...state];
            let index = array.findIndex(task => task.id === action.payload);

            if (index !== -1) {

                array[index] = {
                    ...array[index],
                    completed: true
                }
                return array;
            }
            else {
                return state;
            }
        case UpdateTask:
            let updatedArray = [...state];

            let indexOfTask = updatedArray.findIndex(task => task.id === action.payload.id);

            if (indexOfTask !== -1) {

                updatedArray[indexOfTask] ={
                    ...updatedArray[indexOfTask],
                    title: action.payload.title,
                    category: action.payload.category,
                    description: action.payload.description,
                    completed: false
                }
                return updatedArray;
            }
            else{
                return state;
            }
        case DeleteTask:
            let filteredArray = [...state].filter(task => {
                if(task.id!== action.payload){
                    return task;
                }});
           
            return filteredArray;
        default:
            return state;
    }
}