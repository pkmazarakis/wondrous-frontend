import React, { useMemo, useState } from 'react'
import { styled, Switch } from '@material-ui/core'

import { ENTITIES_TYPES, MEDIA_TYPES } from '../../utils/constants'
import CircleIcon from '../Icons/circleIcon'
import CodeIcon from '../Icons/MediaTypesIcons/code'
import AudioIcon from '../Icons/MediaTypesIcons/audio'
import WonderTokenIcon from '../Icons/wonderToken'
import PriorityIcon from '../Icons/priority'
import CloseModalIcon from '../Icons/closeModal'
import CreateDaoIcon from '../Icons/createDao'
import CreatePodIcon from '../Icons/createPod'
import ImageIcon from '../Icons/MediaTypesIcons/image'
import VideoIcon from '../Icons/MediaTypesIcons/video'
import InputForm from '../Common/InputForm/inputForm'
import DropdownSelect from '../Common/DropdownSelect/dropdownSelect'

import { ENTITIES_UI_ELEMENTS } from './chooseEntityToCreateModal'
import MembersRow from './MembersRow/membersRow'
import { CreateFormMembersList } from './MembersRow/styles'
import HeaderImage from './HeaderImage/headerImage'
import {
	CreateFormAddDetailsAppearBlock,
	CreateFormAddDetailsAppearBlockContainer,
	CreateFormAddDetailsButton,
	CreateFormAddDetailsInputBlock,
	CreateFormAddDetailsInputLabel,
	CreateFormAddDetailsInputs,
	CreateFormAddDetailsSection,
	CreateFormAddDetailsSelects,
	CreateFormAddDetailsSwitch,
	CreateFormBaseModal,
	CreateFormBaseModalCloseBtn,
	CreateFormBaseModalHeader,
	CreateFormBaseModalTitle,
	CreateFormButtonsBlock,
	CreateFormCancelButton,
	CreateFormFooterButtons,
	CreateFormLinkAttachmentBlock,
	CreateFormLinkAttachmentLabel,
	CreateFormMainDescriptionInput,
	CreateFormMainDescriptionInputSymbolCounter,
	CreateFormMainInputBlock,
	CreateFormMainSection,
	CreateFormMainSelects,
	CreateFormMembersBlock,
	CreateFormMembersBlockTitle,
	CreateFormMembersSection,
	CreateFormPreviewButton,
	CreateFormTaskRequirements,
	CreateFormTaskRequirementsContainer,
	CreateFormTaskRequirementsItem,
	CreateFormTaskRequirementsItemText,
	CreateFormTaskRequirementsTitle,
	CreateLayoutDaoMenuItemIcon,
	CreateFormMainBlockTitle,
} from './styles'

export const MEDIA_UI_ELEMENTS = {
	[MEDIA_TYPES.IMAGE]: {
		icon: ImageIcon,
		label: 'Image',
	},
	[MEDIA_TYPES.AUDIO]: {
		icon: AudioIcon,
		label: 'Audio',
	},
	[MEDIA_TYPES.LINK]: {
		icon: ImageIcon,
		label: 'Link',
	},
	[MEDIA_TYPES.TEXT]: {
		icon: ImageIcon,
		label: 'Text',
	},

	[MEDIA_TYPES.CODE]: {
		icon: CodeIcon,
		label: 'Code',
	},

	[MEDIA_TYPES.VIDEO]: {
		icon: VideoIcon,
		label: 'Video',
	},
}

const AndroidSwitch = styled(Switch)(({ theme }) => ({
	padding: 8,
	'& .MuiSwitch-track': {
		borderRadius: 22 / 2,
		background: '#3E3E3E',

		'&:before': {
			content: '""',
			position: 'absolute',
			top: '50%',
			transform: 'translateY(-50%)',
			width: 16,
			height: 16,
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="white" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
			left: 12,
			zIndex: 1000,
			opacity: 1,
		},
	},
	'& .MuiSwitch-thumb': {
		boxShadow: 'none',
		width: 16,
		height: 16,
		margin: 2,
		background: 'white',
	},

	'& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track': {
		background:
			'linear-gradient(270deg, #CCBBFF -5.62%, #7427FF 45.92%, #00BAFF 103.12%)',
	},
}))

