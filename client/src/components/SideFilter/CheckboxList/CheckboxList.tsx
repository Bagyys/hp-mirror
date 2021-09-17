import classes from './CheckboxList.module.scss';
import { ChangeEvent } from 'react';
import Input from '../../../routes/components/Input/Input';
import { FilterDataInterface } from '../../../store/types/filterInterface';
interface CheckboxListProps {
  checkboxList: {
    id: string;
    config: { value: boolean; type: string; text: string };
  }[];
  mainId: keyof FilterDataInterface;
  showHideInputs: boolean;
  changeInputHandler: (
    ev: ChangeEvent<HTMLInputElement>,
    id: string,
    mainId: keyof FilterDataInterface
  ) => void;
}
const CheckboxList: React.FC<CheckboxListProps> = (props) => (
  <div className={classes.CheckboxList}>
    {props.checkboxList &&
      props.checkboxList.map(({ id, config }, index) => {
        return (
          <Input
            inputClass={!props.showHideInputs && index >= 6 ? 'Hide' : ''}
            key={id}
            type={config.type}
            value={config.value}
            label={config.text}
            changed={(ev) => props.changeInputHandler(ev, id, props.mainId)}
          />
        );
      })}
  </div>
);
export default CheckboxList;
