import { BASE_2, WHITE } from "../../../shared/styles/variables";
import { categoryAction, setActiveCategory } from "../../../store/categorySlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setAddCategoryData } from "../../../store/categorySlice";
import { Box } from "../../atoms/box/Box.styled";
import { Button } from "../../atoms/button/Button.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import TabSwitch, { ISwitchButton } from "../../molecules/tabs/switch/TabSwitch";
import { Label } from "../../atoms/label/Label.styled";
import { Input } from "../../atoms/input/Input.styled";
import { userId } from "../../../api/api";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "../../atoms/form/Form.styled";

const AddCategory: React.FC = () => {
  const dispatch = useAppDispatch()

  const { addCategoryData, isLoading } = useAppSelector(state => state.category);
  const { user } = useAppSelector(state => state.user);

  const isValid = Object.keys(addCategoryData || {})?.length >= 1;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    mode: "all",
  });

  const switchButtons: ISwitchButton[] = [
    {
      buttonName: 'Витрата',
      onTabClick: () => {
        dispatch(setAddCategoryData({ type_of_outlay: "expense" }));
      },
      isActive: addCategoryData?.type_of_outlay === "expense"
    },
    {
      buttonName: 'Надходження',
      onTabClick: () => {
        dispatch(setAddCategoryData({ type_of_outlay: "income" }));
      },
      isActive: addCategoryData?.type_of_outlay === "income"
    },
  ];

  useEffect(() => {
    dispatch(setAddCategoryData({ type_of_outlay: "expense" }))
  }, []);

  function handleSub(data: { title: string }) {
    dispatch(setActiveCategory({}));
    dispatch(categoryAction({
      data: {
        ...addCategoryData,
        title: data?.title,
        owner: user?.id || userId,
      },
      method: "POST"
    }))
  }

  return (
    <Box display="flex" direction="column" width="540px">
      <Typography
        as="h2"
        fw="600"
        fz="22px"
        mt="5px"
        mb="30px"
      >
        Додати категорію
      </Typography>
      <Box
        display="flex"
        direction="column"
        bgColor={BASE_2}
        borderRadius="16px"
        p="15px"
      >
        <Box mb="25px">
          <Typography
            as="h3"
            fz="16px"
            fw="500"
            mb="12px"
          >
            Тип категорії
          </Typography>
          <TabSwitch switchButtons={switchButtons} />
        </Box>
        <Form onSubmit={handleSubmit(handleSub)}>
          <Box mb="25px">
            <Label fw="500" htmlFor="title" mb="12px">
              Назва категорії
            </Label>
            <Input
              type="text"
              id="title"
              width="93%"
              bgColor={WHITE}
              className={errors?.title && 'error'}
              {...register('title', {
                required: 'Обов\'язкове поле для заповнення',
                validate: {
                  hasTwoSymbols: (value) => /^.{2,}$/.test(value) || 'Повинно бути не менше 2 символів',
                  hasTwoLetters: (value) => /^[A-Za-zА-Яа-яІіЇїЄєҐґ]+$/.test(value) || 'Повинно бути не менше 2 літер',
                }
              })}
            />
            <Box
              color="red"
              textAlight="left"
              border="red"
              fz="13px"
              height="14px"
              m="0 0 20px 0"
            >
              {errors?.title && <>{errors?.title?.message || 'Error!'}</>}
            </Box>
          </Box>
          <Box>
            <Button
              primary
              width="100%"
              type="submit"
              disabled={!isValid || !!errors?.title || isLoading}
            >
              Зберегти
            </Button>
          </Box>
        </Form>
      </Box>
    </Box>
  );
}

export default AddCategory;