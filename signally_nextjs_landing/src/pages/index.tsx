import { LandingFooter } from '../containers/LandingFooter';

import { GetServerSidePropsContext } from 'next';
import Page from '../components/others/Page';
import LandingCallToAction from '../containers/LandingCallToAction';
import LandingHero from '../containers/LandingHero';
import LandinWhyChooseUs from '../containers/LandingWhyChooseUs';
import Layout from '../layouts';
import { firestoreAdmin } from '../_firebase/firebase_admin';

interface IProps {
  googlePlay: string;
  appStore: string;
}

export default function LandingPage({ googlePlay, appStore }: IProps) {
  return (
    <Layout variant='landing'>
      <Page title='Landing'>
        <LandingHero appStore={appStore} googlePlay={googlePlay} />
        <LandingCallToAction />
        <LandinWhyChooseUs />
        <LandingFooter />
      </Page>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=700');

  let links = await firestoreAdmin.collection('appControlsPublic').doc('appControlsPublic').get();
  let data = links.data() || null;

  let googlePlay = data?.linkGooglePlay || '#';
  let appStore = data?.linkAppStore || '#';

  return {
    props: {
      googlePlay,
      appStore
    }
  };
}
