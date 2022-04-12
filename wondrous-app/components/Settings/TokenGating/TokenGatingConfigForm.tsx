import { useMutation } from '@apollo/client';
import ErrorFieldIcon from 'components/Icons/errorField.svg';
import Ethereum from 'components/Icons/ethereum';
import PolygonIcon from 'components/Icons/polygonMaticLogo.svg';
import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { SettingsWrapper } from '../settingsWrapper';
import DropdownSelect from '../../Common/DropdownSelect/dropdownSelect';
import {
  TokenGatingConfigModal,
  TokenGatingAutocomplete,
  TokenGatingAutocompleteLabel,
  TokenGatingAutocompleteList,
  TokenGatingAutocompleteListItem,
  TokenGatingAutocompletePopper,
  TokenGatingAutocompleteTextfieldButton,
  TokenGatingAutocompleteTextfieldDownIcon,
  TokenGatingAutocompleteTextfieldWrapper,
  TokenGatingButton,
  TokenGatingFormHeader,
  TokenGatingDisabledButton,
  TokenGatingFormHeaderSecondary,
  TokenGatingFormWrapper,
  TokenGatingInputImage,
  TokenGatingInputWrapper,
  TokenGatingTextfieldButtonDown,
  TokenGatingTextfieldButtonUp,
  TokenGatingTextfieldButtonWrapper,
  TokenGatingTextfieldInput,
  TokenGatingTextfieldInputWrapper,
  TokenGatingTextfieldTextHelper,
  TokenGatingTextfieldTextHelperWrapper,
  TokenGatingTokenAmountWrapper,
} from './styles';
import { CREATE_TOKEN_GATING_CONDITION_FOR_ORG } from '../../../graphql/mutations/tokenGating';
import { GET_TOKEN_GATING_CONDITIONS_FOR_ORG } from 'graphql/queries/tokenGating';

const chainOptions = [
  {
    label: 'Ethereum',
    icon: <Ethereum />,
    value: 'ethereum',
  },
  {
    label: 'Polygon',
    icon: <PolygonIcon />,
    value: 'polygon',
  },
];

const SUPPORTED_ACCESS_CONDITION_TYPES = [
  {
    label: 'ERC20',
    value: 'ERC20',
  },
  {
    label: 'NFT',
    value: 'ERC721',
  },
];

const tokenListItemVirtualized = (props: ListChildComponentProps) => {
  const { data, index, style } = props;
  const dataSet = data[index];
  return (
    <TokenGatingAutocompleteListItem {...props} {...dataSet[0]} value={dataSet[1].value} style={style}>
      <TokenGatingInputImage src={dataSet[1]?.icon} />
      {dataSet[1].label}
    </TokenGatingAutocompleteListItem>
  );
};

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>(function OuterElementType(props, ref) {
  const outerProps = React.useContext(OuterElementContext);
  return <TokenGatingAutocompleteList ref={ref} {...props} {...outerProps} />;
});

const TokenListboxVirtualized = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(
  function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData: React.ReactChild[] = (children as React.ReactChild[]).flatMap(
      (item: React.ReactChild & { children?: React.ReactChild[] }) => [item, ...(item.children || [])]
    );
    const itemCount = itemData?.length;
    const itemSize = 50;
    const maxNoOfItemsToDisplay = 5;
    const height = itemCount > maxNoOfItemsToDisplay ? itemSize * maxNoOfItemsToDisplay : itemCount * itemSize;
    return (
      <div ref={ref}>
        <OuterElementContext.Provider value={other}>
          <FixedSizeList
            itemData={itemData}
            height={height}
            width="100%"
            outerElementType={OuterElementType}
            innerElementType="ul"
            itemSize={itemSize}
            overscanCount={20}
            itemCount={itemCount}
          >
            {tokenListItemVirtualized}
          </FixedSizeList>
        </OuterElementContext.Provider>
      </div>
    );
  }
);

