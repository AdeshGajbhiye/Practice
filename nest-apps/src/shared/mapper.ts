import { TodoDto } from "src/todo-module/dto/todo-dto";
import { TodoEntity } from "src/todo-module/entity/todo-entity";

export const toTodoDto = (data: TodoEntity): TodoDto => {  
    const { id, name, description } = data;

    let todoDto: TodoDto = { id, name, description, };
    return todoDto;
    
};
// export const toTodoDto = (data: TodoEntity): TodoDto => {  
//     const { id, name, description } = data;

//     let todoDto: TodoDto = { id, name, description, };

//     return todoDto;
// };