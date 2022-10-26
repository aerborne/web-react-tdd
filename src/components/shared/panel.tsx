interface Props {
  title: String;
  children: JSX.Element | String;
}

export default (props: Props) => {
  return (
    <div className="panel">
      <div className="panel-title">{props.title}</div>
      <div className="panel-body">{props.children}</div>
    </div>
  );
};
