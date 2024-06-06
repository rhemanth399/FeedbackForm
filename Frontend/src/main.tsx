
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { FormProvider } from './context/FormContext.tsx';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <FormProvider>
  <App />
</FormProvider>
</BrowserRouter>
)
