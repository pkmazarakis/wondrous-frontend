import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { GET_LOGGED_IN_USER } from 'graphql/queries';
import { VERIFY_USER_TWEET } from 'graphql/mutations';
import { WalletConnected, Label } from '../styles';
import OnboardingLayout from 'components/Onboarding/OnboardingLayout';
import TwitterBlue from '../../../public/images/twitterBlue.svg';
import { CompletedIcon } from 'components/Icons/statusIcons';
import { ContinueButton, LaterButton, Later, SecretCodeContainer } from 'components/Onboarding/OnboardingLayout/Footer/styles';
import { InviteWelcomeBoxParagraph, QRCodeTwitter } from '../styles';
import TwitterLogo from '../../../public/images/twitter.svg';
import CheckMarkIcon from 'components/Icons/checkMark';
import { Button } from 'components/Common/button';
import { Layout, OnboardingTitle } from 'components/Onboarding/OnboardingLayout/styles';

// const buttonStyle = {
//   background: 'linear-gradient(270deg, #CCBBFF -5.62%, #7427FF 45.92%, #00BAFF 103.12%)',
//   display: 'flex',
//   alignItems: 'center',
// };

const VerifyTweet = () => {
  const router = useRouter();
  const [tweetVerified, setTweetVerified] = useState(false);
  const { data: userData } = useQuery(GET_LOGGED_IN_USER, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      console.log('data', data);
      if (data?.getLoggedinUser?.userInfo && !userData?.getLoggedinUser?.userInfo?.twitterUsername) {
        router.push(`/onboarding/twitter`, undefined, {
          shallow: true,
        });
      }
    },
  });
  const [verifyUserTweet] = useMutation(VERIFY_USER_TWEET, {
    onCompleted: (data) => {
      setTweetVerified(true);
    },
  });

  const userAlreadyTweeted = !!userData?.getLoggedinUser?.userInfo?.promotionTweet;

  useEffect(() => {
    if (userAlreadyTweeted) {
      setTweetVerified(true);
    }
  }, [userAlreadyTweeted]);

  const hanldeLaterClick = () => {
    // if user is part of a org maybe redirect to org
    router.push('/dashboard', undefined, {
      shallow: true,
    });
  };

  return (
    <Layout
      style={{
        paddingTop: '55px',
        paddingBottom: '55px',
        minHeight: 'unset',
      }}
    >
      <OnboardingTitle
        style={{
          marginTop: 0,
        }}
      >
        Get your POAP
      </OnboardingTitle>
      <InviteWelcomeBoxParagraph
        style={{
          textAlign: 'left',
          width: '100%',
          fontSize: '15px',
          fontWeight: '400',
        }}
      >
        Want to get your launch POAP? <br /> Verify your Twitter to get the password and link.
      </InviteWelcomeBoxParagraph>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <QRCodeTwitter />
        {!tweetVerified && (
          <div
            style={{
              width: '100%',
              maxWidth: '326px',
            }}
          >
            <a
              href="https://twitter.com/intent/tweet?text=Hello%20world%20@wonderverse_xyz"
              target="_blank"
              rel="noreferrer"
            >
              <ContinueButton
                type="submit"
                style={{
                  marginTop: '29px',
                  minHeight: '50px',
                  width: '100%',
                }}
              >
                <TwitterLogo style={{ marginRight: '10px' }} />
                Tweet
              </ContinueButton>
            </a>
            <LaterButton
              style={{
                marginRight: 0,
                minHeight: '50px',
                margin: '21px 0',
              }}
              onClick={verifyUserTweet}
            >
              Veryify
            </LaterButton>
            <Later
              style={{
                width: '100%',
                height: '50px',
              }}
              onClick={hanldeLaterClick}
            >
              I’ll get POAP later
            </Later>
          </div>
        )}
        {tweetVerified && (
          <div
            style={{
              width: '100%',
              maxWidth: '326px',
            }}
          >
            <SecretCodeContainer
              style={{
                marginTop: '29px',
                width: '100%',
                height: '50px',
              }}
            >
              Code: VonderWerse
            </SecretCodeContainer>
            <ContinueButton
              style={{
                marginTop: '29px',
                width: '100%',
                height: '50px',
              }}
              onClick={hanldeLaterClick}
            >
              Continue to dashboard
            </ContinueButton>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default VerifyTweet;