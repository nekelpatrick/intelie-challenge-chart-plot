import "./styles.css";

export const Footer = ({ generateChart }: any) => {
  const handleClick = () => {
    generateChart();
  };

  return (
    <div className={"footerDiv"}>
      <button className={"btn"} onClick={handleClick}>
        Generate Chart
      </button>
    </div>
  );
};
