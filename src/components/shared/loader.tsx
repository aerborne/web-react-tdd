export default ({ className = "" }) => {
  return (
    <div className={`lds-roller${!!className ? " " : ""}${className || ""}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
