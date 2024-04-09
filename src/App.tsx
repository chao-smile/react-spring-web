import { useStore } from "@/hooks";
import { Filter, Filtered } from "@/components";
import { v4 } from "uuid";

function App() {
  const { setTodos } = useStore();

  const add = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.inputTitle.value;
    e.currentTarget.inputTitle.value = "";
    setTodos((prevTodos) => [...prevTodos, { title, completed: false, id: v4() }]);
  };

  return (
    <form onSubmit={add}>
      <Filter />
      <input name="inputTitle" placeholder="Type ..." />
      <Filtered />
    </form>
  );
}

export default App;
