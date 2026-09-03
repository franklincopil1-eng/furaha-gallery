import React, { useEffect } from 'react';
import { WhoWeServeHero } from './who-we-serve/WhoWeServeHero';
import { WhoWeServeIntro } from './who-we-serve/WhoWeServeIntro';
import { HumanReality } from './donation/HumanReality';
import { WhereWeServeCommunities } from './who-we-serve/WhereWeServeCommunities';
import { ChildStory } from './donation/ChildStory';
import { VisualProofGallery } from './who-we-serve/VisualProofGallery';
import { CommunityPillars } from './who-we-serve/CommunityPillars';
import { WorkInMotionImpact } from './who-we-serve/WorkInMotionImpact';
import { WhoWeServeFinalCTA } from './who-we-serve/WhoWeServeFinalCTA';

interface WhoWeServePageProps {
  onNavigateToDonate: (cause?: string) => void;
  onNavigateToHome: () => void;
  onNavigateToSection: (sectionId: string) => void;
  onNavigateToOurWork?: () => void;
  onNavigateToOurImpact?: () => void;
}

export const WhoWeServePage: React.FC<WhoWeServePageProps> = ({
  onNavigateToDonate,
  onNavigateToHome,
  onNavigateToSection,
  onNavigateToOurWork,
  onNavigateToOurImpact,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Who We Serve in Kenya | Furaha Ministries';
  }, []);

  const scrollToCommunities = () => {
    const el = document.getElementById('who-we-serve-intro') || document.getElementById('where-we-serve-section');
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
          const el = document.getElementById(`community-${communityId}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            scrollToCommunities();
          }
        }}
      />

      {/* 2. Introduction: Working directly with local partners */}
      <WhoWeServeIntro
        onFirstCommunityClick={() => {
          const el = document.getElementById('community-amani') || document.getElementById('amani-childrens-home') || document.getElementById('where-we-serve-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onViewCommunitiesClick={scrollToCommunities}
      />

      {/* 3. The Human Reality (What children need to stay in school) */}
      <HumanReality />

      {/* 4. Communities: Amani Children's Home, West Hill */}
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

      {/* 5. Real Child Story (Grounding reality in Kenya) */}
      <ChildStory onSponsorClick={() => onNavigateToDonate('Education')} />

      {/* 6. Photographs from the field */}
      <VisualProofGallery />

      {/* 5. What Furaha does (Education, Nutrition, Mentorship, Faith) */}
      <CommunityPillars
        onSponsorEducation={() => onNavigateToDonate('Education')}
      />

      {/* 6. Accountability & Progress */}
      <WorkInMotionImpact
        onExploreImpact={() => {
          if (onNavigateToOurImpact) {
            onNavigateToOurImpact();
          } else {
            onNavigateToSection('our-impact');
          }
        }}
      />

      {/* 7. Final Human Invitation CTA */}
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
