const Toolbar = ({ children }) => {
  return (
    <div className="fixed bottom-0 z-50 md:justify-center md:gap-12 flex items-center justify-around w-full h-auto p-2 bg-neutral border border-gray-100 rounded-md shadow-[-2px_-4px_5px_2px_#00000024] min-h-[5rem] py-0w-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 text-primary">
      {children}
    </div>
  );
};

export default Toolbar;
