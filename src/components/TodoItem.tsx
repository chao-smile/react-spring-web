import type { ToDo } from "@/hooks";
import { useStore } from "@/hooks";
import { CloseOutlined } from "@ant-design/icons";

const TodoItem = ({ item }: { item: ToDo }) => {
  const setTodos = useStore.use.setTodos();
  const { title, completed, id } = item;

  const toggleCompleted = () =>
    setTodos((prevTodos) =>
      prevTodos.map((prevItem) =>
        prevItem.id === id ? { ...prevItem, completed: !completed } : prevItem,
      ),
    );

  const remove = () => {
    setTodos((prevTodos) => prevTodos.filter((prevItem) => prevItem.id !== id));
  };

  return (
    <>
      <input type="checkbox" checked={completed} onChange={toggleCompleted} />
      <span style={{ textDecoration: completed ? "line-through" : "" }}>{title}</span>
      <CloseOutlined onClick={remove} />
    </>
  );
};

export default TodoItem;
