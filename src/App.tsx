import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { MerchantMenu } from './components/merchantDetail'
import MerchantListing from './components/merchantList/MerchantListing'
import CustomizeOrder from './components/Orders/CustomizeOrder'
import './styles/main.scss'

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MerchantListing} />
          <Route path="/restaurant" component={MerchantMenu} />
          <Route path="/customize-order" component={CustomizeOrder} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
