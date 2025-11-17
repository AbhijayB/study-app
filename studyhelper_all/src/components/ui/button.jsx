export function Button({ className = "", asChild, children, ...props }) {
  const Cmp = asChild ? "a" : "button";
  return (
    <Cmp
      className={
        "inline-flex items-center justify-center rounded-md bg-slate-900 px-3 py-2 text-white text-sm font-medium hover:opacity-90 " +
        className
      }
      {...props}
    >
      {children}
    </Cmp>
  );
}
