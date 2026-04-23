export const getInvoices = () => {
    const data = localStorage.getItem("invoices");
    return data ? JSON.parse(data) : [];
  };
  
  export const saveInvoices = (invoices) => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  };