import { Input } from '../../atoms/input/Input.styled';
import VisibilityOn from '../../../shared/assets/icons/visibility-on.svg'
import VisibilityOff from '../../../shared/assets/icons/visibility-off.svg'
import { useState } from 'react';
import { StyledInputPassword } from './InputPassword.styles';

const InputPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <StyledInputPassword>
      <Input type={showPassword ? 'text' : 'password'} />
      {showPassword ?
        <VisibilityOn onClick={toggleShowPassword} />
        :
        <VisibilityOff onClick={toggleShowPassword} />
      }
    </StyledInputPassword>
  );
}

export default InputPassword;