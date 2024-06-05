
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { FormProvider } from './context/FormContext';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <FormProvider>
  <App />
</FormProvider>
)
