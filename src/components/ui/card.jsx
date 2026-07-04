export default function Card({ className = '', hover = false, children }) {
  return (
    <div className={`glass rounded-3xl ${hover ? 'glass-hover' : ''} ${className}`}>
      {children}
    </div>
  );
}