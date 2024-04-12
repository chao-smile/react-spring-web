import { useStore } from "@/hooks";
import { Filter, Filtered, FetchTest } from "@/components";
import { v4 } from "uuid";

function App() {
  const setTodos = useStore.use.setTodos();

  const add = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.inputTitle.value;
    e.currentTarget.inputTitle.value = "";
    setTodos((prevTodos) => [...prevTodos, { title, completed: false, id: v4() }]);
  };

  return (
    <div className="flex">
      <div className="flex-auto">
        <h1>Todo List</h1>
        <form onSubmit={add}>
          <Filter />
          <input name="inputTitle" placeholder="Type ..." />
          <Filtered />
        </form>
      </div>
      <div className="flex-auto">
        <h1>Test</h1>
        <FetchTest />
      </div>
    </div>
  );
}

export default App;
