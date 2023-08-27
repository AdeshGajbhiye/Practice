import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { toPromise } from 'src/shared/utils';
import { TodoCreateDto, TodoDto, TodoListDto } from 'src/todo-module/dto/todo-dto';
import { TodoService } from './todo.service';

@Controller("api/todos")
export class TodoController {  
    /** 1 */   
    constructor(private readonly todoService: TodoService) {}
    @Get()  
    /** 2 */  
    async findAll(): Promise<TodoListDto> {    
        /** 3 */     
        const todos = await this.todoService.getAllTodo();        

        /** 4 */     return toPromise({ todos }); 
    }

    /** 5 */  
    @Get(":id")  
    async findOne(@Param("id") id: string): Promise<TodoDto> {   
        return await this.todoService.getOneTodo(id);  
    }

    /** 6 */  
    @Post()    

    /** 7 */  
    async create(@Body() todoCreateDto: TodoCreateDto): Promise<TodoDto> {    
        return await this.todoService.createTodo(todoCreateDto);  
    }

    @Put(":id")

        /** 8 */  
        async update(    
            @Param("id") id: string,
        @Body() todoDto: TodoDto  
        ): Promise<TodoDto> { 
        return await this.todoService.updateTodo(id,todoDto);  
    }

    @Delete(":id")  
    async destory(@Param("id") id: string): Promise<TodoDto> {  
        return await this.todoService.destoryTodo(id);  
    }
}