const createPodMembersList = [
	{
		avatar: '',
		name: '0xAndros',
		admin: 'true',
	},
	{
		avatar: '',
		name: '0xAndraos',
		admin: 'false',
	},
	{
		avatar: '',
		name: '0xAndos',
		admin: 'false',
	},
	{
		avatar: '',
		name: '0xAsndros',
		admin: 'false',
	},
]

const SELECT_OPTIONS = [
	{
		label: 'Today',
		value: 'today',
	},
	{
		label: 'Tomorrow',
		value: 'tomorrow',
	},
	{
		label: 'Never',
		value: 'never',
	},
]

const DAO_SELECT_OPTIONS = [
	{
		icon: <CreateLayoutDaoMenuItemIcon />,
		label: 'Wonder',
		value: 'wonder',
	},
	{
		icon: <CreateLayoutDaoMenuItemIcon />,
		label: 'Winder',
		value: 'winder',
	},
	{
		icon: <CreateLayoutDaoMenuItemIcon />,
		label: 'Wander',
		value: 'wander',
	},
]

const POD_SELECT_OPTIONS = [
	{
		icon: <CreatePodIcon ellipseColor="#00BAFF" />,
		label: 'Beta Launch',
		amount: 4,
		value: 'beta-launch',
	},
	{
		icon: <CreatePodIcon ellipseColor="#00BAFF" />,
		label: 'Alfa Launch',
		amount: 8,
		value: 'alfa-launch',
	},
]

const REWARD_SELECT_OPTIONS = [
	{
		icon: <WonderTokenIcon />,
		label: 'Wonder Tokens',
		value: 'wonder',
	},
	{
		icon: <WonderTokenIcon />,
		label: 'Bitcoin',
		value: 'bitcoin',
	},
	{
		icon: <WonderTokenIcon />,
		label: 'Ethereum',
		value: 'ethereum',
	},
]

const AMOUNT_SELECT_OPTIONS = [
	{
		label: '100 tokens',
		value: '100',
	},
	{
		label: '200 tokens',
		value: '200',
	},
	{
		label: '300 tokens',
		value: '300',
	},
]

const PRIORITY_SELECT_OPTIONS = [
	{
		icon: <PriorityIcon />,
		label: 'Priority 1',
		value: 'priority-1',
	},
	{
		icon: <PriorityIcon />,
		label: 'Priority 2',
		value: 'priority-2',
	},
	{
		icon: <PriorityIcon />,
		label: 'Priority 3',
		value: 'priority-3',
	},
]

const MILESTONE_SELECT_OPTION = [
	{
		label: 'Milestone 1',
		value: 'milestone-1',
	},
	{
		label: 'Milestone 2',
		value: 'milestone-2',
	},
	{
		label: 'Milestone 3',
		value: 'milestone-3',
	},
]

