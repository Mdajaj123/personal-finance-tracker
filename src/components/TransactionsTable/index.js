import React, { useState } from 'react'
import { Table, Select, Radio, Input, Button, Flex } from 'antd';
import { unparse, parse,parseFLoat } from "papaparse";
import { toast } from 'react-toastify';
import './style.css';
import searchIcon from '../../assets/search 1.svg'

const TransactionsTable = ({ transactions, addTransaction, fetchTransactions }) => {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [sortKey, setSortKey] = useState('');
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        }

    ];
    let filterTransactions = transactions.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typeFilter))
    let sortedtransactions = filterTransactions.sort((a, b) => {
        if (sortKey === 'date') {
            return new Date(a.date) - new Date(b.date);
        }
        else if (sortKey === 'amount') {
            return a.amount - b.amount;
        }
        else {
            return 0;
        }
    })
    function exportCSV() {
        var csv = unparse({
            fields: ["name", "type", "tag", "date", "amount"],
            data: transactions,
            // transactions,
        });
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        // tempLink = document.createElement("a");
        // tempLink.href = csvURL;
        // tempLink.setAttribute("download", "transactions.csv");
        // tempLink.click();
        const link = document.createElement("a");
        link.href = url;
        link.download = "transactions.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    function importFromCSV(event) {
        event.preventDefault();
        try {
            parse(event.target.files[0], {
                header: true,
                complete: async function (result) {
                    console.log("RESULT>>>", result);
                    for (const transaction of result.data) {
                        console.log("Transactions", transaction);
                        const newTransaction = {
                            ...transaction,
                            amount: parseFLoat(transaction.amount),
                            
                        }
                        await addTransaction(newTransaction, true);
                    }
                },
            });
            toast.success("All transaction Added!")
            fetchTransactions();
            event.target.files = null;
        }
        catch (e) {
            toast.error(e.message);
        }
    }

    return (
        <>
            <div className='search-bar'>
                <img style={{ width: "1rem", height: "1rem" }} src={searchIcon} />
                <Input
                    value={search}
                    className="input"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by Name"
                />
                <Select
                    className="custom-input-2"
                    onChange={(value) => setTypeFilter(value)}
                    value={typeFilter}
                    allowClear
                >
                    <Select.Option value="">All</Select.Option>
                    <Select.Option value="income">Income</Select.Option>
                    <Select.Option value="expense">Expense</Select.Option>
                </Select>
            </div>
            <div className='sort-bar'>
                <h3
                    style={{
                        padding: "0 0.5rem",
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 600,
                    }}
                >
                    My Transaction
                </h3>
                <Radio.Group
                    className="input-radio"
                    onChange={(e) => setSortKey(e.target.value)}
                    value={sortKey}
                >
                    <Radio.Button value="">No Sort</Radio.Button>
                    <Radio.Button value="amount">Sort by Amount</Radio.Button>
                    <Radio.Button value="date">Sort by Date</Radio.Button>
                </Radio.Group>
                <Flex  className='import-export'>
                    <Button onClick={exportCSV}>Export To CSV</Button>
                    {/* <label htmlFor='files-csv'><Button onClick={importFromCSV} type="primary">Import from CSV</Button></label> */}
                    <label for='files-csv' className='btn btn-blue'>Import from CSV</label>
                    <Input className='input' id="files-csv" type="file" accept=".csv" required style={{display:"none"}} onChange={importFromCSV} />
                </Flex>
            </div>
            <div className='table-1'>
                <Table dataSource={sortedtransactions} columns={columns} pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "30"],
                }} />
            </div>
        </>
    )
}

export default TransactionsTable
