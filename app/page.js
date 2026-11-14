import { SiteShell } from '@/components/SiteShell';
import { getPublishedContent } from '@/lib/published-content';


export default async function HomePage() {
  return <SiteShell content={await getPublishedContent()} />;
}
