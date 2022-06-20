import { useMutation } from '@apollo/client';
import {
  StyledBody,
  StyledBox,
  StyledButtonsContainer,
  StyledCancelButton,
  StyledCloseButton,
  StyledDeleteLabel,
  StyledDeleteTaskButton,
  StyledDialog,
  StyledDivider,
  StyledHeader,
} from 'components/Common/DeleteTaskModal/styles';
import { DELETE_MILESTONE, DELETE_TASK } from 'graphql/mutations';
import CloseModalIcon from '../../Icons/closeModal';
import { ArchivedIcon } from '../../Icons/statusIcons';

interface IImportTaskModalProps {
  open: boolean;
  onClose: () => void;
  onConvert: () => void;
}

export const ConvertTaskToBountyModal = (props: IImportTaskModalProps) => {
  const { open, onClose, onConvert } = props;

  return (
    <>
      <StyledDialog
        open={open}
        onClose={onClose}
        aria-labelledby="delete-task-modal"
        aria-describedby="modal-modal-description"
      >
        <StyledBox
          style={{
            width: 'fit-content',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          <StyledCloseButton
            style={{
              marginLeft: '450px',
            }}
            onClick={onClose}
          >
            <CloseModalIcon />
          </StyledCloseButton>
          <StyledHeader>Do you want to turn this task into a bounty?</StyledHeader>
          <StyledBody>You cannot undo this action.</StyledBody>
          <StyledDivider />
          <StyledButtonsContainer>
            <StyledCancelButton
              style={{
                width: 'fit-content',
              }}
              onClick={onClose}
            >
              Cancel
            </StyledCancelButton>
            <StyledDeleteTaskButton
              style={{
                textAlign: 'center',
              }}
              buttonInnerStyle={{
                justifyContent: 'center',
              }}
            >
              <StyledDeleteLabel
                style={{
                  marginLeft: '0',
                }}
                onClick={onConvert}
              >
                Convert
              </StyledDeleteLabel>
            </StyledDeleteTaskButton>
          </StyledButtonsContainer>
        </StyledBox>
      </StyledDialog>
    </>
  );
};