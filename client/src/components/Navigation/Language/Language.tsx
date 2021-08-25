import React, { useState } from 'react';
import classes from './Language.module.scss';
import { cn } from '../../../utilities/joinClasses';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../store/configureStore';
import { LanguageState } from '../../../store/reducers/languageReducer';
import { objecToArray } from '../../../utilities/objectToArr';
import { changeLanguageAction } from '../../../store/actions/languageActions';

const Language: React.FC = () => {
  const dispatch = useDispatch();
  const language: LanguageState = useSelector(
    (state: StoreState) => state.language
  );
  const { languages, selected } = language;
  const handleSetLanguage = (lang: string) => {
    dispatch(changeLanguageAction(lang));
  };
  const languagesArray: { [key: string]: string }[] = objecToArray(languages);

  let languagesRender = (
    <div className={classes.Languages}>
      <p className={classes.SelectedLanguage}>{selected}</p>
      <div className={classes.SelectLanguage}>
        {languagesArray.map((item) => (
          <p
            key={item.id}
            onClick={() => handleSetLanguage(item.config)}
            className={cn(
              classes.CustomBtn,
              selected === item.config ? classes.Selected : ''
            )}
          >
            {item.config}
          </p>
        ))}
      </div>
    </div>
  );
  return <React.Fragment>{languagesRender}</React.Fragment>;
};
export default Language;
