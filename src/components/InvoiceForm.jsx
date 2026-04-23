import { useState, useContext, useEffect } from "react";
import { InvoiceContext } from "../context/InvoiceContext";

function InvoiceForm({ onClose }) {   
      
      const [formData, setFormData] = useState({
        clientName: "",
        clientEmail: "",
        projectDescription: "",
      
        invoiceDate: "",
        paymentTerms: "30",
        paymentDue: "",
      
        senderAddress: {
          street: "",
          city: "",
          postcode: "",
          country: ""
        },
      
        clientAddress: {
          street: "",
          city: "",
          postcode: "",
          country: ""
        }
      });

      const handleSenderChange = (e) => {
        const { name, value } = e.target;
      
        setFormData(prev => ({
          ...prev,
          senderAddress: {
            ...prev.senderAddress,
            [name]: value
          }
        }));
      };

      const handleClientChange = (e) => {
        const { name, value } = e.target;
      
        setFormData(prev => ({
          ...prev,
          clientAddress: {
            ...prev.clientAddress,
            [name]: value
          }
        }));
      };

      const [items, setItems] = useState([
        {
          id: Date.now(),
          name: "",
          quantity: 1,
          price: 0,
        },
      ]);   
      
      const handleItemChange = (id, field, value) => {
        setItems(prev =>
          prev.map(item =>
            item.id === id
              ? { ...item, [field]: value }
              : item
          )
        );
      };

      const addItem = () => {
        setItems(prev => [
          ...prev,
          {
            id: Date.now(),
            name: "",
            quantity: 1,
            price: 0,
          },
        ]);
      };

      const deleteItem = (id) => {
        setItems(prev => prev.filter(item => item.id !== id));
      };

      const clearError = (key) => {
        setErrors(prev => {
          const updated = { ...prev };
          delete updated[key];
          return updated;
        });
      };

      const [errors, setErrors] = useState({});

      const validateForm = (status) => {
        const newErrors = {};
        const isStrict = status === "Pending";
      
        // ===== Sender Address =====
        if (isStrict && !formData.senderAddress.street.trim()) {
          newErrors.senderStreet = "Street is required";
        }
      
        if (isStrict && !formData.senderAddress.city.trim()) {
          newErrors.senderCity = "City is required";
        }
      
        if (isStrict && !formData.senderAddress.postcode.trim()) {
          newErrors.senderPostcode = "Postcode is required";
        }
      
        if (isStrict && !formData.senderAddress.country.trim()) {
          newErrors.senderCountry = "Country is required";
        }
      
        // ===== Client Info =====
        if (isStrict && !formData.clientName.trim()) {
          newErrors.clientName = "Client name is required";
        }
      
        if (isStrict && !formData.clientEmail.trim()) {
          newErrors.clientEmail = "Client email is required";
        }
      
        // ===== Client Address =====
        if (isStrict && !formData.clientAddress.street.trim()) {
          newErrors.clientStreet = "Street is required";
        }
      
        if (isStrict && !formData.clientAddress.city.trim()) {
          newErrors.clientCity = "City is required";
        }
      
        if (isStrict && !formData.clientAddress.postcode.trim()) {
          newErrors.clientPostcode = "Postcode is required";
        }
      
        if (isStrict && !formData.clientAddress.country.trim()) {
          newErrors.clientCountry = "Country is required";
        }
      
        // ===== Invoice Info =====
        if (isStrict && !formData.invoiceDate) {
          newErrors.invoiceDate = "Invoice date is required";
        }
      
        if (isStrict && !formData.projectDescription.trim()) {
          newErrors.projectDescription = "Project description is required";
        }
      
        // ===== Items =====
        if (isStrict && items.every(i => i.name.trim() === "")) {
          newErrors.items = "Add at least one item";
        }
      
        items.forEach((item, index) => {
          if (item.name.trim() === "") return;
      
          if (Number(item.quantity) <= 0) {
            newErrors[`qty-${index}`] = "Invalid qty";
          }
      
          if (Number(item.price) < 0) {
            newErrors[`price-${index}`] = "Invalid price";
          }
        });
      
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

        // const validateForm = (status) => {
        // const newErrors = {};

        // // Only enforce strict rules for "Save & Send"
        // const isStrict = status === "Pending";

        // // Sender
        // if (isStrict && !formData.senderAddress.street.trim()) {
        //     newErrors.senderStreet = "Required";
        // }

        // // Client
        // if (isStrict && !formData.clientName.trim()) {
        //     newErrors.clientName = "Required";
        // }

        // if (isStrict && !formData.clientEmail.trim()) {
        //     newErrors.clientEmail = "Required";
        // }

        // // Date
        // if (isStrict && !formData.invoiceDate) {
        //     newErrors.invoiceDate = "Required";
        // }

        // // Items
        // // const validItems = items.filter(i => i.name.trim() !== "");

        // // if (isStrict && validItems.length === 0) {
        // //     newErrors.items = "Add at least one item";
        // // }

        // // validItems.forEach((item, index) => {
        // //     if (item.quantity <= 0) {
        // //     newErrors[`qty-${index}`] = "Invalid qty";
        // //     }
        // //     if (item.price < 0) {
        // //     newErrors[`price-${index}`] = "Invalid price";
        // //     }
        // // });
        // // Check if at least one item exists
        // if (isStrict && items.every(i => i.name.trim() === "")) {
        //     newErrors.items = "Add at least one item";
        // }
        
        // // Validate using ORIGINAL array
        // items.forEach((item, index) => {
        //     if (item.name.trim() === "") return;
        
        //     if (item.quantity <= 0) {
        //     newErrors[`qty-${index}`] = "Invalid qty";
        //     }
        
        //     if (item.price < 0) {
        //     newErrors[`price-${index}`] = "Invalid price";
        //     }
        // });

        // setErrors(newErrors);

        // return Object.keys(newErrors).length === 0;
        // };

      const { invoices, setInvoices } = useContext(InvoiceContext);
      const handleSaveInvoice = (status) => {
        if (!validateForm(status)) return; 
        // build items with total
        const formattedItems = items.map(item => ({
          ...item,
          quantity: Number(item.quantity),
          price: Number(item.price),
          total: Number(item.quantity) * Number(item.price)
        }));
      
        // calculate grand total
        const total = formattedItems.reduce(
          (sum, item) => sum + item.total,
          0
        );
      
        const newInvoice = {
          id: `INV-${Date.now()}`,
          clientName: formData.clientName || "",
          clientEmail: formData.clientEmail || "",
          projectDescription: formData.projectDescription || "",
          invoiceDate: formData.invoiceDate || "",
          status: status, // "draft" or "pending"
          paymentDue: formData.paymentDue || "",
          senderAddress: formData.senderAddress,
          clientAddress: formData.clientAddress,
      
          items: formattedItems,
          total: total
        };
      
        setInvoices(prev => [newInvoice, ...prev]);
      
        onClose(); // close drawer
      };

      const calculatePaymentDue = (invoiceDate, days) => {
        if (!invoiceDate) return "";
      
        const date = new Date(invoiceDate);
        date.setDate(date.getDate() + Number(days));
      
        return date.toISOString().split("T")[0];
      };

      useEffect(() => {
        const due = calculatePaymentDue(
          formData.invoiceDate,
          formData.paymentTerms
        );
      
        setFormData(prev => ({
          ...prev,
          paymentDue: due
        }));
      }, [formData.invoiceDate, formData.paymentTerms]);

    return (
      <div className="drawer-overlay">
  
        <div className="drawer">
  
          {/* CLOSE AREA */}
          <div className="drawer-header">
            <h2>New Invoice</h2>
          </div>
  
          {/* BODY (we’ll fill later) */}
          <div className="drawer-body">
            <div className="form-section">

                <h4 className="section-title">Bill From</h4>

                {/* Street */}
                <div className="form-group">
                    <label>Street Address</label>
                    <input
                        type="text"
                        name="street"
                        value={formData.senderAddress.street}
                        onChange={handleSenderChange}
                    />
                    {errors.senderStreet && (
                    <small className="error">{errors.senderStreet}</small>
                    )}
                </div>

                {/* Row: City, State, Country */}
                <div className="form-row">

                    <div className="form-group">
                        <label>City</label>
                        <input
                        type="text"
                        name="city"
                        value={formData.senderAddress.city}
                        onChange={handleSenderChange}
                        />
                        {errors.senderCity && (
                        <small className="error">{errors.senderCity}</small>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Postcode</label>
                        <input
                        type="text"
                        name="postcode"
                        value={formData.senderAddress.postcode}
                        onChange={handleSenderChange}
                        />
                         {errors.senderPostcode && (
                        <small className="error">{errors.senderPostcode}</small>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Country</label>
                        <input
                        type="text"
                        name="country"
                        value={formData.senderAddress.country}
                        onChange={handleSenderChange}
                        />
                           {errors.senderCountry && (
                        <small className="error">{errors.senderCountry}</small>
                        )}
                    </div>

                </div>

                <h4 className="section-title">Bill To</h4>

                {/* Client Name */}
                <div className="form-group">
                <label>Client's Name</label>
                <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={(e) =>
                    setFormData(prev => ({
                        ...prev,
                        clientName: e.target.value
                    }))
                    }
                />
                {errors.clientName && (
                    <small className="error">{errors.clientName}</small>
                )}
                </div>

                {/* Client Email */}
                <div className="form-group">
                <label>Client's Email</label>
                <input
                    type="email"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={(e) =>
                    setFormData(prev => ({
                        ...prev,
                        clientEmail: e.target.value
                    }))
                    }
                />
                 {errors.clientEmail && (
                    <small className="error">{errors.clientEmail}</small>
                )}
                </div>
                {/* Street */}
                <div className="form-group">
                    <label>Street Address</label>
                    <input
                        type="text"
                        name="street"
                        value={formData.clientAddress.street}
                        onChange={handleClientChange}
                    />
                     {errors.clientStreet && (
                    <small className="error">{errors.clientStreet}</small>
                    )}
                </div>

                {/* Row: City, State, Country */}
                <div className="form-row">

                    <div className="form-group">
                        <label>City</label>
                        <input
                        type="text"
                        name="city"
                        value={formData.clientAddress.city}
                        onChange={handleClientChange}
                        />
                         {errors.clientCity && (
                        <small className="error">{errors.clientCity}</small>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Postcode</label>
                        <input
                        type="text"
                        name="postcode"
                        value={formData.clientAddress.postcode}
                        onChange={handleClientChange}
                        />
                         {errors.clientPostcode && (
                        <small className="error">{errors.clientPostcode}</small>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Country</label>
                        <input
                        type="text"
                        name="country"
                        value={formData.clientAddress.country}
                        onChange={handleClientChange}
                        />
                         {errors.clientCountry && (
                        <small className="error">{errors.clientCountry}</small>
                        )}
                    </div>

                </div>

                {/* Row: City, State, Country */}
                <div className="form-row">

                    <div className="form-group">
                        <label>Invoice Date</label>
                        <input
                        type="date"
                        name="invoiceDate"
                        value={formData.invoiceDate}
                        onChange={(e) =>
                        setFormData(prev => ({
                            ...prev,
                            invoiceDate: e.target.value
                        }))
                        }
                        />
                        {errors.invoiceDate && (
                        <small className="error">{errors.invoiceDate}</small>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Payment Terms</label>
                        <select
                            name="paymentTerms"
                            value={formData.paymentTerms}
                            onChange={(e) =>
                            setFormData(prev => ({
                                ...prev,
                                paymentTerms: e.target.value
                            }))
                            }
                        >
                            <option value="30">Next 30 days</option>
                            <option value="21">Next 21 days</option>
                            <option value="14">Next 14 days</option>
                            <option value="7">Next 7 days</option>
                        </select>
                    </div>

                </div>
                {/* Project Description */}
                <div className="form-group">
                <label>Project Description</label>
                <input
                    type="text"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={(e) =>
                    setFormData(prev => ({
                        ...prev,
                        projectDescription: e.target.value
                    }))
                    }
                />
                 {errors.projectDescription && (
                        <small className="error">{errors.projectDescription}</small>
                        )}
                </div>

                <h4>Item List</h4>
                {errors.items && (
                    <small className="error">{errors.items}</small>
                    )}
                {/* HEADER ROW */}
                <div className="item-header form-row">
                    <span>Item Name</span>
                    <span>Qty</span>
                    <span>Price</span>
                    <span>Total</span>
                    {/* <span>&nbsp;</span> */}
                    <span></span>
                </div>
              
                <div className="form-row item-list">
                    {items.map((item, index) => {
                        const total = Number(item.quantity) * Number(item.price);

                        return (
                        <div className="form-row item-row" key={item.id}>

                            {/* Item Name */}
                            <input
                            type="text"
                            placeholder="Item Name"
                            value={item.name}
                            onChange={(e) =>
                                handleItemChange(item.id, "name", e.target.value)
                            }
                            />

                            {/* Quantity */}
                            <div>
                                <input
                                type="number"
                                placeholder="Qty"
                                value={item.quantity}
                                onChange={(e) =>
                                    handleItemChange(item.id, "quantity", e.target.value)
                                }
                                />
                                {errors[`qty-${index}`] && (
                                <small className="error">
                                    {errors[`qty-${index}`]}
                                </small>
                                )}
                            </div>
                            {/* Price */}
                            <div>
                                <input
                                type="number"
                                placeholder="Price"
                                value={item.price}
                                onChange={(e) =>
                                    handleItemChange(item.id, "price", e.target.value)
                                }
                                />
                                {errors[`price-${index}`] && (
                                <small className="error">
                                    {errors[`price-${index}`]}
                                </small>
                                )}
                            </div>
                           {/* TOTAL (plain text) */}
                            <span className="item-total">
                                {total}
                            </span>
                            {/* Delete */}
                            <button
                            type="button"
                            onClick={() => deleteItem(item.id)}
                            >
                            🗑
                            </button>
                        </div>
                        );
                    })}
                </div>
                <div className="addNewItem">
                    <button className="btn-default" type="button" onClick={addItem}>
                        + Add New Item
                    </button>
                </div>


            </div>
          </div>
  
          {/* FOOTER */}
          <div className="drawer-footer">
            <div>
                <button  className="btn-default" onClick={onClose}>Discard</button>
            </div>
            <div className="drawer-footer-right">
                <button className="btn-dark" onClick={() => handleSaveInvoice("Draft")}>Save as Draft</button>
                <button className="btn-primary" onClick={() => handleSaveInvoice("Pending")}>Save & Send</button>
            </div>
          </div>
  
        </div>
  
        {/* Click outside to close */}
        <div className="overlay-click" onClick={onClose}></div>
  
      </div>
    );
  }
  
  export default InvoiceForm;