import { AboutHero } from './components/about-hero';
import { CompanyOverview } from './components/company-overview';
import { MissionValues } from './components/mission-values';
import { LeadershipTeam } from './components/leadership-team';
import { HistoryTimeline } from './components/history-timeline';
import { CommunityImpact } from './components/community-impact';
import { TeamCulture } from './components/team-culture';
import { ContactFooter } from './components/contact-footer';

export default function About() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <CompanyOverview />
      <MissionValues />
      <LeadershipTeam />
      <HistoryTimeline />
      <CommunityImpact />
      <TeamCulture />
      <ContactFooter />
    </div>
  );
}