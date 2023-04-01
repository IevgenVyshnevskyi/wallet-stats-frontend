import {Input} from '../../atoms/input/Input.styled';
import VisibilityOn from '../../../shared/assets/icons/visibility-on.svg'
import VisibilityOff from '../../../shared/assets/icons/visibility-off.svg'
import {useState} from 'react';
import {InputPasswordWrapper} from './InputPassword.styled';

/*type InputPasswordProps = {
    labelId?: string;
    inputName?: string;
    onChangeProps?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}*/
const InputPassword: React.FC/*<InputPasswordProps>*/ = (/*{labelId, inputName, onChangeProps, ...rest}*/) => {


    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <InputPasswordWrapper>
            <Input /*onChange={onChangeProps} id={labelId} name={inputName} */ type={showPassword ? 'text' : 'password'}/>
            {showPassword ?
                <VisibilityOff onClick={toggleShowPassword}/>
                :
                <VisibilityOn onClick={toggleShowPassword}/>
            }
        </InputPasswordWrapper>
    );
}

export default InputPassword;