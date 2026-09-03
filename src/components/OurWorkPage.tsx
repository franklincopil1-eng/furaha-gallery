import React, { useEffect } from 'react';
import { OurWorkHero } from './our-work/OurWorkHero';
import { OurWorkIntro } from './our-work/OurWorkIntro';
import { FourWorkAreas } from './our-work/FourWorkAreas';
import { OnTheGroundGallery } from './our-work/OnTheGroundGallery';
import { ConnectCommunities } from './our-work/ConnectCommunities';
import { JourneyOfSupport } from './our-work/JourneyOfSupport';
import { StoriesFromWork } from './our-work/StoriesFromWork';
import { OurImpactTransition } from './our-work/OurImpactTransition';
import { OurWorkFinalCTA } from './our-work/OurWorkFinalCTA';

interface OurWorkPageProps {
  onNavigateToDonate: (cause?: string) => void;
  onNavigateToWhoWeServe: () => void;
  onNavigateToOurImpact?: () => void;
  onNavigateToGallery?: () => void;
  onNavigateToHome: () => void;
  onNavigateToSection: (sectionId: string) => void;
  onOpenContact?: () => void;
}

export const OurWorkPage: React.FC<OurWorkPageProps> = ({
  onNavigateToDonate,
  onNavigateToWhoWeServe,
  onNavigateToOurImpact,
  onNavigateToGallery,
  onNavigateToHome,
  onNavigateToSection,
  onOpenContact,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Our Work in Kenya | Furaha Ministries';
  }, []);

  const handleImpactNavigation = () => {
    if (onNavigateToOurImpact) {
      onNavigateToOurImpact();
    } else {
      onNavigateToSection('our-impact');
    }
  };

  const handleSelectPillar = (pillarId: string) => {
    const el = document.getElementById(`work-area-${pillarId}`) || document.getElementById('four-work-areas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#201a18] flex flex-col font-sans selection:bg-[#893d2d] selection:text-white relative overflow-hidden">
      {/* 1. Hero */}
      <OurWorkHero
        onPrimaryCtaClick={() => onNavigateToDonate('Where Needed Most')}
        onSecondaryCtaClick={handleImpactNavigation}
        onNavigateToHome={onNavigateToHome}
        onSelectPillar={handleSelectPillar}
      />

      {/* 2. Intro & Holistic Pillars Overview (Curved shoulders, 4 pillars connector bar, documentary showcase) */}
      <OurWorkIntro
        onSelectPillar={handleSelectPillar}
      />

      {/* 3. Four Areas of Work: LEARN, EAT, GROW, BELIEVE */}
      <FourWorkAreas
        onSupportArea={(causeName) => onNavigateToDonate(causeName)}
      />

      {/* 4. Show the Work: Photographic Evidence on the ground */}
      <OnTheGroundGallery onNavigateToGallery={onNavigateToGallery} />

      {/* 5. Connect the Work to Real Communities: Amani, West Hill */}
      <ConnectCommunities
        onNavigateToWhoWeServe={onNavigateToWhoWeServe}
      />

      {/* 6. A Typical Journey of Support (Collaborative Working Flow) */}
      <JourneyOfSupport />

      {/* 7. Stories From the Work: Behind every program is a person */}
      <StoriesFromWork
        onExploreImpact={handleImpactNavigation}
      />

      {/* 8. Our Impact Transition: Activities vs. Outcomes */}
      <OurImpactTransition
        onExploreImpact={handleImpactNavigation}
      />

      {/* 9. Final CTA: Help make the work possible */}
      <OurWorkFinalCTA
        onDonate={() => onNavigateToDonate('Where Needed Most')}
        onContact={() => {
          if (onOpenContact) {
            onOpenContact();
          } else {
            onNavigateToSection('contact');
          }
        }}
      />

    </div>
  );
};
