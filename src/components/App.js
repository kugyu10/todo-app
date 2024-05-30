import { useRef } from 'react';
import { useTodo } from '../hooks/useTodo';

// ToDoTitleコンポーネント
const TodoTitle = ({title, as}) => {

  if (as === 'h1'){
    return <h1>{title}</h1>;
  } else if (as === 'h2'){
    return <h2>{title}</h2>;
  } else {
    return <p>{title}</p>
  }
};



// TodoItemコンポーネント
const TodoItem = ({todo, toggleTodoListItemStatus, deleteTodoListItem}) => {

  const handleToggleTodoListItemStatus = () => {
    return toggleTodoListItemStatus(todo.id, todo.done);
  }
  const handleTodoListItem = () => {
    return deleteTodoListItem(todo.id);
  }

  return (
    <li>
      {todo.content}
      <button onClick={handleToggleTodoListItemStatus}>{todo.done ? "未完了リストへ" : "完了リストへ"}</button>
      <button onClick={handleTodoListItem}>削除</button>
    </li>
  )
}

// TodoListコンポーネント
const TodoList = ({ todoList, toggleTodoListItemStatus, deleteTodoListItem}) => {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          toggleTodoListItemStatus={toggleTodoListItemStatus}
          deleteTodoListItem={deleteTodoListItem} />
      ))}
    </ul>
  )
}

// TodoAdd コンポーネント
const TodoAdd = ({ inputElm, handleAddTodoListItem}) => {
  return (
    <>
    <textarea ref={inputElm}/>
    <button onClick={handleAddTodoListItem}> + TODOを追加</button>
    </>
  )
}

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
