import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InvoiceDetails from "./pages/InvoiceDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invoice/:id" element={<InvoiceDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// function App() {
//   return (
//     <div>
//       <h1>Invoice Generator</h1>
//       <p>HNG Stage 2 Task</p>
//     </div>
//   )
// }

// export default App