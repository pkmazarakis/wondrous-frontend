import { ClickAwayListener } from '@mui/material';
import { CompletedIcon, InReviewIcon } from 'components/Icons/statusIcons';
import { isEmpty, values } from 'lodash';
import { useState } from 'react';
import { PAYMENT_STATUS } from 'utils/constants';

import {
  SubmissionFilterButtonIcon,
  SubmissionFilterSelectButton,
  SubmissionFilterSelectItem,
  SubmissionFilterSelectMenu,
  SubmissionFilterSelectPopper,
  SubmissionFilterSelectRender,
  SubmissionFilterStatusIcon,
  SubmissionItemStatusChangesRequestedIcon,
} from './styles';

const filterOptions = {
  awaitingReview: { label: 'Awaiting Review', Icon: InReviewIcon },
  changesRequested: { label: 'Changes Requested', Icon: SubmissionItemStatusChangesRequestedIcon },
  approved: { label: 'Approved', Icon: CompletedIcon },
  approvedAndProcessingPayment: { label: 'Approved And Processing Payment', Icon: CompletedIcon },
  approvedAndPaid: { label: 'Approved and Paid', Icon: CompletedIcon },
};

const isSubmissionStatus = ({ submission, label }) => {
  const { awaitingReview, changesRequested, approved, approvedAndProcessingPayment, approvedAndPaid } = filterOptions;
  const conditions = {
    [awaitingReview.label]: !submission?.approvedAt && !submission?.changeRequestedAt && !submission.rejectedAt,
    [changesRequested.label]: submission?.changeRequestedAt || submission?.rejectedAt,
    [approved.label]: submission?.approvedAt,
    [approvedAndProcessingPayment.label]:
      submission?.approvedAt && submission?.paymentStatus === PAYMENT_STATUS.PROCESSING,
    [approvedAndPaid.label]: submission?.approvedAt && submission?.paymentStatus === PAYMENT_STATUS.PAID,
  };
  return conditions[label];
};

const TaskSubmissionsFilterSelected = ({ value }) => {
  return isEmpty(value) ? (
    <SubmissionFilterSelectRender>
      <SubmissionFilterStatusIcon /> Status
    </SubmissionFilterSelectRender>
  ) : (
    <SubmissionFilterSelectRender>
      <value.Icon /> {value.label}
    </SubmissionFilterSelectRender>
  );
};

export const TaskSubmissionsFilter = ({ fetchedTaskSubmissions, setFilteredSubmissions }) => {
  const [selected, setSelected] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(anchorEl ? null : event.currentTarget);
  const handleClosePopper = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const handleOnClick = ({ Icon, label }) => {
    setSelected({ Icon, label });
    const handleFilterStatus = (submission) => isSubmissionStatus({ submission, label });
    setFilteredSubmissions(fetchedTaskSubmissions.filter(handleFilterStatus));
    handleClosePopper();
  };
  if (isEmpty(fetchedTaskSubmissions)) return null;
  return (
    <ClickAwayListener onClickAway={handleClosePopper}>
      <div>
        <SubmissionFilterSelectButton onClick={handleClick} open={open}>
          <TaskSubmissionsFilterSelected value={selected} />
          <SubmissionFilterButtonIcon open={open} />
        </SubmissionFilterSelectButton>
        <SubmissionFilterSelectPopper open={open} anchorEl={anchorEl} placement="bottom-start" disablePortal={true}>
          <SubmissionFilterSelectMenu>
            {values(filterOptions).map(({ Icon, label }) => (
              <SubmissionFilterSelectItem key={label} value={label} onClick={() => handleOnClick({ Icon, label })}>
                <Icon /> {label}
              </SubmissionFilterSelectItem>
            ))}
          </SubmissionFilterSelectMenu>
        </SubmissionFilterSelectPopper>
      </div>
    </ClickAwayListener>
  );
};