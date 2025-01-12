import { useMutation, useLazyQuery } from '@apollo/client';
import apollo from 'services/apollo';
import { useRouter } from 'next/router';

import ErrorFieldIcon from 'components/Icons/errorField.svg';
import Ethereum from 'components/Icons/ethereum';
import Harmony from 'components/Icons/harmony';
import Optimism from 'components/Icons/Optimism';
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
  TokenGatingFormHeaderSecondary,
  TokenGatingFormWrapper,
  TokenGatingInputImage,
  TokenGatingTextfieldButtonDown,
  TokenGatingTextfieldButtonUp,
  TokenGatingTextfieldButtonWrapper,
  TokenGatingTextfieldInput,
  TokenGatingTextfieldInputWrapper,
  TokenGatingTextfieldTextHelper,
  TokenGatingTextfieldTextHelperWrapper,
  TokenGatingTokenAmountWrapper,
} from './styles';
import {
  CREATE_TOKEN_GATING_CONDITION_FOR_ORG,
  UPDATE_TOKEN_GATING_CONDITION,
} from '../../../graphql/mutations/tokenGating';
import { GET_TOKEN_GATING_CONDITIONS_FOR_ORG, GET_TOKEN_INFO, GET_NFT_INFO } from 'graphql/queries/tokenGating';
import { NFT_LIST, HARMONY_TOKEN_LIST } from '../../../utils/tokenList';

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
  {
    label: 'Harmony',
    icon: <Harmony />,
    value: 'harmony',
  },
  {
    label: 'Optimism',
    icon: <Optimism />,
    value: 'optimism',
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
  const router = useRouter();
  const { orgId, org, open, setShowConfigModal, selectedTokenGatingCondition, setSelectedTokenGatingCondition } = props;
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
  const [getTokenInfo, { loading: getTokenInfoLoading }] = useLazyQuery(GET_TOKEN_INFO, {
    onCompleted: (data) => {
      if (data?.getTokenInfo) {
        const formattedOption = {
          label: data?.getTokenInfo.name,
          value: data?.getTokenInfo.contractAddress,
          icon: data?.getTokenInfo.logoUrl,
        };
        setSelectedToken(formattedOption);
        setTokenList((oldArray) => [...oldArray, formattedOption]);
      }
    },
    fetchPolicy: 'network-only',
  });

  const [getNFTInfo, { loading: getNFTInfoLoading }] = useLazyQuery(GET_NFT_INFO, {
    onCompleted: (data) => {
      if (data?.getNFTInfo) {
        if (data?.getNFTInfo.type !== 'ERC721' && data?.getNFTInfo.type !== 'ERC1155') {
          return;
        }
        const formattedOption = {
          label: data?.getNFTInfo.name,
          value: data?.getNFTInfo.contractAddress,
          icon: data?.getNFTInfo.logoUrl,
        };
        setSelectedToken(formattedOption);
        setNftList((oldArray) => [...oldArray, formattedOption]);
      }
    },
    fetchPolicy: 'network-only',
  });

  const searchSelectedTokenInList = (contractAddress, tokenList, chain) => {
    contractAddress = contractAddress?.toLowerCase();
    for (const tokenInfo of tokenList) {
      if (contractAddress === tokenInfo.value) {
        return tokenInfo;
      }
    }
    if (accessConditionType === 'ERC20') {
      getTokenInfo({
        variables: {
          contractAddress,
          chain,
        },
      });
    }
    if (accessConditionType === 'ERC721') {
      getNFTInfo({
        variables: {
          contractAddress,
        },
      });
    }
  };

  useEffect(() => {
    // this is for edit only, prepopulating
    if (selectedTokenGatingCondition && selectedTokenGatingCondition?.accessCondition) {
      setAccessConditionType(selectedTokenGatingCondition.accessCondition[0]?.type);
      setName(selectedTokenGatingCondition.name);
      setChain(selectedTokenGatingCondition.accessCondition[0]?.chain);
      setMinAmount(selectedTokenGatingCondition.accessCondition[0]?.minValue);
      const selectedContractAddress = selectedTokenGatingCondition.accessCondition[0]?.contractAddress;
      if (selectedContractAddress) {
        let selectedTokenInfo;
        if (accessConditionType === 'ERC20') {
          selectedTokenInfo = searchSelectedTokenInList(selectedContractAddress, tokenList, chain);
        }
        if (accessConditionType === 'ERC721') {
          selectedTokenInfo = searchSelectedTokenInList(selectedContractAddress, nftList, chain);
        }
        if (selectedTokenInfo) {
          setSelectedToken(selectedTokenInfo);
        }
      }
    }
  }, [selectedTokenGatingCondition]);

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
    setSelectedTokenGatingCondition(null);
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
    const newMinAmount = Number(minAmount) + change;
    if (newMinAmount < 0) return;
    setMinAmount(newMinAmount.toString());
  };
  const handleSelectedTokenInputChange = (event, value) => {
    let foundToken;
    if (value && value.length === 42 && value.startsWith('0x')) {
      if (accessConditionType === 'ERC20') {
        foundToken = searchSelectedTokenInList(value, tokenList, chain);
      } else if (accessConditionType === 'ERC721') {
        foundToken = searchSelectedTokenInList(value, nftList, chain);
      }
      if (foundToken) {
        setSelectedToken(foundToken);
      }
    }
  };
  const handleUpdateTokenGate = async () => {
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
    try {
      await apollo.mutate({
        mutation: UPDATE_TOKEN_GATING_CONDITION,
        variables: {
          tokenGatingConditionId: selectedTokenGatingCondition?.id,
          input: {
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
    } catch (e) {
      console.error(e);
    }
    clearErrors();
    clearSelection();
    setShowConfigModal(false);
  };

  const handleCreateTokenGate = () => {
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
    if (chain === 'harmony') {
      const formatted = HARMONY_TOKEN_LIST.map((token) => {
        return {
          label: token.name,
          value: token.address,
          icon: token.logoURI,
        };
      });
      setTokenList(formatted);
      return formatted;
    }
    const erc20Url = 'https://tokens.coingecko.com/uniswap/all.json';
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
    const sorted = NFT_LIST.sort((a, b) => (a.name > b.name ? 1 : -1));
    const formatted = sorted.map((token) => {
      return {
        label: token.name,
        value: token.address,
        icon: token.logoURI,
      };
    });
    setNftList(formatted);
    return formatted;
  }

  useEffect(() => {
    if (accessConditionType === 'ERC20') {
      getTokenList();
      // if (tokenList && tokenList.length === 0) {
      // }
    }
    if (accessConditionType === 'ERC721') {
      if (nftList && nftList.length === 0) {
        getNFTList();
      }
    }
  }, [accessConditionType, chain]);

  return (
    <Modal
      open={open}
      onClose={() => {
        clearErrors();
        clearSelection();
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
          {/* <TokenGatingAutocomplete
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
              <TokenGatingAutocompleteListItem
                value={option.value}
                {...props}
              >
                {option?.icon}
                {option.label}
              </TokenGatingAutocompleteListItem>
            )}
            ListboxComponent={TokenGatingAutocompleteList}
            PopperComponent={TokenGatingAutocompletePopper}
            openOnFocus
          /> */}
          <DropdownSelect
            value={chain}
            setValue={setChain}
            innerStyle={{
              marginTop: 0,
            }}
            formSelectStyle={{
              height: 'auto',
            }}
            options={chainOptions}
            name="chain"
          />
          <TokenGatingAutocompleteLabel>Token Type</TokenGatingAutocompleteLabel>
          <DropdownSelect
            value={accessConditionType}
            options={SUPPORTED_ACCESS_CONDITION_TYPES}
            setValue={setAccessConditionType}
            innerStyle={{
              marginTop: 10,
            }}
            formSelectStyle={{
              height: 'auto',
            }}
          />
          <TokenGatingTokenAmountWrapper>
            <div>
              <TokenGatingAutocompleteLabel>Token</TokenGatingAutocompleteLabel>
              <TokenGatingAutocomplete
                disablePortal
                options={accessConditionType === 'ERC20' ? tokenList : nftList}
                value={selectedToken}
                onInputChange={handleSelectedTokenInputChange}
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
            </div>

            <div>
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
            </div>
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
          {selectedTokenGatingCondition ? (
            <TokenGatingButton onClick={handleUpdateTokenGate}>Update Token Gate </TokenGatingButton>
          ) : (
            <TokenGatingButton onClick={handleCreateTokenGate}>Create Token Gate </TokenGatingButton>
          )}
        </TokenGatingFormWrapper>
      </TokenGatingConfigModal>
    </Modal>
  );
};

export default TokenGatingConfigForm;
