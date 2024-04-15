import { useStore, setWithout } from "@/hooks";

const WithOut = () => {
  const without = useStore.use.without();
  console.info("WithOut:触发");
  return (
    <div>
      <div>count:{without}</div>
      <button onClick={setWithout}>add without</button>
    </div>
  );
};

export default WithOut;
