import type { todoItem } from "../types";

function Item({item}:{item: todoItem} ) {
  return(
    
      <li>{ item?.title }</li>
    
  )
}

export default function List({todos} : {todos: todoItem[]}){
  return(
    <ol>
    {todos.length > 0 ?
    
      todos.map((item) => (
        <Item key={item.id} item = {item}/>
      )
    ):(
    <p>Nothing to do yet!</p>
  )}
    </ol>
  )
 

}