
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { toTodoDto } from 'src/shared/mapper';
import { toPromise } from 'src/shared/utils';
import { TodoCreateDto, TodoDto } from 'src/todo-module/dto/todo-dto';
import { TodoEntity } from 'src/todo-module/entity/todo-entity';
import { todos } from 'src/todo-module/mock/mock';
import * as uuid from 'uuid';

@Injectable()
export class TodoService {  
    /** 1 */   
    todos: TodoEntity[] = todos;

    async getOneTodo(id: string): Promise<TodoDto> {    
        /** 2 */    
        const todo = this.todos.find(todo => todo.id === id);

        if (!todo) {      
        /** 3 */       
        throw new HttpException(`Todo item doesn't exist`, HttpStatus.BAD_REQUEST);    
        }

        /** 4 */     
        return toPromise(toTodoDto(todo));  
    }
    async createTodo(todoDto: TodoCreateDto): 
Promise<TodoDto>{    
        const { name, description } = todoDto;

        const todo: TodoEntity = {
            id: uuid.v4(),
            name,
            description,
        };

    this.todos.push(todo);
    return toPromise(toTodoDto(todo));  
}
async getAllTodo(): Promise<TodoDto[]> {
    // const todos = await this.todos.find({ relations: ['tasks', 'owner'] });
    // return todos.map(todo => toTodoDto(todo));
    return toPromise(this.todos);
  }
async updateTodo(id: string, todoDto: TodoDto): Promise<TodoDto> {
    const { name, description } = todoDto;

    let todo: TodoEntity = this.todos.find(todo => todo.id === id);//todos;//await this.todoRepo.findOne({ where: { id } });

    if (!todo) {
      throw new HttpException(
        `Todo list doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    todo.name = name;
    todo.description = description

    //this.todos.push(todo); // update

    // todo = await this.todoRepo.findOne({
    //   where: { id },
    //   relations: ['tasks', 'owner'],
    // }); // re-query

    return toTodoDto(todo);
  }

  // async destoryTodo(id: string): Promise<TodoDto> {
  //   const todo: TodoEntity = this.todos.find(todo => todo.id === id)//await this.todoRepo.findOne({
  //   //   where: { id },
  //   //   relations: ['tasks', 'owner'],
  //   // });

  //   if (!todo) {
  //     throw new HttpException(
  //       `Todo list doesn't exist`,
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   // if (todo.tasks && todo.tasks.length > 0) {
  //   //   throw new HttpException(
  //   //     `Cannot delete this Todo list, it has existing tasks`,
  //   //     HttpStatus.FORBIDDEN,
  //   //   );
  //   // }

  //   this.todos.splice(todo,1); // delete todo list

  //   return toTodoDto(todo);
  // }
async destoryTodo(id: string): Promise<TodoDto> {
  const todoIndex = this.todos.findIndex(todo => todo.id === id);

  if (todoIndex === -1) {
    throw new HttpException(
      `Todo list doesn't exist`,
      HttpStatus.BAD_REQUEST,
    );
  }

  const deletedTodo = this.todos.splice(todoIndex, 1)[0];

  // Instead of returning the deleted todo, you can return a message or some status information
  //const responseMessage = `Todo list with ID ${deletedTodo.id} has been successfully deleted.`;

  // You can return a TodoDto object with the response message
  // const response: TodoDto = {
  //   id: deletedTodo.id,
  //   name: deletedTodo.name,
  //   description: deletedTodo.description,
  //   //message: responseMessage, // Add the message property
  // };

  return toTodoDto(deletedTodo);
}

}
