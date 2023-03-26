import { Link } from "react-router-dom";

import { LinkMenu } from "../../atoms/link/LinkMenu.styled";
import { Box } from './../../atoms/box/Box.styled';
import { Typography } from "../../atoms/typography/Typography.styled";

import LogoIcon from '../../../shared/assets/icons/logo.svg'
import HomeIcon from '../../../shared/assets/icons/home.svg'
import RouteIcon from '../../../shared/assets/icons/route.svg'
import FolderCheckIcon from '../../../shared/assets/icons/folder-check.svg'
import PieChartIcon from '../../../shared/assets/icons/pie-chart.svg'
import SettingsIcon from '../../../shared/assets/icons/settings-header.svg'
import LogoutIcon from '../../../shared/assets/icons/logout.svg'

import { StyledHeader } from './Header.styled';
import { List } from './../../atoms/list/List.styled';
import { ListItem } from './../../atoms/list/ListItem.styled';
import { ButtonTransparent } from "../../atoms/button/ButtonTransparent.styled";

const Header: React.FC = () => {
  function logOut() { }

  return (
    <StyledHeader>
      <Box m="0 56px 0 0">
        <Link to="/">
          <LogoIcon />
          <Typography as="span">Spendwise</Typography>
        </Link>
      </Box>

      <List>
        <ListItem>
          <LinkMenu to="#">
            <HomeIcon />
            <Typography as="span">Головна</Typography>
          </LinkMenu>
        </ListItem>
        <ListItem>
          <LinkMenu to="#">
            <RouteIcon />
            <Typography as="span">Транзакції</Typography>
          </LinkMenu>
        </ListItem>
        <ListItem>
          <LinkMenu to="#">
            <FolderCheckIcon />
            <Typography as="span">Категорії</Typography>
          </LinkMenu>
          <LinkMenu to="#">
            <PieChartIcon />
            <Typography as="span">Статистика</Typography>
          </LinkMenu>
        </ListItem>
      </List>

      <Box display="flex" alignItems="center" gap="40px">
        <ButtonTransparent>
          <SettingsIcon />
        </ButtonTransparent>
        <ButtonTransparent>
          <LogoutIcon onClick={logOut} />
        </ButtonTransparent>
      </Box>
    </StyledHeader>
  );
}

export default Header;