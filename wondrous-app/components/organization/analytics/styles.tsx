import styled from 'styled-components';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import { GradientMidnightDiagonal, GradientMidnightVertical } from 'components/Common/gradients';
import { TextField, Typography } from '@material-ui/core';
import { White } from 'theme/colors';
import { StyledDatePicker } from 'components/Common/DatePicker/styles';
import { Button } from 'components/Common/button';
import { PaymentModal } from 'components/Common/Payment/styles';
import { CreateFormRewardCurrency } from 'components/CreateEntity/styles';

export const CardWrapper = styled.div`
  display: flex;
  margin: ${(props) => (props.wrapped ? '0' : '1em 0 0 0')};

  padding: 1px;
  background: #515151;

  cursor: grab;

  ${GradientMidnightDiagonal}

  border-radius: ${(props) => (props.wrapped ? '0px' : '6px')};
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const HeaderText = styled(Typography)`
  && {
    font-size: 16px;
    color: ${White};
    font-weight: bolder;
  }
`;

export const SelectDatePicker = styled(DesktopDatePicker)`
  && {
    .MuiFormControl-root {
      background: #3d3d3d;
      border-radius: 6px;
      height: 40px;
      padding: 0 8px;
      position: relative;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 0.01em;
      color: #c4c4c4;
      margin-left: 16px;
    }
  }
`;

export const StyledTextField = styled(TextField)`
  && {
    background: #191919;
    border-radius: 6px;
    height: 40px;
    width: 170px;
    padding: 0 8px;
    position: relative;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.01em;
    color: #c4c4c4 !important;
    margin-left: 8px;
    margin-right: 8px;
    border-bottom: none !important;
    .MuiInput-underline:before {
      border-bottom: none !important;
    }
    input {
      color: #c4c4c4 !important;
      border-bottom: none !important;
      padding-top: 10px;
    }

    svg {
      color: #c4c4c4 !important;
    }
  }
`;

export const ContributorDiv = styled.div`
  border: 1px solid rgb(54, 54, 54);
  background: #1d1d1d;
  padding: 8px 16px;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 16px;
  min-height: 48px;
  cursor: pointer;
`;
export const ContributorRow = styled.div`
  display: flex;
  align-items: center;
`;

export const ContributorRowText = styled(Typography)`
  && {
    color: ${White};
  }
`;

export const TaskCountWrapper = styled.div`
  background: linear-gradient(0deg, rgba(196, 196, 196, 0.07), rgba(196, 196, 196, 0.07)), #090808;
  margin-left: 24px;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 4px;
`;

export const TaskCountText = styled(Typography)`
  && {
    color: ${White};
    font-size: 13px;
  }
`;

export const TasksWrapper = styled.div``;

export const TaskRow = styled.div`
  display: flex;
  align-items: center;
  padding-top: 8px;
  :not(:last-child) {
    border-bottom: 0.5px dashed #4b4b4b;
    padding-bottom: 8px;
  }
`;

export const ExportCSVButton = styled(Button)``;

export const ExportCSVButtonText = styled(Typography)`
  && {
    color: ${White};
  }
`;

export const PayoutPaymentModal = styled(PaymentModal)`
  && {
    width: 70%;
    min-width: 680px;
    height: 90%;
  }
`;

export const ContributorTaskModalRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0px !important;
`;

export const FormRewardCurrency = styled(CreateFormRewardCurrency)`
  && {
    margin-top: 0;
  }
`;