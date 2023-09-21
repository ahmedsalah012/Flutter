import { Box, Container, Text } from '@mantine/core';

export default function LandingCallToAction() {
  return (
    <Container className='text-center xs:mt-10 sm:mt-36' size='xl'>
      <Box className='flex xs:flex-col-reverse sm:flex-row'>
        <Box className='xs:w-full sm:w-1/2'>
          <div className='h-[600px] flex xs:justify-center sm:justify-start'>
            <img src='/images/hero-iphone.png' className='h-[600px]' />
          </div>
        </Box>

        <Box className='xs:w-full sm:w-1/2 h-[600px] flex flex-col justify-center '>
          <Text className='max-w-lg mb-2 text-5xl font-bold text-left'>Signals you can trust!</Text>
          <Text className='max-w-lg mb-8 text-left'>Start your first trade with these easy steps.</Text>

          <Text className='max-w-lg mb-1 text-2xl font-bold text-left'>Download</Text>
          <Text className='max-w-lg mb-8 text-left'>Install the Signally App from Google Play, Apple Appstore or use our webapp</Text>

          <Text className='max-w-lg mb-1 text-2xl font-bold text-left'>Choose</Text>
          <Text className='max-w-lg mb-8 text-left'>
            Select a subscription that's right for you! All subscription give access to Forex, Crypto, Stocks signals
          </Text>

          <Text className='max-w-lg mb-1 text-2xl font-bold text-left'>Start Trading</Text>
          <Text className='max-w-lg mb-8 text-left'>
            You're good to go! Buy/sell crypto, forex, stocks by copy trading with our signals in real-time.
          </Text>
        </Box>
      </Box>
    </Container>
  );
}
