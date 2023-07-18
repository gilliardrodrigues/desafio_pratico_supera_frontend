import React from 'react'

const Form = ({ formData, onFormChange, onSubmit }) => {

  const { accountId, startDate, endDate, transactionOperatorName } = formData;

  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (fieldName, value) => {
    onFormChange(fieldName, value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container-inputs">
        <label>
          Número da conta bancária:
          <input
            type="text"
            value={accountId}
            className="form-control"
            onChange={(e) => handleInputChange('accountId', e.target.value)}
          />
        </label>
        <label>
          Data de início:
          <input
            type="datetime-local"
            value={startDate}
            className="form-control"
            onChange={(e) => handleInputChange('startDate', e.target.value)}
          />
        </label>
        <label>
          Data de fim:
          <input
            type="datetime-local"
            value={endDate}
            className="form-control"
            onChange={(e) => handleInputChange('endDate', e.target.value)}
          />
        </label>
        <label>
          Nome do operador transacionado:
          <input
            type="text"
            value={transactionOperatorName}
            className="form-control"
            onChange={(e) => handleInputChange('transactionOperatorName', e.target.value)}
          />
        </label>
      </div>
      <button type="submit" className="btn btn-primary search-btn" >Pesquisar</button>
    </form>
  );
};

export default Form;