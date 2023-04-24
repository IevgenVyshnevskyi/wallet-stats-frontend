import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getCategories } from "../../../store/categorySlice";

import { Box } from "../../atoms/box/Box.styled";
import { CategoriesPageWrapper } from "./CategoriesPage.styled";
import Header from '../../molecules/header/Header';

import Categories from './Caregories';
import EditCategory from './EditCategory';
import AddCategory from './AddCategory';
import { token } from '../../../api/api';
import { useNavigate } from 'react-router-dom';

const CategoriesPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const {
    isAddCategorySuccess,
    isEditCategorySuccess,
    isDeleteCategorySuccess,
    isEditCategoryOpen,
    isLoading
  } = useAppSelector(state => state.category);

  const { isLoggedIn, isRegistered, user } = useAppSelector(state => state.user);

  if (!token && !isRegistered && !isLoggedIn) {
    navigate("/welcome")
  }

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (isLoading === false) {
      dispatch(getCategories());
    }
  }, [isLoading]);

  useEffect(() => {
    if (isAddCategorySuccess || isEditCategorySuccess || isDeleteCategorySuccess) {
      dispatch(getCategories());
    }
  }, [isAddCategorySuccess, isEditCategorySuccess, isDeleteCategorySuccess]);

  return (
    <CategoriesPageWrapper>
      <Header />

      <Box m="0 20px 36px" display="flex" grow="1" gap="25px">
        <Categories />

        {isEditCategoryOpen ? <EditCategory /> : <AddCategory />}
      </Box>
    </CategoriesPageWrapper>
  );
}

export default CategoriesPage;