import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getCategories } from "../../../store/categorySlice";

import { token } from '../../../api/api';

import { Box } from "../../atoms/box/Box.styled";
import Header from '../../molecules/header/Header';
import Categories from './Categories';
import EditCategory from './EditCategory';
import AddCategory from './AddCategory';
import { CategoriesPageWrapper } from "./CategoriesPage.styled";

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

  const { isLoggedIn, isRegistered } = useAppSelector(state => state.user);

  if (!token && !isRegistered && !isLoggedIn) {
    navigate("/welcome")
  }

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (!isLoading) {
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

      <Box m="0 36px 24px" display="flex" grow="1" gap="25px">
        <Categories />

        {isEditCategoryOpen ? <EditCategory /> : <AddCategory />}
      </Box>
    </CategoriesPageWrapper>
  );
}

export default CategoriesPage;