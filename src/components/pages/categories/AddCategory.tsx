import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setAddCategoryData,
  categoryAction,
  setActiveCategory,
} from "../../../store/categorySlice";

import useSwitchButtonOptions from "../../../shared/hooks/useSwitchButtonOptions";

import { titleFieldRules } from "../../../shared/utils/field-rules/title";

import { userId } from "../../../api/api";

import { Form } from "../../atoms/form/Form.styled";
import { Box } from "../../atoms/box/Box.styled";
import { Button } from "../../atoms/button/Button.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import TabSwitch from "../../molecules/tabs/switch/TabSwitch";
import BaseField from "../../molecules/base-field/BaseField";

import COLORS from "../../../shared/styles/variables";

const AddCategory: React.FC = () => {
  const dispatch = useAppDispatch();

  const { addCategoryData, isLoading } = useAppSelector(
    (state) => state.category
  );
  const { user } = useAppSelector((state) => state.user);

  const isValid = Object.keys(addCategoryData || {})?.length >= 1;

  const switchButtons = useSwitchButtonOptions(
    addCategoryData,
    setAddCategoryData
  );

  const handleSub = (data: { title: string }) => {
    dispatch(setActiveCategory({}));
    dispatch(
      categoryAction({
        data: {
          ...addCategoryData,
          title: data?.title,
          owner: user?.id || userId,
        },
        method: "POST",
      })
    );
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "all" });

  useEffect(() => {
    dispatch(setAddCategoryData({ type_of_outlay: "expense" }));
  }, []);

  return (
    <Box display="flex" direction="column" width="540px">
      <Typography as="h2" fw="600" fz="22px" mt="5px" mb="30px">
        Додати категорію
      </Typography>
      <Box
        display="flex"
        direction="column"
        bgColor={COLORS.BASE_2}
        borderRadius="16px"
        p="15px">
        <Box mb="25px">
          <Typography as="h3" fz="16px" fw="500" mb="12px">
            Тип категорії
          </Typography>
          <TabSwitch switchButtons={switchButtons} />
        </Box>
        <Form onSubmit={handleSubmit(handleSub)}>
          <Box mb="25px">
            <BaseField
              label="Назва категорії"
              errors={errors}
              fieldType="text"
              name="title"
              registerOptions={register("title", titleFieldRules)}
            />
          </Box>
          <Box>
            <Button
              primary
              width="100%"
              type="submit"
              disabled={!isValid || !!errors?.title || isLoading}>
              Зберегти
            </Button>
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

export default AddCategory;
