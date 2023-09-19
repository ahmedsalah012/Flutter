import { Container } from '@mantine/core';
import { ReactElement } from 'react';
import ContactUsForm from '../../components/forms/ContactUsForm';

import Page from '../../components/others/Page';

import { LandingFooter } from '../../containers/LandingFooter';
import Layout from '../../layouts';

export default function ContactPage() {
  return (
    <Page title='Privacy'>
      <Container className='pt-10 mb-20 ' size={'xl'}>
        <ContactUsForm />
      </Container>
      <LandingFooter />
    </Page>
  );
}

ContactPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant='landing'>{page}</Layout>;
};
