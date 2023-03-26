import { Input } from '../../atoms/input/Input.styled';
import VisibilityOn from '../../../shared/assets/icons/visibility-on.svg'
import VisibilityOff from '../../../shared/assets/icons/visibility-off.svg'
import { useState } from 'react';
import { InputPasswordWrapper } from './InputPassword.styled';

const InputPassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <InputPasswordWrapper>
      <Input type={showPassword ? 'text' : 'password'} />
      {showPassword ?
        <VisibilityOff onClick={toggleShowPassword} />
        :
        <VisibilityOn onClick={toggleShowPassword} />
      }
    </InputPasswordWrapper>
  );
}

export default InputPassword;