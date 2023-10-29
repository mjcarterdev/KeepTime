const Toolbar = ({ children }) => {
  return (
    <div className="flex items-center justify-center w-full h-20 btn-nav text-secondary-content bg-secondary">
      {children}
    </div>
  );
};

export default Toolbar;
