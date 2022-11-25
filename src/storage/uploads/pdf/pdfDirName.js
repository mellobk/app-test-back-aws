import path from "path";
import { fileURLToPath } from "url";

export const pathDirName = () => {
    const __filename = fileURLToPath(import.meta.url);
  
    // 👇️ "/home/john/Desktop/javascript"
    const __dirname = path.dirname(__filename);
   return __dirname;
  };
  