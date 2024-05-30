import { useRef } from 'react';
import { useTodo } from '../hooks/useTodo';
import { TodoTitle } from './TodoTitle';
import { TodoList } from './TodoList';
import { TodoAdd } from './TodoAdd';


function App() {
  const { 
    todoList,
    addTodoListItem,
    toggleTodoListItemStatus,
    deleteTodoListItem
  } = useTodo();
  // TODO入力フォームで利用
  const inputElm = useRef(null);

  const handleAddTodoListItem = () => {
    // TODO入力が未入力なら何もしない
    if (inputElm.current.value === '') return;

    addTodoListItem(inputElm.current.value);
    inputElm.current.value = '';
  };

  const inCompletedList = todoList.filter((todo)=> !todo.done);

  const completedList = todoList.filter((todo)=> todo.done)

  return (
  <div>
    <TodoTitle title="TODOリスト" as="h1" />
    <TodoAdd inputElm={inputElm} handleAddTodoListItem={handleAddTodoListItem}/>

    <TodoTitle title="未完了TODOリスト" as="h2" />
    <TodoList
      todoList={inCompletedList}
      toggleTodoListItemStatus={toggleTodoListItemStatus}
      deleteTodoListItem={deleteTodoListItem}
    />

    <TodoTitle title="完了TODOリスト" as="h2" />
    <TodoList
      todoList={completedList}
      toggleTodoListItemStatus={toggleTodoListItemStatus}
      deleteTodoListItem={deleteTodoListItem}
    />

  </div>
  );
}

export default App;
