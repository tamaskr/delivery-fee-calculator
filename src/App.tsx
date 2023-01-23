import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation();
  return (
    <Typography>
      {t('general.title')}
    </Typography>
  );
};

export default App;
