import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { InvoiceContext } from "../context/InvoiceContext";

function InvoiceDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { invoices, setInvoices } = useContext(InvoiceContext);

  const invoice = invoices.find(inv => inv.id === id);

  if (!invoice) {
    return <p>Invoice not found</p>;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const formatAddress = (addr) => (
    <>
      {addr.street && <>{addr.street}<br/></>}
      {addr.city && <>{addr.city}<br/></>}
      {addr.postcode && <>{addr.postcode}<br/></>}
      {addr.country && <>{addr.country}</>}
    </>
  );

  const formatCurrency = (amount) =>
    amount.toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  // DELETE FUNCTION
  const handleDelete = () => {
    if (confirm("Delete this invoice?")) {
      const updated = invoices.filter(inv => inv.id !== id);
      setInvoices(updated);
      navigate("/");
    }
  };

  // MARK AS PAID
  const markAsPaid = () => {
    const updated = invoices.map(inv =>
      inv.id === id ? { ...inv, status: "Paid" } : inv
    );
    setInvoices(updated);
  };

  return (
    <div className="container">
      <div className="head-section">
        <img src="/assets/rectangleCopy.png" width="100%" height="70px"/>
        <img src="/assets/combineShape.png" className="logo"/>
        <div className="bottomDiv">
          <div>
            <img src="/assets/path.png" width="10px" />
          </div>
          <hr/>
          <div>
            <img src="/assets/oval.png" width="25px" />
          </div>
        </div>
                
      </div>
      <div className="invoice-section">
       {/* BACK BUTTON */}
       <div className="goBack">
        <b onClick={() => navigate(-1)}> <span>&lt;</span> Go Back</b>
        </div>

      {/* STATUS BAR */}
      <div className="status-header">       

        <div className="header-left status-bar">
          <span>Status</span>
          <span className={`invoice-status ${invoice.status}`}>
            {invoice.status}
          </span>
        </div>

        <div className="header-right actions">          

          <button className="btn-default" onClick={() => navigate(`/edit/${id}`)}> Edit </button>
          <button className="btn-danger" onClick={handleDelete}> Delete </button>
          {invoice.status === "Pending" && (
            <button className="btn-primary" onClick={markAsPaid}> Mark as Paid </button>
          )}         

        </div>

      </div>

        {/* INVOICE DETAILS */}
        <div className="invoice-details">

          <div className="top">
            <div className="top-left">
              <strong><span className="hashStyle">#</span>{invoice.id}</strong>
              <p>{invoice.projectDescription}</p>
            </div>

            <div className="top-right">
                <p>{formatAddress(invoice.senderAddress)}</p>
            </div>
          </div>

          <div className="top2">
            <div className="top2-left">
              <div className="top2-left1">
                <div className="labelDiv"><label>Invoice Date</label></div>
                <p><strong>{formatDate(invoice.invoiceDate)}</strong></p>
              </div>
              <div>
                <div className="labelDiv"><label>Payment Due</label></div>
                <p><strong>{formatDate(invoice.paymentDue)}</strong></p>
              </div>
            </div>

            <div className="top2-mid">              
                <div className="labelDiv"><label>Bill To</label></div>
                <p><strong>{invoice.clientName}</strong></p>
                <p>
                  {formatAddress(invoice.clientAddress)}
                </p>                          
            </div>

            <div className="top2-left">              
                <div className="labelDiv"><label>Send To</label></div>
                <p><strong>{invoice.clientEmail}</strong></p>                                    
            </div>
            
          </div>
          <div className="itemsList">
             {/* HEADER */}
            <div className="itemsHeader">
              <span>Item Name</span>
              <span>Qty.</span>
              <span>Price</span>
              <span>Total</span>
            </div>

            {/* ITEMS */}
            {invoice.items.map((item, index) => (
              <div className="itemRow" key={index}>
                <span className="item-name">{item.name}</span>
                <span>{item.quantity}</span>
                <span>£{formatCurrency(item.price)}</span>
                {/* <span>£{item.total}</span> */}
                <span>£{formatCurrency(item.quantity * item.price)}</span>
              </div>
            ))}          
          </div>
          <div className="itemsFooter">
              <div>Amount Due</div>              
              {/* <div> <strong>£{formatCurrency(invoice.total)}</strong></div> */}
              {/* <div> <strong>£{invoice.total}</strong></div> */}
              <div> <strong>£{formatCurrency(invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0))}</strong></div>
            
          </div>

        </div>

      </div>
    </div>
  );
}

export default InvoiceDetails;