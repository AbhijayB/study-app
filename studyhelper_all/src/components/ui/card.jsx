export function Card({ className = "", children }) {
  return (
    <div className={"bg-white border border-slate-200 rounded-xl " + className}>
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children }) {
  return (
    <div className={"border-b border-slate-200 p-4 " + className}>
      {children}
    </div>
  );
}

export function CardTitle({ className = "", children }) {
  return <h3 className={"text-lg font-semibold " + className}>{children}</h3>;
}

export function CardContent({ className = "", children }) {
  return (
    <div className={"p-4 text-sm text-slate-700 " + className}>{children}</div>
  );
}
