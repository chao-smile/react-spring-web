import { useStore } from "@/hooks";
import { useTransition, a } from "@react-spring/web";

const FetchTest = () => {
  const fetchTest = useStore.use.fetchTest();
  const testData = useStore.use.testData();
  const testLoading = useStore.use.testLoading();

  const transitions = useTransition(testData, {
    keys: (todo) => todo.id,
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 40 },
    leave: { opacity: 0, height: 0 },
  });

  return (
    <div>
      <ul className="max-h-[30vh] overflow-y-auto">
        {transitions((style, item) => (
          <a.li style={style}>{item.title}</a.li>
        ))}
      </ul>
      {testLoading && <div>Loading...</div>}
      <button onClick={fetchTest}>Fetch</button>
    </div>
  );
};

export default FetchTest;
