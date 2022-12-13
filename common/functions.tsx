import classes from "./common.module.css";

const Loader = () => {
  return (
    <div className={classes["loader"]}>
      <span>L</span>
      <span>O</span>
      <span>A</span>
      <span>D</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
    </div>
  );
};

export { Loader };
