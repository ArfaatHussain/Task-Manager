import {AddTask,ChangeCompleteStatus,UpdateTask,DeleteTask} from './event';


export function deleteTask_Action (id){
return{
    type: DeleteTask,
    payload: id
}
}
export function addTask(id,title,category ,description) {
    return{
        type: AddTask,
        payload: {
            id: id,
            title: title,
            category: category,
            description: description,
            completed: false
        }
    }
}

export function changeCompleteStatus(id) {

    return{
        type: ChangeCompleteStatus,
        payload: id
    }
}

export function updateTask_Action(id,title, category, description){
    return{
        type: UpdateTask,
        payload: {
            id: id,
            title: title,
            category: category,
            description: description
        }
    }
}