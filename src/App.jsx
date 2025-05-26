import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import  FormulaInput  from "./components/FormulaInput";
// import { formulaStore } from "./state/formulaStore";

const queryClient = new QueryClient();

function App() {
  // const [count, setCount] = useState(0)

  return (
   <QueryClientProvider client={queryClient}>
      <main className="min-h-screen p-10 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Formula Editor</h1>
        <FormulaInput />
      </main>
    </QueryClientProvider>
  )
}

export default App
