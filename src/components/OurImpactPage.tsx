import React, { useState, useEffect } from 'react';
import { OurImpactHero } from './our-impact/OurImpactHero';
import { ImpactAtAGlance } from './our-impact/ImpactAtAGlance';
import { FieldJournalVideoExperience } from './our-impact/FieldJournalVideoExperience';
import { VisualFieldJournal } from './our-impact/VisualFieldJournal';
import { FollowOneGift } from './our-impact/FollowOneGift';
import { ImpactStories } from './our-impact/ImpactStories';
import { RealPlaces } from './our-impact/RealPlaces';
import { ImpactByArea } from './our-impact/ImpactByArea';
import { PhotoVideoGallery } from './our-impact/PhotoVideoGallery';
import { TransparencySection } from './our-impact/TransparencySection';
import { AccountabilitySection } from './our-impact/AccountabilitySection';
import { OurImpactFinalCTA } from './our-impact/OurImpactFinalCTA';
import { StoryModal, FieldStory } from './our-impact/StoryModal';

interface OurImpactPageProps {
  onNavigateToDonate: (cause?: string) => void;
  onNavigateToWhoWeServe: () => void;
  onNavigateToOurWork: () => void;
  onNavigateToHome: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const OurImpactPage: React.FC<OurImpactPageProps> = ({
  onNavigateToDonate,
  onNavigateToWhoWeServe,
  onNavigateToOurWork,
  onNavigateToHome,
  onNavigateToSection,
}) => {
  const [selectedStory, setSelectedStory] = useState<FieldStory | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'Our Impact in Kenya | Furaha Ministries';
  }, []);

  const handleScrollToFieldJournal = () => {
    const el = document.getElementById('field-journal');
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#201a18] flex flex-col font-sans selection:bg-[#893d2d] selection:text-white relative overflow-hidden">
      {/* 1. Hero: See where the work becomes real */}
      <OurImpactHero
        onNavigateToHome={onNavigateToHome}
        onExploreLatestClick={handleScrollToFieldJournal}
        onGiveClick={() => onNavigateToDonate('Where Needed Most')}
      />

      {/* 2. Impact at a Glance: Grounded, Verified Metrics/Truth Dashboard */}
      <ImpactAtAGlance />

      {/* 3. One Minute in the Field: Cinematic Multi-Window Documentary Experience */}
      <FieldJournalVideoExperience />

      {/* 4. The Visual Field Journal: Editorial updates from the field */}
      <VisualFieldJournal
        onSelectStory={(story) => setSelectedStory(story)}
      />

      {/* 4. “Follow One Gift” Visual Story: From a need to a response */}
      <FollowOneGift />

      {/* 5. Impact Stories: Real human stories with Before -> Support -> After */}
      <ImpactStories
        onNavigateToDonate={onNavigateToDonate}
      />

      {/* 6. Real Places: Amani, West Hill */}
      <RealPlaces
        onNavigateToWhoWeServe={onNavigateToWhoWeServe}
      />

      {/* 7. Impact by Area: Filterable living archive (Education, Nutrition, Care, Faith) */}
      <ImpactByArea
        onSelectStory={(story) => setSelectedStory(story)}
      />

      {/* 8. Photo + Video Experience: Authentic media wall & lightbox */}
      <PhotoVideoGallery />

      {/* 9. Transparency: What your support helps make possible */}
      <TransparencySection />

      {/* 10. Accountability: We believe you should be able to see the work */}
      <AccountabilitySection />

      {/* 11. Final Emotional Transition: The story is still being written */}
      <OurImpactFinalCTA
        onDonate={() => onNavigateToDonate('Where Needed Most')}
        onWhoWeServe={onNavigateToWhoWeServe}
      />

      {/* Interactive Detail Story Modal */}
      <StoryModal
        story={selectedStory}
        isOpen={!!selectedStory}
        onClose={() => setSelectedStory(null)}
        onDonate={onNavigateToDonate}
      />

    </div>
  );
};
