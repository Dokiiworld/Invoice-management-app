import { Link } from "react-router-dom";

function InvoiceCard({ invoice }) {

  const formatCurrency = (amount) =>
    amount.toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });


  return (  
    
    <Link to={`/invoice/${invoice.id}`} className="invoice-card">

      <div className="invoice-id">
        <strong><span className="hashStyle">#</span>{invoice.id}</strong>
      </div>

      <div className="invoice-dueDate">
        {`Due ${new Date(invoice.paymentDue).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })}`}
      
      </div>

      <div className="invoice-client">
        {invoice.clientName}
      </div>

      <div className="invoice-total">
        <strong>£{formatCurrency(invoice.total)}</strong>
      </div>
      <div className="invoice-status-icon-next">
        <div className={`invoice-status ${invoice.status}`}>
          {invoice.status} 
        </div>
        <span>&gt;</span>
      </div>

  </Link>

  );
}

export default InvoiceCard;