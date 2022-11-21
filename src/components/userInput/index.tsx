import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { Resizable } from "re-resizable";
import "./index.css";

import { MdDragHandle } from "react-icons/md";

interface iUserInputValue {
  onInput: any;
  value: string;
  setValue?: any;
}

export const UserInput = ({ onInput, value }: iUserInputValue) => {
  const handleInput = (value: string) => {
    onInput(value);
  };

  const CustomHandle: any = () => (
    <div className="handleBottom">
      {" "}
      <MdDragHandle
        style={{ height: "35px", width: "60px", color: "#6d7082" }}
      />
    </div>
  );

  const BottomRightHandle = () => <CustomHandle></CustomHandle>;

  return (
    <Resizable
      handleComponent={{ bottom: <BottomRightHandle /> }}
      enable={{
        top: false,
        right: false,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      // className="chart-parent"
      defaultSize={{
        width: "100%",
        height: 300,
      }}
    >
      <CodeMirror
        className="inputText"
        width="100vw"
        height="100%"
        theme={oneDark}
        value={value}
        extensions={[javascript({ jsx: true })]}
        onChange={handleInput}
      />
    </Resizable>
  );
};
