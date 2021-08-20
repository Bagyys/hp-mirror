import { useState } from 'react';
import classes from './Language.module.scss';
import { cn } from '../../../utilities/joinClasses';
const Language: React.FC = () => {
  const [language, setLanguage] = useState<string>('EN');
  const [showLangBox, setShowLangBox] = useState<boolean>(false);
  const handleSetLanguage = (e: any) => {
    const lang = e.target.dataset.value;
    setLanguage(lang);
  };
  return (
    <div
      onClick={() => setShowLangBox(!showLangBox)}
      className={classes.Languages}
    >
      <p className={classes.Lg}>{language}</p>
      <div className={classes.SelectLanguage}>
        <button
          onClick={handleSetLanguage}
          className={cn(
            classes.CustomBtn,
            language == 'EN' ? classes.Selected : ''
          )}
          data-value="EN"
        >
          EN
        </button>
        <p
          onClick={handleSetLanguage}
          className={cn(
            classes.CustomBtn,
            language == 'LT' ? classes.Selected : ''
          )}
          data-value="LT"
        >
          LT
        </p>
      </div>
    </div>
  );
};
export default Language;
