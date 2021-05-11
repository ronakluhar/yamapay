import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { MerchantMenu } from './components/merchantDetail'
import MerchantListing from './components/merchantList/MerchantListing'
import { Provider } from 'react-redux'

import {
  Cart,
  CustomizeOrder,
  OrderStatus,
  ReviewOrder,
} from './components/Orders'
import {
  InvalidCard,
  PaymentCard,
  PaymentSuccess,
} from './components/PaymentCard'
import './styles/main.scss'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

const App = () => {
  return (
    <div className="app">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={MerchantListing} />
              <Route path="/restaurant" component={MerchantMenu} />
              <Route path="/customize-order" component={CustomizeOrder} />
              <Route path="/cart" component={Cart} />
              <Route path="/review-order" component={ReviewOrder} />
              <Route path="/invalid-card" component={InvalidCard} />
              <Route path="/payment-success" component={PaymentSuccess} />
              <Route path="/payment-card" component={PaymentCard} />
              <Route path="/order-status" component={OrderStatus} />
            </Switch>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  )
}

export default App
