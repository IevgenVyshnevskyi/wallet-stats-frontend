import { BASE_2, DARK_FOR_TEXT, MENU_BUTTON_HOVER } from "../../../shared/styles/variables";
import { Box } from "../../atoms/box/Box.styled";
import { List } from "../../atoms/list/List.styled";
import { ListItem } from "../../atoms/list/ListItem.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import Category from "../../molecules/category/Category";
import Header from '../../molecules/header/Header';
import TabFilter from "../../molecules/tabs/filter/TabFilter";
import { CategoriesPageWrapper } from "./CategoriesPage.styled";
import { mockCategories } from './../../../../mock-data/categories';
import { Button } from "../../atoms/button/Button.styled";
import TabSwitch from "../../molecules/tabs/switch/TabSwitch";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { mockOptions } from "../../../../mock-data/options";
import { Select } from "../../atoms/select/Select.styled";
import { Label } from "../../atoms/label/Label.styled";
import { Option } from "../../atoms/select/Option.styled";
import { ButtonLink } from "../../atoms/button/ButtonLink";
import { IFilterButton, ISwitchButton } from "../../../../types/molecules";

const CategoriesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  // create EditContext for transactions & categories

  const filterOption: string | null = searchParams.get('filter');
  console.log('filterOption in TransactionsPage', filterOption)

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

const Categories: React.FC = () => {
  const filterButtons: IFilterButton[] = [
    { buttonName: 'Всі категорії', filterBy: '?filter=all' },
    { buttonName: 'Витрати', filterBy: '?filter=expenses' },
    { buttonName: 'Надходження', filterBy: '?filter=incomes' },
  ];
  // create context for filters

  return (
    <Box grow="1" display="flex" direction="column">
      <Box display="flex" alignItems="center" mb="20px">
        <Typography as="h2" grow="1" fz="22px" fw="600">
          Категорії
        </Typography>
        <Typography
          as="span"
          mr="10px"
          fw="600"
          fz="12px"
          color={DARK_FOR_TEXT}
        >
          Відобразити
        </Typography>
        <TabFilter filterButtons={filterButtons} />
      </Box>

      <Box
        display="flex"
        direction="column"
        bgColor={BASE_2}
        p="15px"
        borderRadius="16px"
        grow="1"
      >
        <List gap="8px">
          {mockCategories.map((category, index) => (
            <ListItem key={index}>
              <Category category={category} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

const AddCategory: React.FC = () => {
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
      <Box bgColor={BASE_2} borderRadius="16px" p="15px">
        <CategorySettings />
        <Box>
          <Button primary width="100%">Зберегти</Button>
        </Box>
      </Box>
    </Box>
  );
}

const EditCategory: React.FC = () => {
  return (
    <Box display="flex" direction="column" width="540px">
      <Typography
        as="h2"
        fw="600"
        fz="22px"
        mt="5px"
        mb="30px"
      >
        Редагування категорії
      </Typography>
      <Box bgColor={MENU_BUTTON_HOVER} borderRadius="16px" p="15px">
        <CategorySettings />
        <Button primary width="100%" mb="28px">Зберегти</Button>
        <Box display="flex" justifyContent="flex-end">
          <ButtonLink>Видалити категорію</ButtonLink>
        </Box>
      </Box>
    </Box>
  );
}

const CategorySettings = () => {
  const switchButtons: ISwitchButton[] = [
    { buttonName: 'Витрата', onClick: () => { } },
    { buttonName: 'Надходження', onClick: () => { } },
  ];

  return (
    <Box display="flex" direction="column">
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
      <Box mb="25px">
        <Label fw="500" mb="12px">Назва категорії</Label>
        <Select width="100%">
          {mockOptions.map(({ value, label }, index) => (
            <Option key={index} value={value}>{label}</Option>
          ))}
        </Select>
      </Box>
    </Box>
  );
}



export default CategoriesPage;