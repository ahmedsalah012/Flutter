import { AppShell, Box, Container, Group, Header, Text, useMantineColorScheme } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useBreakpoint } from '../../utils/use_breakpoint';
import DrawerLanding from './_drawer_main';

type Props = {
  children: React.ReactNode;
};

export default function LayoutLanding({ children }: Props) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [appBarHeight, setAppBarHeight] = useState(55);
  const router = useRouter();
  const bp = useBreakpoint();

  return (
    <>
      <DrawerLanding isOpen={isOpenDrawer} setIsOpen={setIsOpenDrawer} />
      <AppShell
        className='bg-light-100 dark:bg-dark-100'
        padding={0}
        fixed
        header={
          <Header height={appBarHeight} className='dark:bg-dark-100'>
            <Container size='xl' className='flex justify-between h-full align-middle'>
              <Group className='cursor-pointer' spacing={0} align='center'>
                <Link href={'/'}>
                  <img src={colorScheme == 'dark' ? 'svg/logo-white.svg' : 'svg/logo-black.svg'} width={140} height={60} className='' />
                </Link>
              </Group>

              <Box className='xs:hidden sm:flex'>
                <Group>
                  <LinkToPage route='/privacy' text='Privacy' />
                  <LinkToPage route='/terms' text='Terms' />
                  <LinkToPage route='/contact-us' text='Contact' />
                </Group>
              </Box>
            </Container>
          </Header>
        }
      >
        {children}
      </AppShell>
    </>
  );
}

function LinkToPage({ route = '', text = '' }) {
  return (
    <Link href={route} passHref>
      <Text className='mx-2 hover:opacity-95' component='a'>
        {text}
      </Text>
    </Link>
  );
}
