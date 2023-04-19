import { Link, useNavigate } from "react-router-dom";

import LogoIcon from '../../../shared/assets/icons/logo.svg'
import HomeIcon from '../../../shared/assets/icons/home.svg'
import RouteIcon from '../../../shared/assets/icons/route.svg'
import FolderCheckIcon from '../../../shared/assets/icons/folder-check.svg'
import PieChartIcon from '../../../shared/assets/icons/pie-chart.svg'
import SettingsIcon from '../../../shared/assets/icons/settings-header.svg'
import LogoutIcon from '../../../shared/assets/icons/logout.svg'

import { LinkMenu } from "../../atoms/link/LinkMenu.styled";
import { Box } from './../../atoms/box/Box.styled';
import { Typography } from "../../atoms/typography/Typography.styled";
import { HeaderWrapper } from './Header.styled';
import { List } from './../../atoms/list/List.styled';
import { ListItem } from './../../atoms/list/ListItem.styled';
import { ButtonTransparent } from "../../atoms/button/ButtonTransparent.styled";
import { useContext } from "react";
import { PopupContext } from "../../../contexts/PopupContext";
import { useAppDispatch } from "../../../store/hooks";
import { logoutUser, resetUser } from "../../../store/userSlice";
import PopupEditProfile from "../popup/PopupEditProfile";
import PopupDeleteAccount from "../popup/PopupDeleteAccount";

const Header: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const {
    isEditProfilePopupOpen,
    setIsEditProfilePopupOpen,
    isDeleteAccountPopupOpen,
  } = useContext(PopupContext);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  function handleLogOutClick() {
    dispatch(logoutUser());
    dispatch(resetUser());
    navigate('/');
  }

  return (
    <>
      <HeaderWrapper>
        <Box mr="56px">
          <Link to="/home">
            <LogoIcon />
            <Typography as="span">Spendwise</Typography>
          </Link>
        </Box>

        <List gap="4px">
          <ListItem>
            <LinkMenu to="/home">
              <HomeIcon />
              <Typography as="span">Головна</Typography>
            </LinkMenu>
          </ListItem>
          <ListItem>
            <LinkMenu to="/transactions">
              <RouteIcon />
              <Typography as="span">Транзакції</Typography>
            </LinkMenu>
          </ListItem>
          <ListItem>
            <LinkMenu to="/categories">
              <FolderCheckIcon />
              <Typography as="span">Категорії</Typography>
            </LinkMenu>
          </ListItem>
          <ListItem>
            <LinkMenu to="/statistics">
              <PieChartIcon />
              <Typography as="span">Статистика</Typography>
            </LinkMenu>
          </ListItem>
        </List>

        <Box display="flex" alignItems="center" gap="40px">
          <ButtonTransparent title="Налаштування">
            <SettingsIcon onClick={handleEditProfileClick} />
          </ButtonTransparent>
          <ButtonTransparent title="Вийти">
            <LogoutIcon onClick={handleLogOutClick} />
          </ButtonTransparent>
        </Box>
      </HeaderWrapper>

      {isEditProfilePopupOpen && <PopupEditProfile />}
      {isDeleteAccountPopupOpen && <PopupDeleteAccount />}
    </>
  );
}

export default Header;