import Button from "@/components/Button";
import classNames from "classnames";
import styles from "./styles.module.css";

const Controlls = ({ innerHTML }: { innerHTML: string }) => {
  return (
    <div className={classNames(styles["controlls"])}>
      <Button type="submit" variant={"primary"} innerHTML={innerHTML} />
    </div>
  );
};

export default Controlls;
