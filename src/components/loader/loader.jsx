import { Loader2 } from "lucide-react";


const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex items-center justify-center w-fit gap-4">
        <Loader2 className="animate-spin size-10 text-primary" />
        
      </div>
    </div>
  );
};

export default Loader;
