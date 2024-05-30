export const TodoItem = ({todo, toggleTodoListItemStatus, deleteTodoListItem}) => {

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
