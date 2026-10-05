import React, { useEffect, useState } from 'react';
import { WhoWeServeHero } from '../components/who-we-serve/WhoWeServeHero';
import { WhoWeServeIntro } from '../components/who-we-serve/WhoWeServeIntro';
import { ProjectHarmonizationTabs, HarmonizedProjectTab } from '../components/who-we-serve/ProjectHarmonizationTabs';
import { HumanReality } from '../components/donation/HumanReality';
import { WhereWeServeCommunities } from '../components/who-we-serve/WhereWeServeCommunities';
import { ChildStory } from '../components/donation/ChildStory';
import { VisualProofGallery } from '../components/who-we-serve/VisualProofGallery';
import { CommunityPillars } from '../components/who-we-serve/CommunityPillars';
import { WorkInMotionImpact } from '../components/who-we-serve/WorkInMotionImpact';
import { WhoWeServeFinalCTA } from '../components/who-we-serve/WhoWeServeFinalCTA';

interface WhoWeServePageProps {
  onNavigateToDonate: (cause?: string) => void;
  onNavigateToHome: () => void;
  onNavigateToSection: (sectionId: string) => void;
  onNavigateToOurWork?: () => void;
  onNavigateToOurImpact?: () => void;
  targetCommunity?: HarmonizedProjectTab;
  onSelectCommunityTab?: (tab: HarmonizedProjectTab) => void;
}

export const WhoWeServePage: React.FC<WhoWeServePageProps> = ({
  onNavigateToDonate,
  onNavigateToHome,
  onNavigateToSection,
  onNavigateToOurWork,
  onNavigateToOurImpact,
  targetCommunity = 'all',
  onSelectCommunityTab,
}) => {
  const [activeProjectTab, setActiveProjectTab] = useState<HarmonizedProjectTab>(targetCommunity);

  useEffect(() => {
    if (targetCommunity) {
      setActiveProjectTab(targetCommunity);
    }
  }, [targetCommunity]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Who We Serve in Kenya | Furaha Ministries';
  }, []);

  const handleTabChange = (tab: HarmonizedProjectTab) => {
    setActiveProjectTab(tab);
    if (onSelectCommunityTab) {
      onSelectCommunityTab(tab);
    }
    const el = document.getElementById('project-tabs-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCommunities = () => {
    const el = document.getElementById('project-tabs-section') || document.getElementById('where-we-serve-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#201a18] flex flex-col font-sans selection:bg-[#893d2d] selection:text-white relative overflow-hidden">
      {/* 1. Hero */}
      <WhoWeServeHero
        onPrimaryCtaClick={() => onNavigateToDonate('Where Needed Most')}
        onSecondaryCtaClick={scrollToCommunities}
        onNavigateToHome={onNavigateToHome}
        onSelectCommunity={(communityId) => {
          if (communityId === 'west-hill' || communityId === 'amani' || communityId === 'cry-of-a-young-one') {
            handleTabChange(communityId);
          } else {
            scrollToCommunities();
          }
        }}
      />

      {/* 2. Dedicated Project Tabs & 2027 Harmonized Stories */}
      <ProjectHarmonizationTabs
        activeTab={activeProjectTab}
        onTabChange={handleTabChange}
        onDonateToCause={(cause) => onNavigateToDonate(cause)}
      />

      {/* 3. Introduction: Working directly with local partners */}
      <WhoWeServeIntro
        onFirstCommunityClick={() => handleTabChange('amani')}
        onViewCommunitiesClick={scrollToCommunities}
      />

      {/* 4. The Human Reality (What children need to stay in school) */}
      <HumanReality />

      {/* 6. Partner Communities Detailed Directory */}
      <WhereWeServeCommunities
        onSupportCommunity={(communityName) => onNavigateToDonate(communityName)}
        onExploreWork={() => {
          if (onNavigateToOurWork) {
            onNavigateToOurWork();
          } else {
            const el = document.getElementById('community-pillars-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* 7. Real Child Story (Grounding reality in Kenya) */}
      <ChildStory onSponsorClick={() => onNavigateToDonate('West Hill School')} />

      {/* 8. Photographs from the field */}
      <VisualProofGallery />

      {/* 9. What Furaha does (Education, Nutrition, Mentorship, Faith) */}
      <CommunityPillars
        onSponsorEducation={() => onNavigateToDonate('Education')}
      />

      {/* 10. Accountability & Progress */}
      <WorkInMotionImpact
        onExploreImpact={() => {
          if (onNavigateToOurImpact) {
            onNavigateToOurImpact();
          } else {
            onNavigateToSection('our-impact');
          }
        }}
      />

      {/* 11. Final Human Invitation CTA */}
      <WhoWeServeFinalCTA
        onDonate={() => onNavigateToDonate('Where Needed Most')}
        onOurWork={() => {
          if (onNavigateToOurWork) {
            onNavigateToOurWork();
          } else {
            onNavigateToSection('causes');
          }
        }}
      />

    </div>
  );
};
