import Button from "@material-ui/core/Button";

function Component({ data, button }) {
  return (
    <div className="sprint-info">
      <h1>{data.description ?? "Sprint title"}</h1>
      <Button size="small" onClick={button.onClick(data.id)} title={`${button.title}`} variant="contained">
        {button.title}
      </Button>        
    </div>
  );
}

export default Component;
