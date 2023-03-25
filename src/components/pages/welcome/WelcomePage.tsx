import { Box } from '../../atoms/box/Box.styled';
import { Typography } from './../../atoms/typography/Typography.styled';
import { Link } from './../../atoms/link/Link.styled';

const WelcomePage: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      m="130px 0 0 0"
    >
      <Box>
        <Typography as="h1" fz="24px" fw="700" textAlign='center' m="0 0 27px 0">
          Екран привітання
        </Typography>
        {/* <Img src={WelcomePlaceholder} alt="Welcome" /> */}
        <Box display='flex' gap='40px' justifyContent="center" m="50px 0 0 0">
          <Link to="#">Реєстрація</Link>
          <Link to="#">Вхід</Link>
        </Box>
      </Box>
    </Box>
  );
}

export default WelcomePage;
