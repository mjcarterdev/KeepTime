import Card from './Card';

const Modal = ({ children, title }) => {
  return (
    <>
      <div className="absolute z-50 flex items-center justify-center w-full h-full backdrop-blur-sm bg-secondary bg-opacity-10">
        <Card
          className={
            'shadow-2xl gap-4 border-grey-300 bg-opacity-80 max-w-max90'
          }
        >
          <span className="px-4 text-xl font-medium text-center normal-case ">
            <h2>{title} </h2>
          </span>
          <div className="border border-opacity-50 border-solid border-accent "></div>
          {children}
        </Card>
      </div>
    </>
  );
};

export default Modal;