const TokenGatingConfigForm = (props) => {
  const { orgId, org, open, setShowConfigModal, tokenGatingCondition } = props;
  const [chain, setChain] = useState(chainOptions[0].value);
  const [name, setName] = useState('');
  const [accessConditionType, setAccessConditionType] = useState('ERC20');
  const [tokenList, setTokenList] = useState([]);
  const [nftList, setNftList] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [minAmount, setMinAmount] = useState(0);
  const [minAmountError, setMinAmountError] = useState(false);
  const [nameError, setNameError] = useState(null);
  const [ceationError, setCreationError] = useState(null);
  const [openChainSelection, setOpenChainSelection] = useState(false);
  useEffect(() => {
    if (tokenGatingCondition) {
      setName(tokenGatingCondition.name);
    }
  }, [tokenGatingCondition]);
  const clearErrors = () => {
    setNameError(null);
    setCreationError(null);
    setMinAmountError(null);
  };
  const clearSelection = () => {
    setName('');
    setAccessConditionType('ERC20');
    setSelectedToken(null);
    setMinAmount(0);
  };
  const handleMinAmountOnChange = (event) => {
    const { value } = event.target;
    setMinAmount(Number(value));
  };
  const [createTokenGatingConditionForOrg] = useMutation(CREATE_TOKEN_GATING_CONDITION_FOR_ORG, {
    onCompleted: (data) => {
      clearErrors();
      clearSelection();
      setShowConfigModal(false);
    },
    refetchQueries: [GET_TOKEN_GATING_CONDITIONS_FOR_ORG],
    onError: (e) => {
      console.error(e);
      setCreationError('Error creating token gating condition');
    },
  });

  const handleMinAmountOnClick = (change) => {
    const newMinAmount = minAmount + change;
    if (newMinAmount < 0) return;
    setMinAmount(newMinAmount);
  };
  const handleOnSubmit = () => {
    setMinAmountError(false);
    setNameError(false);
    if (minAmount <= 0) {
      setMinAmountError(true);
      return;
    }
    if (name === '') {
      setNameError(true);
      return;
    }
    clearErrors();
    const contractAddress = selectedToken?.value;
    createTokenGatingConditionForOrg({
      variables: {
        input: {
          orgId,
          name,
          accessCondition: {
            contractAddress,
            type: accessConditionType,
            chain,
            method: 'balanceOf', // fixme this is wrong, should figure out what the method is
            minValue: minAmount.toString(),
          },
        },
      },
    });
  };
  const getTokenList = async () => {
    const erc20Url = 'https://tokens.1inch.eth.link/';
    const erc20Promise = fetch(erc20Url).then((r2) => r2.json());
    const [erc20s] = await Promise.all([erc20Promise]);
    const sorted = [...erc20s.tokens].sort((a, b) => (a.name > b.name ? 1 : -1));
    const formatted = sorted.map((token) => {
      return {
        label: token.name,
        value: token.address,
        icon: token.logoURI,
      };
    });
    setTokenList(formatted);
    return formatted;
  };

  async function getNFTList() {
    const erc721Url = 'https://raw.githubusercontent.com/0xsequence/token-directory/main/index/mainnet/erc721.json';
    const erc721Promise = fetch(erc721Url).then((r2) => r2.json());
    const [erc721s] = await Promise.all([erc721Promise]);
    const sorted = [...erc721s.tokens].sort((a, b) => (a.name > b.name ? 1 : -1));
    const formatted = sorted.map((token) => {
      return {
        label: token.name,
        value: token.address,
        icon: token.logoURI,
      };
    });
    formatted.push({
      label: 'crypto coven',
      value: '0x5180db8f5c931aae63c74266b211f580155ecac8',
      icon: 'https://assets.coingecko.com/nft_contracts/images/256/small/cryptocoven.png?1643339060',
    })
    setNftList(formatted);
    return formatted;
  }

  useEffect(() => {
    if (accessConditionType === 'ERC20') {
      if (tokenList && tokenList.length === 0) {
        const formatted = getTokenList();
      }
    }
    if (accessConditionType === 'ERC721') {
      if (nftList && nftList.length === 0) {
        const formatted = getNFTList();
      }
    }
  }, [accessConditionType]);

  return (
    <Modal
      open={open}
      onClose={() => {
        setShowConfigModal(false);
      }}
    >
      <TokenGatingConfigModal>
        <TokenGatingFormWrapper>
          <TokenGatingFormHeader>
            Token gating for{' '}
            <TokenGatingFormHeaderSecondary as="span">{org?.username || ''}</TokenGatingFormHeaderSecondary>
          </TokenGatingFormHeader>
          <TokenGatingAutocompleteLabel>Chain</TokenGatingAutocompleteLabel>
          <TokenGatingAutocomplete
            options={chainOptions}
            value={chain}
            open={openChainSelection}
            onChange={(event, newValue) => setChain(newValue.value)}
            renderInput={(params) => {
              return (
                <TokenGatingAutocompleteTextfieldWrapper ref={params.InputProps.ref}>
                  <TokenGatingTextfieldInput
                    {...params.inputProps}
                    endAdornment={
                      <TokenGatingAutocompleteTextfieldButton
                        onClick={() => setOpenChainSelection(!openChainSelection)}
                      >
                        <TokenGatingAutocompleteTextfieldDownIcon />
                      </TokenGatingAutocompleteTextfieldButton>
                    }
                  ></TokenGatingTextfieldInput>
                </TokenGatingAutocompleteTextfieldWrapper>
              );
            }}
            renderOption={(props, option) => (
              <TokenGatingAutocompleteListItem value={option.value} {...props}>
                {option?.icon}
                {option.label}
              </TokenGatingAutocompleteListItem>
            )}
            ListboxComponent={TokenGatingAutocompleteList}
            PopperComponent={TokenGatingAutocompletePopper}
            openOnFocus
          />
          <TokenGatingAutocompleteLabel>Token Type</TokenGatingAutocompleteLabel>
          <DropdownSelect
            value={accessConditionType}
            options={SUPPORTED_ACCESS_CONDITION_TYPES}
            setValue={setAccessConditionType}
            onChange={(e) => {}}
            innerStyle={{
              marginTop: 10,
            }}
            formSelectStyle={{
              height: 'auto',
            }}
          />
          <TokenGatingTokenAmountWrapper>
            <TokenGatingInputWrapper>
              <TokenGatingAutocompleteLabel>Token</TokenGatingAutocompleteLabel>
              <TokenGatingAutocomplete
                disablePortal
                options={accessConditionType === 'ERC20' ? tokenList : nftList}
                value={selectedToken}
                onChange={(event, newValue) => setSelectedToken(newValue)}
                renderInput={(params) => (
                  <TokenGatingAutocompleteTextfieldWrapper ref={params.InputProps.ref}>
                    <TokenGatingTextfieldInput
                      {...params.inputProps}
                      endAdornment={
                        <TokenGatingAutocompleteTextfieldButton>
                          <TokenGatingAutocompleteTextfieldDownIcon />
                        </TokenGatingAutocompleteTextfieldButton>
                      }
                    />
                  </TokenGatingAutocompleteTextfieldWrapper>
                )}
                ListboxComponent={TokenListboxVirtualized}
                PopperComponent={TokenGatingAutocompletePopper}
                renderOption={(props, option) => [props, option]}
                renderGroup={(params) => params}
              />
            </TokenGatingInputWrapper>
            <TokenGatingInputWrapper>
              <TokenGatingAutocompleteLabel>Min. amount to hold</TokenGatingAutocompleteLabel>
              <TokenGatingTextfieldInputWrapper>
                <TokenGatingTextfieldInput
                  type={'number'}
                  value={minAmount.toString()}
                  onChange={handleMinAmountOnChange}
                  open={openChainSelection}
                  onWheel={(e) => e.target.blur()}
                  endAdornment={
                    <TokenGatingTextfieldButtonWrapper>
                      <TokenGatingTextfieldButtonUp onClick={() => handleMinAmountOnClick(1)}>
                        <TokenGatingAutocompleteTextfieldDownIcon />
                      </TokenGatingTextfieldButtonUp>
                      <TokenGatingTextfieldButtonDown onClick={() => handleMinAmountOnClick(-1)}>
                        <TokenGatingAutocompleteTextfieldDownIcon />
                      </TokenGatingTextfieldButtonDown>
                    </TokenGatingTextfieldButtonWrapper>
                  }
                />
                <TokenGatingTextfieldTextHelperWrapper visibility={minAmountError}>
                  <ErrorFieldIcon />
                  <TokenGatingTextfieldTextHelper>Please enter an amount</TokenGatingTextfieldTextHelper>
                </TokenGatingTextfieldTextHelperWrapper>
              </TokenGatingTextfieldInputWrapper>
            </TokenGatingInputWrapper>
          </TokenGatingTokenAmountWrapper>
          <TokenGatingAutocompleteLabel
            style={{
              marginTop: 0,
            }}
          >
            Name
          </TokenGatingAutocompleteLabel>
          <TokenGatingTextfieldInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              marginTop: 12,
            }}
          ></TokenGatingTextfieldInput>
          <TokenGatingButton onClick={handleOnSubmit}>Create Token Gate </TokenGatingButton>
          {/* {creationComplete && (
            <TokenGatingDisabledButton onClick={handleOnSubmit} disabled={creationComplete}>
              Created!
            </TokenGatingDisabledButton>
          )} */}
        </TokenGatingFormWrapper>
      </TokenGatingConfigModal>
    </Modal>
  );
};

export default TokenGatingConfigForm;