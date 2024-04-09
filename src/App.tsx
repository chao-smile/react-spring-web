import { useStore } from "@/hooks";
import { Filter, Filtered } from "@/components";

function App() {
  let keyCount = 0;
  const { setTodos } = useStore();

  const add = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.inputTitle.value;
    e.currentTarget.inputTitle.value = "";
    setTodos((prevTodos) => [...prevTodos, { title, completed: false, id: keyCount++ }]);
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
