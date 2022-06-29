import { useSelector } from "react-redux";
import Todo from "./Todo";

const TodoList = () => {
  const todos = useSelector((state) => state.todo);

  return (
    <div style={{ marginTop: 10 }}>
      {todos.map((item) => {
        return <Todo key={item.id} data={item} />;
      })}
    </div>
  );
};

export default TodoList;
