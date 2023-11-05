const Toolbar = ({ children }) => {
  return (
    <div className="absolute bottom-0 z-50 flex items-center justify-center w-full h-24 max-h-24 bg-gradient-to-tl from-base-200 to-base-100 btn-nav text-secondary-content shadow-toolbar-shadow">
      {children}
    </div>
  );
};

export default Toolbar;
