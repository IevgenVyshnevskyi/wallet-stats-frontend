import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getCategories } from "../../../store/categorySlice";
import { getUserDetails } from '../../../store/userSlice';

import { Box } from "../../atoms/box/Box.styled";
import { CategoriesPageWrapper } from "./CategoriesPage.styled";
import Header from '../../molecules/header/Header';

import Categories from './Caregories';
import EditCategory from './EditCategory';
import AddCategory from './AddCategory';

const CategoriesPage: React.FC = () => {
  const dispatch = useAppDispatch()

  const {
    isAddCategorySuccess,
    isEditCategorySuccess,
    isDeleteCategorySuccess,
    isEditCategoryOpen
  } = useAppSelector(state => state.category);

  useEffect(() => {
    dispatch(getUserDetails());
    dispatch(getCategories());
    // dispatch(setAddTransactionData({ owner: user?.id }))
  }, []);

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