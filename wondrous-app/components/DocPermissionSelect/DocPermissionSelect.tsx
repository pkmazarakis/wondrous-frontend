import { styled } from '@mui/material/styles';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import styles, { inputStyles, menuItemStyles } from './DocPermissionSelectStyles';

const SAMPLE_PERMISSIONS = [
  {
    label: 'Public',
    value: 'public',
  },
  {
    label: 'Members',
    value: 'members',
  },
];

const StyledTextField = styled(TextField)(inputStyles);
const StyledMenuItem = styled(MenuItem)(menuItemStyles);

const DocPermissionSelect = ({ register, errors }) => (
  <StyledTextField
    select
    {...register}
    fullWidth
    helperText={errors.visibility?.message}
    error={errors.visibility}
    SelectProps={{ MenuProps: { MenuListProps: { sx: { ...styles.menuList } } } }}
  >
    {SAMPLE_PERMISSIONS.map((option) => (
      <StyledMenuItem key={option.value} value={option.value}>
        {option.label}
      </StyledMenuItem>
    ))}
  </StyledTextField>
);

export default DocPermissionSelect;