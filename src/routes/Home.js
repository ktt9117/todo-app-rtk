import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import TodoStatus from "../components/TodoStatus";

const Home = () => {
  return (
    <div className="App">
      <TodoStatus />
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default Home;
