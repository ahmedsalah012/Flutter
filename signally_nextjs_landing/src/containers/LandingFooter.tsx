import { Box, Button, Group, Image, Text, useMantineColorScheme } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function LandingFooter() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const router = useRouter();
  return (
    <Box className='flex flex-col items-center justify-center border-0 dark:bg-dark-100'>
      <Box className='flex flex-col items-center justify-center bg-light-300 dark:bg-app-black w-full h-[250px] mb-10'>
        <Text className='my-4 text-2xl font-bold text-center'>Designed to make you more profitable!</Text>
      </Box>

      <Box className='mt-5'>
        <ul className='flex items-center justify-center mt-4 mb-8 text-sm flex-wra'>
          <li className='mx-2 mb-2 md:mb-0'>
            <a className='font-medium hover:text-gray-600' href='/terms'>
              Terms
            </a>
          </li>
          <li className='mx-2 mb-2 md:mb-0'>
            <a className='font-medium hover:text-gray-600' href='/privacy'>
              Privacy
            </a>
          </li>
          <li className='mx-2 mb-2 md:mb-0'>
            <a className='font-medium hover:text-gray-600' href='/contact-us'>
              Contact
            </a>
          </li>
        </ul>
      </Box>

      <Box className='flex items-center justify-center mt-0 mb-8 align-middle'>
        <Text className='text-sm'>All rights reserved © 2022 Signally</Text>
      </Box>
    </Box>
  );
}
