import { useSelector } from "react-redux";
import styles from "../css modules/loader.module.css";
function Loader() {
  const translate = useSelector((state) => state.language.translation);
  return (
    <div className={`${styles.loadingContainer} z-50`}>
      <div
        className={`${styles.light} w-fit text-7xl text-[--mainColor] overflow-hidden z-50`}
      >
        {translate.LOADING}..
      </div>
    </div>
  );
}

export default Loader;
