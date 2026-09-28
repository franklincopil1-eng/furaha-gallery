import React from 'react';
import { ElevatorPitchVideo } from './ElevatorPitchVideo';

interface WelcomeActionsProps {
  onOpenDonate: () => void;
  onOpenVolunteer: () => void;
  onOpenScholarship: () => void;
}

export const WelcomeActions: React.FC<WelcomeActionsProps> = ({
  onOpenDonate,
  onOpenVolunteer,
  onOpenScholarship,
}) => {
  return (
    <>
      {/* 
        ========================================================================================
        COMMENTED OUT: The 4-card action icon row (<ActionCards /> - Learn, Eat, Grow, Believe)
        is commented out directly above the story/impact content per user request.
        ========================================================================================
      */}
      {/*
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
        <a href="#story" id="action-card-story" className="featured-block cursor-pointer flex flex-col justify-center items-center">
          <img src="/images/heart.png" alt="Our Story @Furaha" className="w-20 h-20" />
          <h5 className="featured-block-text !text-[20px] !text-[#893d2d] font-semibold">Our Story @Furaha</h5>
        </a>
        <button onClick={onOpenScholarship} id="action-card-scholarship" className="featured-block cursor-pointer flex flex-col justify-center items-center">
          <img src="/images/scholarship1.png" alt="Scholarship Program" className="w-20 h-20" />
          <h5 className="featured-block-text !text-[20px] !text-[#893d2d] font-semibold">Scholarship Program</h5>
        </button>
        <button onClick={onOpenVolunteer} id="action-card-volunteer" className="featured-block cursor-pointer flex flex-col justify-center items-center">
          <img src="/images/hands1.png" alt="Become a volunteer" className="w-20 h-20" />
          <h5 className="featured-block-text !text-[20px] !text-[#893d2d] font-semibold">Become a volunteer</h5>
        </button>
        <button onClick={onOpenDonate} id="action-card-donate" className="featured-block cursor-pointer flex flex-col justify-center items-center">
          <img src="/images/receive1.png" alt="Give to Furaha" className="w-20 h-20" />
          <h5 className="featured-block-text !text-[20px] !text-[#893d2d] font-semibold">Give to Furaha</h5>
        </button>
      </div>
      */}

      {/* Embedded elevator pitch video replacing the 4-card action icon row */}
      <ElevatorPitchVideo
        onOpenDonate={onOpenDonate}
        onOpenVolunteer={onOpenVolunteer}
        onOpenScholarship={onOpenScholarship}
      />
    </>
  );
};

