import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Transaction from './Transaction';
import { Link } from 'react-router-dom';
import history from '../history';

const POLL_INTERVAL_MS = 10000;

class TransactionPool extends Component {
  state = { TransactionPoolMap: {} }
  
  fetchTransactionPoolMap = () => {
      fetch(`${document.location.origin}/api/transaction-pool-map`)
        .then(response => response.json())
        .then(json => this.setState({ TransactionPoolMap: json }))
  }

  fetchMineTransactions = () => {
      fetch(`${document.location.origin}/api/mine-transactions`)
        .then(response => {
            if (response.status === 200) {
                alert('success');
                history.push('/blocks');
            } else {
                alert('The mine-transactions block request did not complete.');
            }
        })
  }

  componentDidMount() {
      this.fetchTransactionPoolMap();

      this.fetchPoolMapInterval = setInterval(
          () => this.fetchTransactionPoolMap(),
          POLL_INTERVAL_MS
      )
  }

  componentWillMount() {
     clearInterval(this.fetchPoolMapInterval); 
  }

  render() {
      return (
          <div className='TransactionPool'>
            <div><Link to='/'>Home</Link></div>
            <h3>Transaction Pool</h3>
            {
                Object.values(this.state.TransactionPoolMap).map(transaction => {
                  return(
                     <div key={transaction.id}>
                        <hr/> 
                        <Transaction transaction={transaction} />
                     </div> 
                  )  
                })
            }
            <hr/>
            <Button
               variant='danger'
               onClick={this.fetchMineTransactions} 
            >
               Mine the Transactions
            </Button>
          </div>
      )
  }
}

export default TransactionPool;