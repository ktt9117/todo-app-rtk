import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { remove, toggle, update } from "../store";
import { formatDistanceToNow } from "date-fns";

const Todo = ({ data }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newText, setNewText] = useState(data.text);
  const dispatch = useDispatch();

  const onToggle = () => {
    if (isEdit) return;
    dispatch(toggle(data.id));
  };

  const onDelete = () => {
    const ok = window.confirm("Are you sure you want to delete it?");
    if (ok) {
      dispatch(remove(data.id));
    }
  };

  const onEditDone = () => {
    if (newText.trim() === "") {
      alert("You shouldn't leave it empty.");
      return;
    }
    if (newText !== data.text) {
      dispatch(update({ ...data, text: newText }));
    }
    setIsEdit(false);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onEditDone();
    }
  };

  return (
    <div style={{ marginBottom: 15 }}>
      <div
        style={{ display: "flex", height: 40, alignItems: "center", width: "100%", justifyContent: "space-between" }}
      >
        <input style={{ flex: 0.7 }} type="checkbox" value={data.done} onChange={onToggle} checked={data.done} />
        <div style={{ flex: 8 }} onClick={onToggle}>
          {isEdit ? (
            <input
              type="text"
              value={newText}
              maxLength="50"
              onKeyUp={onKeyPress}
              required
              onChange={(e) => {
                setNewText(e.target.value);
              }}
            />
          ) : (
            <span style={{ textDecoration: data.done ? "line-through" : "inherit" }}>{data.text}</span>
          )}
        </div>
        <div style={{ display: "flex", flex: 2, flexDirection: "column", alignItems: "flex-end", fontSize: 11 }}>
          <span>{formatDistanceToNow(new Date(data.updatedAt ?? data.id))}</span>
          <span>{data.updatedAt ? "updated" : "created"}</span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {!isEdit && (
          <Link to={`/${data.id}`}>
            <button>Detail</button>
          </Link>
        )}

        {!data.done && <button onClick={() => setIsEdit((state) => !state)}>{isEdit ? "Cancel" : "Edit"}</button>}
        {isEdit && <button onClick={onEditDone}>Done</button>}
        <button onClick={onDelete}>Del</button>
      </div>
    </div>
  );
};

export default Todo;
