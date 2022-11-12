
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { Resizable } from "re-resizable";
import "./index.css"


interface iUserInputValue {
  onInput:any,
  value:string,
  setValue?:any
}


export const UserInput = ({onInput, value}:iUserInputValue) => {

  const handleInput = (value:string) => {
    onInput(value);
  };

    const CustomHandle = () => (
    <div className={'handleBottom'}
    ></div>
  );

  const BottomRightHandle = () => (
    <CustomHandle></CustomHandle>
  );



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
    minHeight={150}
  > 
      <CodeMirror
          className='inputText'
          width="100vw"
          height="40vh"
          theme={oneDark}
          value={value}
          extensions={[javascript({ jsx: true })]}
          onChange={handleInput}
          />
          </Resizable>
    );
}
