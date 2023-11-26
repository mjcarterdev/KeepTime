const Button = ({ children, onClick, className, isLoading, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`btn btn-ghost text-xl text-primary-content hover:bg-accent hover:bg-opacity-70 backdrop-blur-sm px-4 py-1 bg-accent bg-opacity-50 shadow-xl rounded-[25px] justify-center items-center flex ${className}`}
    >
      {isLoading && <span className="loading loading-spinner"></span>}
      {children}
    </button>
  );
};

export default Button;
