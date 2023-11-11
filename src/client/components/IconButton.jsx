import Button from './Button';

const RoundButtonWithLabel = ({
  children,
  label,
  onClick,
  className,
  showText = true,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <Button
        className={`rounded-[50%] w-14 h-14 ${className}`}
        onClick={onClick}
      >
        {children}
      </Button>
      {showText && <label className=" text-neutral-content">{label}</label>}
    </div>
  );
};

export default RoundButtonWithLabel;
