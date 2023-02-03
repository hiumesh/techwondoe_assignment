import { FunctionComponent, ReactNode } from "react";
import Button from "./button";


interface ModalProps {
  visible: boolean,
  onClose: VoidFunction,
  children: ReactNode,
  title: string,
  okText?: string,
  cancelText?: string,
  onOk: VoidFunction,
  onCancel?: VoidFunction,
  okProps?: Object,
  okButtonColor?: "green" | "red",
}

const Modal: FunctionComponent<ModalProps> = ({visible, title, onClose, okText="Ok", cancelText="Cancel", onOk, onCancel=onClose, children, okProps={}, okButtonColor="green"}) => {
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center ${visible ? "" : "hidden"}`}>
      <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-black"></div>
      <div className="bg-white rounded-lg shadow z-10">
        <div className="flex items-start justify-between p-4 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={onClose}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {children}
        </div>

        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
          <Button
            type={okButtonColor}
            onClick={onOk}
            buttonProps={okProps}
          >
            {okText}
          </Button>
          <Button
            type="borderd"
            onClick={onCancel}
          >
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
