function Component({ data, button }) {
  return (
    <div style={{ margin: "0 auto", width: "50%", backgroundColor: "lightblue" }}>
      <h1>{data.description ?? "Sprint title"}</h1>
      <button onClick={button.onClick(data.id)} title={`${button.title}`}>{button.title}</button>
    </div>
  );
}

export default Component;
