import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { MerchantMenu } from './components/merchantDetail'
import MerchantListing from './components/merchantList/MerchantListing'
import { Cart, CustomizeOrder } from './components/Orders'
import './styles/main.scss'

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MerchantListing} />
          <Route path="/restaurant" component={MerchantMenu} />
          <Route path="/customize-order" component={CustomizeOrder} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
