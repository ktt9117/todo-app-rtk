import { useSelector } from "react-redux";

const TodoStatus = () => {
  const doneCount = useSelector((state) => state.todo.filter((item) => item.done === true).length);
  const remainingCount = useSelector((state) => state.todo.filter((item) => item.done === false).length);

  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, marginBottom: 10 }}>
      <span style={{ color: remainingCount > 0 ? "red" : "inherit" }}>Remaining: {remainingCount}</span>
      <span>Completed: {doneCount}</span>
    </div>
  );
};

export default TodoStatus;
