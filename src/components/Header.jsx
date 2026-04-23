import { useContext } from "react";
import { InvoiceContext } from "../context/InvoiceContext";

function Header({ onNewInvoice, filter, setFilter }) {

  const { invoices } = useContext(InvoiceContext);

  return (
    <div className="header">

      <div className="header-left">
        <h1>Invoices</h1>
        <p>
          {invoices.length === 0 ? (
            <span>No invoices</span>            
            ): (
                <span>There are {invoices.length} total invoices</span>
            )
          }            
            
        </p>
      </div>

      <div className="header-right">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">Filter by status</option>
          <option value="Draft">Draft</option>
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>

        <button className="btn-primary" onClick={onNewInvoice}>
          <span className="icon-plus">+</span> <span>New Invoice</span>
        </button>
      </div>

    </div>
  );
}

export default Header;