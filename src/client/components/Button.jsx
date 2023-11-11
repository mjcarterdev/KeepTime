const Button = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-ghost text-xl text-primary-content hover:bg-accent hover:bg-opacity-70 backdrop-blur-sm px-4 py-1 bg-accent bg-opacity-50 shadow-xl rounded-[25px] justify-center items-center flex ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
