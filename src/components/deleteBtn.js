import "./deleteBtn";

function deleteBtn(props) {
  return (
    <div id="deleteBtn">
      <button onClick={props.onClick}>Delete</button>
    </div>
  );
}

export default deleteBtn;
