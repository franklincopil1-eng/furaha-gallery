import React from 'react';

export const ImpactProof: React.FC = () => {
  const proofMoments = [
    {
      title: 'Classroom Admission & Learning',
      caption: 'Children seated in class with required syllabus exercise books, uniforms, and learning materials.',
      img: '/Education.webp',
    },
    {
      title: 'Nutritious Daily School Meals',
      caption: 'Providing hot meals to ensure students have the energy to concentrate and stay nourished.',
      img: '/Nutrition.webp',
    },
    {
      title: 'Uniforms & Dignity Support',
      caption: 'Essential supplies and tailored uniforms ensuring every child belongs and feels valued.',
      img: '/volunteer-helping-with-donation-box1.jpeg',
    },
  ];

  return (
    <section id="real-impact-section" className="py-10 sm:py-14 bg-white border-y border-[#f0e6dc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[#893d2d] text-xs font-bold uppercase tracking-wider block mb-1">
            Evidence of the Work
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#201a18] tracking-tight mb-1.5">
            See the difference we're making in Kenya.
          </h2>
          <p className="text-xs sm:text-sm text-[#59524e] font-medium">
            Real people. Real work. Real Kenya.
          </p>
        </div>

        {/* Documentary Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {proofMoments.map((moment, idx) => (
            <div
              key={idx}
              className="bg-[#faf8f5] rounded-2xl overflow-hidden border border-[#ebdcd0] flex flex-col justify-between shadow-2xs"
            >
              <div className="aspect-[16/10] overflow-hidden bg-stone-200">
                <img
                  src={moment.img}
                  alt={moment.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-4">
                <h3 className="text-sm font-bold text-[#201a18] mb-1">
                  {moment.title}
                </h3>
                <p className="text-xs text-[#59524e] leading-relaxed">
                  {moment.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
