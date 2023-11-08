const Toolbar = ({ children }) => {
  return (
    <div className="sticky bottom-0 z-50 flex items-center justify-center w-full h-20 px-1 bg-purple-100 border border-gray-100 rounded-md shadow-lg max-h-20 py-0w-full bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 text-primary">
      {children}
    </div>
  );
};

export default Toolbar;
