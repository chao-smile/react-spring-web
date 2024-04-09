import { useTransition, a } from "@react-spring/web";
import { useStore } from "@/hooks";
import TodoItem from "./TodoItem";

const Filtered = () => {
  const todos = useStore.use.todos();
  const filter = useStore.use.filter();
  const filterTodo = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    return !todo.completed;
  });
  const transitions = useTransition(filterTodo, {
    keys: (todo) => todo.id,
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 40 },
    leave: { opacity: 0, height: 0 },
  });
  return transitions((style, item) => (
    <a.div className="item" style={style}>
      <TodoItem item={item} />
    </a.div>
  ));
};

export default Filtered;
