import { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../store";

const TodoForm = () => {
  const [text, setText] = useState("");
  const [inputSize, setInputSize] = useState(0);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(add(text));
    setText("");
  };

  const onChange = (e) => {
    setInputSize(e.target.value?.length || 0);
    setText(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit} style={{ display: "flex" }}>
        <input
          style={{ flexGrow: 1 }}
          type="text"
          placeholder="What do you have to do?"
          maxLength="50"
          value={text}
          onChange={onChange}
          required
        />
        <button>Add</button>
      </form>
      <span style={{ fontSize: 11 }}>{inputSize}/50</span>
    </div>
  );
};

export default TodoForm;
