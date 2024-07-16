import React, { Component } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import pdfFile from './dummy.pdf'; // Replace with the actual path to your PDF file

class InvoiceScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            country: '',
            bankKey: '',
            bankAccNo: '',
            reference: '',
            debit: '',
            glDesc: '',
            glCode: '',
            text: '',
            message: '',
            error: ''
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { bankKey, bankAccNo, glDesc, glCode } = this.state;

        try {
            const response = await fetch('http://localhost:5000/api/entry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bankKey, bankAccNo, glDesc, glCode }),
            });

            const data = await response.json();

            if (response.ok) {
                this.setState({
                    glDesc: data.glDesc,
                    glCode: data.glCode,
                    message: data.message || '',
                    error: ''
                });
            } else {
                this.setState({ error: data.message || 'An error occurred', message: '' });
            }
        } catch (error) {
            this.setState({ error: 'An error occurred', message: '' });
        }
    };

    render() {
        return (
            <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
                <div style={{ flex: 1, padding: '10px', overflow: 'auto', borderRight: '1px solid #ccc' }}>
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.9.359/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={pdfFile} />
                    </Worker>
                </div>
                <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
                    <h2>Invoice Details</h2>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} onSubmit={this.handleSubmit}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Country:</label>
                            <input 
                                type="text" 
                                name="country" 
                                value={this.state.country} 
                                onChange={this.handleChange} 
                                style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }} 
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Bank Key / IFSC Code:</label>
                            <input 
                                type="text" 
                                name="bankKey" 
                                value={this.state.bankKey} 
                                onChange={this.handleChange} 
                                style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }} 
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Bank Acc No:</label>
                            <input 
                                type="text" 
                                name="bankAccNo" 
                                value={this.state.bankAccNo} 
                                onChange={this.handleChange} 
                                style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }} 
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Reference:</label>
                            <input 
                                type="text" 
                                name="reference" 
                                value={this.state.reference} 
                                onChange={this.handleChange} 
                                style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }} 
                            />
                        </div>
                        <h3>Line Item Details</h3>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Debit:</label>
                            <input 
                                type="text" 
                                name="debit" 
                                value={this.state.debit} 
                                onChange={this.handleChange} 
                                style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }} 
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>GL Desc:</label>
                            <input 
                                type="text" 
                                name="glDesc" 
                                value={this.state.glDesc} 
                                onChange={this.handleChange} 
                                style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }} 
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>GL Code:</label>
                            <input 
                                type="text" 
                                name="glCode" 
                                value={this.state.glCode} 
                                onChange={this.handleChange} 
                                style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }} 
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Text:</label>
                            <input 
                                type="text" 
                                name="text" 
                                value={this.state.text} 
                                onChange={this.handleChange} 
                                style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }} 
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <button type="submit" style={{ padding: '10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Calculate</button>
                            <button type="button" style={{ padding: '10px', background: '#008CBA', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add</button>
                        </div>
                    </form>
                    {this.state.message && <div style={{ color: 'green', marginTop: '10px' }}>{this.state.message}</div>}
                    {this.state.error && <div style={{ color: 'red', marginTop: '10px' }}>{this.state.error}</div>}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <button type="button" style={{ padding: '10px', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Reject</button>
                        <button type="button" style={{ padding: '10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Approve</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default InvoiceScreen;
