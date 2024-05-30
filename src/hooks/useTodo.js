import { useState, useEffect } from "react";

import { ulid } from "ulid";

import * as todoApi from "../api/todos";

export const useTodo = () => {
  const [todoList, setTodoList] = useState([]);

  useEffect(()=>{
    todoApi.getAllTodosData().then((todo) => {
      setTodoList([...todo].reverse());
    });
  }, []);


  const toggleTodoListItemStatus = (id, done) => {

    const todoItem = todoList.find((item) => item.id === id);

    const newTodoItem = { ...todoItem, done: !done };

    todoApi.updateTodoData(id, newTodoItem).then((updatedTodo) => {
      const newTodoList = todoList.map((item) =>  {
        return item.id !== updatedTodo.id ? item : updatedTodo;
      });

      setTodoList(newTodoList);
    });
  };
  // 新規TODOを追加する addTodoListItem関数を宣言
  const addTodoListItem = (todoContent) => {
    const newTodoItem = {
      content: todoContent,
      id: ulid(),
      done: false // 初期値はfalse
    };

    return todoApi.addTodoData(newTodoItem).then((addTodo) => {
      setTodoList([addTodo, ...todoList]);
    });
  };

  // 
  const deleteTodoListItem = (id) => {

    todoApi.deleteTodoData(id).then((deleteListItem) => {
      const newTodoList = todoList.filter((item) => item.id !== deleteListItem.id);
      setTodoList(newTodoList);
    });
  };

  return {
    todoList,
    toggleTodoListItemStatus,
    addTodoListItem,
    deleteTodoListItem,
  };
};
