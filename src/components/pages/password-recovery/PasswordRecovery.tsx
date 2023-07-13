import { useParams } from "react-router-dom";

import { useAppSelector } from "../../../store/hooks";

import NewPasswordStep from "./NewPasswordStep";
import EmailStep from "./EmailStep";
import ResetLinkStep from "./ResetLinkStep";

const PasswordRecovery: React.FC = () => {
  const { uid, resetToken } = useParams<{ uid: string; resetToken: string }>();

  const { isResetLinkStepOpen } = useAppSelector(
    (state) => state.passwordRecovery
  );

  return uid && resetToken ? (
    <NewPasswordStep uid={uid} resetToken={resetToken} />
  ) : isResetLinkStepOpen ? (
    <ResetLinkStep />
  ) : (
    <EmailStep />
  );
};

export default PasswordRecovery;