const CreateLayoutBaseModal = (props) => {
	const { entityType, handleClose, resetEntityType } = props

	const [addDetails, setAddDetails] = useState(false)
	const [descriptionText, setDescriptionText] = useState([])

	const addDetailsHandleClick = () => {
		setAddDetails(!addDetails)
	}

	const descriptionTextCounter = (e) => {
		setDescriptionText(e.target.value)
	}

	const {
		showDeliverableRequirementsSection,
		showBountySwitchSection,
		showAppearSection,
		showLinkAttachmentSection,
		showHeaderImagePickerSection,
		showMembersSection,
		showPrioritySelectSection,
	} = useMemo(() => {
		return {
			showDeliverableRequirementsSection: entityType === ENTITIES_TYPES.TASK,
			showBountySwitchSection: entityType === ENTITIES_TYPES.TASK,
			showAppearSection:
				entityType === ENTITIES_TYPES.TASK ||
				entityType === ENTITIES_TYPES.MILESTONE,
			showLinkAttachmentSection: entityType === ENTITIES_TYPES.POD,
			showHeaderImagePickerSection: entityType === ENTITIES_TYPES.POD,
			showMembersSection: entityType === ENTITIES_TYPES.POD,
			showPrioritySelectSection: entityType === ENTITIES_TYPES.MILESTONE,
		}
	}, [entityType])

	const { icon: TitleIcon, label: titleText } = ENTITIES_UI_ELEMENTS[entityType]

	return (
		<CreateFormBaseModal>
			<CreateFormBaseModalCloseBtn onClick={handleClose}>
				<CloseModalIcon />
			</CreateFormBaseModalCloseBtn>
			<CreateFormBaseModalHeader>
				<TitleIcon circle />
				<CreateFormBaseModalTitle>
					Create a {titleText.toLowerCase()}
				</CreateFormBaseModalTitle>
			</CreateFormBaseModalHeader>

			<CreateFormMainSection>
				<CreateFormMainSelects>
					<DropdownSelect
						title="DAO"
						labelText="Choose DAO"
						labelIcon={<CreateDaoIcon />}
						options={DAO_SELECT_OPTIONS}
						name="dao"
					/>
					<DropdownSelect
						title="Pod"
						labelText="Choose Pod"
						labelIcon={<CreatePodIcon />}
						options={POD_SELECT_OPTIONS}
						name="pod"
					/>
				</CreateFormMainSelects>

				<CreateFormMainInputBlock>
					<CreateFormMainBlockTitle>Task title</CreateFormMainBlockTitle>

					<InputForm placeholder="Enter task title" search={false} />
				</CreateFormMainInputBlock>

				<CreateFormMainInputBlock>
					<CreateFormMainBlockTitle>Task description</CreateFormMainBlockTitle>
					<CreateFormMainDescriptionInput
						placeholder="Enter task description"
						onChange={(e) => descriptionTextCounter(e)}
						multiline
						rows={5}
						maxRows={5}
					/>
					<CreateFormMainDescriptionInputSymbolCounter>
						{descriptionText.length}/900 characters
					</CreateFormMainDescriptionInputSymbolCounter>
				</CreateFormMainInputBlock>

				{/*Upload header image block*/}
				{showHeaderImagePickerSection && <HeaderImage />}

				<CreateFormMainSelects>
					<DropdownSelect
						title="Reward currency"
						labelText="Choose tokens"
						options={REWARD_SELECT_OPTIONS}
						name="reward-currency"
					/>
					<DropdownSelect
						title="Amount of reward"
						labelText="Enter reward amount"
						options={AMOUNT_SELECT_OPTIONS}
						name="reward-amount"
					/>
				</CreateFormMainSelects>

				{showMembersSection && (
					<CreateFormMembersSection>
						<CreateFormMainBlockTitle>Members</CreateFormMainBlockTitle>

						<InputForm
							search
							margin
							icon={<CircleIcon />}
							placeholder="Search users and pods"
						/>

						<CreateFormMembersBlock>
							<CreateFormMembersBlockTitle>
								{createPodMembersList.length}
								{createPodMembersList.length > 1 ? ' members' : ' member'}
							</CreateFormMembersBlockTitle>
							<CreateFormMembersList>
								{createPodMembersList.map((item) => (
									<MembersRow
										key={item.name}
										name={item.name}
										styledSwitch={<AndroidSwitch />}
									/>
								))}
							</CreateFormMembersList>
						</CreateFormMembersBlock>
					</CreateFormMembersSection>
				)}
			</CreateFormMainSection>

			{showDeliverableRequirementsSection && (
				<CreateFormTaskRequirements>
					<CreateFormTaskRequirementsTitle>
						Deliverables requirements
					</CreateFormTaskRequirementsTitle>
					<CreateFormTaskRequirementsContainer>
						{Object.entries(MEDIA_UI_ELEMENTS).map(
							([key, { icon: MediaIcon, label }]) => (
								<CreateFormTaskRequirementsItem key={key}>
									<MediaIcon />
									<CreateFormTaskRequirementsItemText>
										{label}
									</CreateFormTaskRequirementsItemText>
								</CreateFormTaskRequirementsItem>
							)
						)}
					</CreateFormTaskRequirementsContainer>
				</CreateFormTaskRequirements>
			)}

			<CreateFormAddDetailsSection>
				<CreateFormAddDetailsButton onClick={() => addDetailsHandleClick()}>
					{!addDetails ? 'Add more details (optional)' : '^'}
				</CreateFormAddDetailsButton>
				{addDetails && (
					<CreateFormAddDetailsAppearBlock>
						{showAppearSection && (
							<CreateFormAddDetailsAppearBlockContainer>
								<CreateFormAddDetailsInputs>
									<CreateFormAddDetailsInputBlock>
										<CreateFormAddDetailsInputLabel>
											Asigned to
										</CreateFormAddDetailsInputLabel>

										<InputForm
											icon={<CircleIcon />}
											placeholder="0xAndros"
											search={false}
										/>
									</CreateFormAddDetailsInputBlock>

									<CreateFormAddDetailsInputBlock>
										<CreateFormAddDetailsInputLabel>
											Reviewer
										</CreateFormAddDetailsInputLabel>
										<InputForm
											search
											icon={<CircleIcon />}
											placeholder="Search users and pods"
										/>
									</CreateFormAddDetailsInputBlock>
								</CreateFormAddDetailsInputs>

								<CreateFormAddDetailsSelects>
									<DropdownSelect
										title="Due date"
										labelText="Select date"
										options={SELECT_OPTIONS}
										name="date"
									/>
									<DropdownSelect
										title="Connect to Milestone"
										labelText="Choose Milestone"
										options={MILESTONE_SELECT_OPTION}
										name="connect-to-milestone"
									/>
								</CreateFormAddDetailsSelects>

								<CreateFormAddDetailsSelects>
									<CreateFormAddDetailsSwitch>
										<CreateFormAddDetailsInputLabel>
											Private task
										</CreateFormAddDetailsInputLabel>
										<AndroidSwitch />
									</CreateFormAddDetailsSwitch>

									{/*if Suggest a task opened */}
									{showBountySwitchSection && (
										<CreateFormAddDetailsSwitch>
											<CreateFormAddDetailsInputLabel>
												This is a bounty
											</CreateFormAddDetailsInputLabel>
											<AndroidSwitch />
										</CreateFormAddDetailsSwitch>
									)}

									{/*if Create a milestone opened*/}
									{showPrioritySelectSection && (
										<DropdownSelect
											title="Priority"
											labelText="Choose Milestone"
											options={PRIORITY_SELECT_OPTIONS}
											name="priority"
										/>
									)}
								</CreateFormAddDetailsSelects>
							</CreateFormAddDetailsAppearBlockContainer>
						)}

						{showLinkAttachmentSection && (
							<CreateFormLinkAttachmentBlock>
								<CreateFormLinkAttachmentLabel>
									Links
								</CreateFormLinkAttachmentLabel>
								<InputForm
									margin
									placeholder="Enter link attachment"
									search={false}
								/>
							</CreateFormLinkAttachmentBlock>
						)}
					</CreateFormAddDetailsAppearBlock>
				)}
			</CreateFormAddDetailsSection>

			<CreateFormFooterButtons>
				<CreateFormButtonsBlock>
					<CreateFormCancelButton onClick={resetEntityType}>
						Cancel
					</CreateFormCancelButton>
					<CreateFormPreviewButton>Preview {titleText}</CreateFormPreviewButton>
				</CreateFormButtonsBlock>
			</CreateFormFooterButtons>
		</CreateFormBaseModal>
	)
}

export default CreateLayoutBaseModal