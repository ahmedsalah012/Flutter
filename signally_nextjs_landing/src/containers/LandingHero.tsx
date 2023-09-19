import { Box, Container, Grid, Text } from '@mantine/core';

interface IProps {
  googlePlay: string;
  appStore: string;
}

export default function LandingHero({ googlePlay, appStore }: IProps) {
  return (
    <Container className='' size='xl'>
      <Grid className='mt-20 overflow-hidden align-middle'>
        <Grid.Col sm={6} className='sm:h-[600px] flex flex-col justify-center'>
          <Text className='mb-8 text-5xl font-extrabold leading-[1.25] text-left'>
            Designed to make you more <span className='text-brand-yellow'>profitable!</span> <br />{' '}
          </Text>

          <Text className='mb-8 text-lg font-semibold text-left'>
            Artificial intelligence driven signals for Forex, Crypto, Stocks!
            <br></br>
            <Text>Get started for free today!</Text>
          </Text>

          <Box className='flex'>
            <a className='dark:border-2 rounded-lg w-[140px] overflow-hidden' href={appStore} target={'_blank'}>
              <img className='w-full h-full cursor-pointer' src='/svg/appstore-black.svg' />
            </a>
            <div className='mx-3' />
            <a className='dark:border-2 rounded-lg w-[140px] overflow-hidden' href={googlePlay} target={'_blank'}>
              <img className='w-full h-full cursor-pointer ' src='/svg/googleplay-black.svg' />
            </a>
          </Box>
        </Grid.Col>

        <Grid.Col sm={6} className='xs:mt-20 sm:mt-0 h-[580px]'>
          <div className='flex h-36 xs:justify-center sm:justify-end'>
            <img src='/images/hero-iphone.png' className='h-[580px]' />
          </div>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
