import { createContext, useState, useEffect } from "react";

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {


  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem("invoices");
    // return saved ? JSON.parse(saved) : sampleInvoices;
    return saved ? JSON.parse(saved) : [];
  });

  
  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  return (
    <InvoiceContext.Provider value={{ invoices, setInvoices }}>
      {children}
    </InvoiceContext.Provider>
  );
};