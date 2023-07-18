import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Form from './components/Form';
import Table from './components/Table';
import './App.css';

const App = () => {

  const [transactions, setTransactions] = useState([]);
  const [partialSum, setPartialSum] = useState(0.00);
  const [totalSum, setTotalSum] = useState(0.00);
  const [formData, setFormData] = useState({
    accountId: '',
    startDate: '',
    endDate: '',
    transactionOperatorName: ''
  });
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [accountId, setAccountId] = useState('');
  const [errorInfo, setErrorInfo] = useState(null);

  const handleSubmit = async (formData) => {
    setFormData(formData);
    setIsSearchPerformed(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestData = {
          accountId: formData.accountId
        };

        if (formData.startDate.trim() !== '') {
          requestData.startDate = moment(formData.startDate).toISOString();
        }

        if (formData.endDate.trim() !== '') {
          requestData.endDate = moment(formData.endDate).toISOString();
        }

        if (formData.transactionOperatorName.trim() !== '') {
          requestData.transactionOperatorName = formData.transactionOperatorName;
        }

        const response = await axios.get('http://localhost:8080/api/transactions', {
          params: requestData,
        });

        const { transactions, partialSum, totalSum } = response.data;
        setTransactions(transactions);
        setPartialSum(partialSum);
        setTotalSum(totalSum);
        setAccountId(formData.accountId);
        setShowResult(true);
        setErrorInfo(null);

      } catch (error) {
        setErrorInfo({
          title: error.response.data.title,
          details: error.response.data.details,
        });
        setTransactions([]);
        setPartialSum(0.00);
        setTotalSum(0.00);
        setShowResult(true);
      }
    };

    if (isSearchPerformed) {
      fetchData();
      setIsSearchPerformed(false);
    }
  }, [isSearchPerformed, formData]);

  const handleFormChange = (fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value
    }));
  };

  return (
    <div>
      {showResult && (
        <div className={errorInfo ? 'alert alert-warning info-div' : 'alert alert-primary info-div'} role="alert">
          <h6>{errorInfo ? errorInfo.title : `Número da conta bancária: ${accountId}`}</h6>
          {errorInfo && <p>{errorInfo.details}</p>}
        </div>
      )}
      <Form
        formData={formData}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
      />
      {showResult && !errorInfo && (
        <Table transactions={transactions} partialSum={partialSum} totalSum={totalSum}/>
      )}
    </div>
  );
};

export default App;
