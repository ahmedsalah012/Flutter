import { Container } from '@mantine/core';
import { ReactElement } from 'react';

import { GetServerSidePropsContext } from 'next';
import Page from '../../components/others/Page';
import { LandingFooter } from '../../containers/LandingFooter';
import Layout from '../../layouts';
import { firestoreAdmin } from '../../_firebase/firebase_admin';

interface IProps {
  privacy: string | null;
}

export default function PrivacyPage({ privacy }: IProps): ReactElement {
  return (
    <Page title='Privacy'>
      <Layout variant={'logoOnly'}>
        <Container className='pt-10 mb-20' size={'xl'}>
          {privacy && (
            <div
              className='space-y-5 leading-6 '
              dangerouslySetInnerHTML={{
                __html: privacy
              }}
            />
          )}
        </Container>
        <LandingFooter />
      </Layout>
    </Page>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=700');

  let queryPrivacy = await firestoreAdmin.collection('appControlsPublic').doc('privacy').get();
  let privacy = queryPrivacy.data()?.data || null;

  return {
    props: {
      privacy: JSON.parse(JSON.stringify(privacy))
    }
  };
}
