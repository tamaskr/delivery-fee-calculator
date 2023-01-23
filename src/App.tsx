import { useTranslation } from 'react-i18next';
import './App.css';

const App = () => {
  const { t } = useTranslation();
  return (
    <div className="App">
      <header className="App-header">
        <p>{t('general.title')}</p>
      </header>
    </div>
  );
};

export default App;
