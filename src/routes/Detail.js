import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const todo = useSelector((state) => state.todo.find((item) => item.id === parseInt(id)));

  return (
    <div>
      {todo.text}
      <span>CreatedAt: {formatDistanceToNow(new Date(todo.id))}</span>
    </div>
  );
};

export default Detail;
