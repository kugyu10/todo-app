export const TodoAdd = ({ inputElm, handleAddTodoListItem}) => {
  return (
    <>
    <textarea ref={inputElm}/>
    <button onClick={handleAddTodoListItem}> + TODOを追加</button>
    </>
  )
}