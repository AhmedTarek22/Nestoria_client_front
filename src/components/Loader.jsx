import styles from "../css modules/loader.module.css";
function Loader() {
  return (
    <div className={`${styles.loadingContainer} z-50`}>
      <div
        className={`${styles.light} w-fit text-7xl text-[--mainColor] overflow-hidden z-50`}
      >
        LOADING..
      </div>
    </div>
  );
}

export default Loader;
