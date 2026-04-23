import { useContext, useState } from "react";
import { InvoiceContext } from "../context/InvoiceContext";
import InvoiceCard from "../components/InvoiceCard";
import Header from "../components/Header";
import InvoiceForm from "../components/InvoiceForm";

function Home() {

  const { invoices } = useContext(InvoiceContext);

   //  control drawer
  const [showForm, setShowForm] = useState(false);

  const [filter, setFilter] = useState("All");
  const filteredInvoices =
  filter === "All"
    ? invoices
    : invoices.filter(inv => inv.status === filter);
  // console.log(invoices);
  return (
    <div className="container">
      <div className="head-section">
        <img src="src/assets/rectangleCopy.png" width="100%" height="70px"/>
        <img src="src/assets/combineShape.png" className="logo"/>
        <div className="bottomDiv">
          <div>
            <img src="src/assets/path.png" width="10px" />
          </div>
          <hr/>
          <div>
            <img src="src/assets/oval.png" width="25px" />
          </div>
        </div>
                
      </div>
    
      <div className="invoice-section">
       {/* Pass handler to Header */}
       {/* <Header onNewInvoice={() => setShowForm(true)} />       */}
       <Header
        onNewInvoice={() => setShowForm(true)}
        filter={filter}
        setFilter={setFilter}
      />
        {/* <div className="invoice-list">
          {invoices.length === 0 ? (
            <div className="noInvoice">
                <img src="src/assets/emailCampaign.png" width="200px" /><br/><br/>
                <h3>There is nothing here</h3>
                <p>Create an invoice by clicking the<br/> <b>New Invoice</b> button and get started</p>
            </div>
           
          ) : (
            invoices.map((invoice) => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ))
          )
          }
        </div> */}
        <div className="invoice-list">
        {filteredInvoices.length === 0 ? (
          <div className="noInvoice">
            <img src="src/assets/emailCampaign.png" width="200px" /><br /><br />
            <h3>No invoices found</h3>
            <p>
              {filter === "All"
                ? "Create an invoice by clicking the New Invoice button and get started"
                : `No ${filter} invoices available`}
            </p>
          </div>
        ) : (
          filteredInvoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))
        )}
      </div>

      </div>

      {/* 👉 Drawer Form */}
      {showForm && (
        <InvoiceForm onClose={() => setShowForm(false)} />
      )}

    </div>
  );
}

export default Home;