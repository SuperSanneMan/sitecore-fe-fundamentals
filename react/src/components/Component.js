function Component({ data, button }) {
  return (
    <div className="sprint-info">
      <h1>{data.description ?? "Sprint title"}</h1>
      {/* <button onClick={button.onClick(data.id)} title={`${button.title}`}>{button.title}</button> */}
    </div>
  );
}

export default Component;
