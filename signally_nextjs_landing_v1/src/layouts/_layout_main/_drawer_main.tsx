import { Box, Button, Drawer, Text } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Iconify from '../../components/others/Iconify';
import { useBreakpoint } from '../../utils/use_breakpoint';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function DrawerLanding({ isOpen, setIsOpen }: Props) {
  const router = useRouter();
  const bp = useBreakpoint();

  function handleSigninPush() {
    setIsOpen(false);
    router.push('/signin');
  }

  function handleSignupPush() {
    setIsOpen(false);
    router.push('/signup');
  }

  useEffect(() => {
    if (bp !== 'xs') setIsOpen(false);
  }, [bp]);

  return (
    <Drawer className='w-full px-4 py-4' title='' position='right' withCloseButton={false} opened={isOpen} onClose={() => setIsOpen(false)}>
      <Box onClick={() => setIsOpen(false)} className='flex justify-end m-0 cursor-pointer'>
        <Iconify className='' icon={'ep:circle-close'} width={30} height={30} />
      </Box>

      <Box className='flex flex-col h-[calc(90vh)] justify-center items-center'>
        <Routes setIsOpen={setIsOpen} />
      </Box>
    </Drawer>
  );
}

function Routes({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
  return (
    <>
      <LinkToPage onClick={() => setIsOpen(false)} route='/privacy' text='Privacy' />
      <LinkToPage onClick={() => setIsOpen(false)} route='/terms' text='Terms' />
      <LinkToPage onClick={() => setIsOpen(false)} route='/contact-us' text='Contact' />
    </>
  );
}

interface LinkToPageProps {
  route: string;
  text: string;
  onClick: () => void;
}

function LinkToPage({ route, text, onClick }: LinkToPageProps) {
  return (
    <Link className='' href={route} passHref>
      <Text onClick={onClick} className='font-bold mx-3 hover:opacity-95 my-[13px]' component='a'>
        {text}
      </Text>
    </Link>
  );
}
