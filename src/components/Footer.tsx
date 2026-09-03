import React from 'react';
import { Mail, Shield, Heart, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';
import { FurahaLogo } from './FurahaLogo';
import { NewsletterSubscribe } from './NewsletterSubscribe';

interface FooterProps {
  onOpenVolunteer: () => void;
  onOpenPartner: () => void;
  onOpenDonate?: () => void;
  onOpenTechStack?: () => void;
  onNavigateToWhoWeServe?: () => void;
  onNavigateToOurWork?: () => void;
  onNavigateToOurImpact?: () => void;
  onNavigateToGallery?: () => void;
  onNavigateToSection?: (sectionId: string) => void;
  onNavigateToHome?: () => void;
}

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/meetfuraha/',
    icon: Instagram,
    label: 'Follow Furaha on Instagram',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/meetfuraha/',
    icon: Facebook,
    label: 'Connect with Furaha on Facebook',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@meetfuraha',
    icon: Youtube,
    label: 'Watch Furaha updates on YouTube',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/furaha-ministries/',
    icon: Linkedin,
    label: 'Follow Furaha Ministries on LinkedIn',
  },
];

export const Footer: React.FC<FooterProps> = ({
  onOpenVolunteer,
  onOpenPartner,
  onOpenDonate,
  onOpenTechStack,
  onNavigateToWhoWeServe,
  onNavigateToOurWork,
  onNavigateToOurImpact,
  onNavigateToGallery,
  onNavigateToSection,
  onNavigateToHome,
}) => {
  const handleLinkClick = (sectionId: string) => {
    if (onNavigateToSection) {
      onNavigateToSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        const topOffset = 110;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - topOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <footer id="footer" className="w-full">
      {/* 1. Main Footer Section in Exact #EF802E (site-footer) */}
      <div className="site-footer w-full px-4 sm:px-8 pt-8 sm:pt-10">
        <div className="max-w-7xl mx-auto">
          {/* Newsletter Subscription Component */}
          <div className="mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-white/20">
            <NewsletterSubscribe variant="footer" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 lg:gap-12 items-start pb-6">
            {/* Column 1: Logo & brand */}
          <div className="md:col-span-4 flex flex-col items-start">
            <FurahaLogo variant="white" size="sm" showText={true} />
            <div className="mt-3">
              <p className="text-white/85 text-xs sm:text-[13px] leading-relaxed max-w-xs font-normal">
                Faith in Action. Hope in Every Life. Reaching overlooked children across Africa with holistic care.
              </p>
              {onOpenDonate && (
                <button
                  onClick={onOpenDonate}
                  className="mt-3.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#893d2d] font-bold text-xs shadow-xs hover:bg-[#faedd0] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-[#893d2d]" />
                  <span>Donate to Furaha</span>
                </button>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-4">
            <h5
              id="footer-quick-links-title"
              className="text-xs font-bold uppercase tracking-wider text-white/95 mb-3.5"
            >
              Quick Links
            </h5>

            <ul className="footer-menu space-y-1.5">
              <li>
                <button
                  onClick={() => handleLinkClick('story')}
                  id="footer-link-story"
                  className="footer-menu-link text-left cursor-pointer text-xs sm:text-[13px]"
                >
                  Our Story
                </button>
              </li>
              {onNavigateToWhoWeServe && (
                <li>
                  <button
                    onClick={onNavigateToWhoWeServe}
                    id="footer-link-who-we-serve"
                    className="footer-menu-link text-left cursor-pointer text-xs sm:text-[13px]"
                  >
                    Who We Serve (Kenya)
                  </button>
                </li>
              )}
              {onNavigateToOurWork && (
                <li>
                  <button
                    onClick={onNavigateToOurWork}
                    id="footer-link-our-work"
                    className="footer-menu-link text-left cursor-pointer text-xs sm:text-[13px]"
                  >
                    Our Work (Kenya)
                  </button>
                </li>
              )}
              {onNavigateToOurImpact && (
                <li>
                  <button
                    onClick={onNavigateToOurImpact}
                    id="footer-link-our-impact"
                    className="footer-menu-link text-left cursor-pointer text-xs sm:text-[13px]"
                  >
                    Our Impact (Kenya)
                  </button>
                </li>
              )}
              {onNavigateToGallery && (
                <li>
                  <button
                    onClick={onNavigateToGallery}
                    id="footer-link-gallery"
                    className="footer-menu-link text-left cursor-pointer text-xs sm:text-[13px]"
                  >
                    Media Gallery (Kenya)
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={onOpenVolunteer}
                  id="footer-link-volunteer"
                  className="footer-menu-link text-left cursor-pointer text-xs sm:text-[13px]"
                >
                  Become a volunteer
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('causes')}
                  id="footer-link-causes"
                  className="footer-menu-link text-left cursor-pointer text-xs sm:text-[13px]"
                >
                  Causes
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPartner}
                  id="footer-link-partner"
                  className="footer-menu-link text-left cursor-pointer text-xs sm:text-[13px]"
                >
                  Partner with us
                </button>
              </li>
              {onOpenDonate && (
                <li>
                  <button
                    onClick={onOpenDonate}
                    id="footer-link-donate"
                    className="footer-menu-link text-left cursor-pointer text-xs sm:text-[13px] font-semibold text-white underline underline-offset-4"
                  >
                    Give & Tangible Sponsorship Tiers
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Contact & Social Media */}
          <div className="md:col-span-4 flex flex-col justify-between h-full">
            <div>
              <h5
                id="footer-contact-info-title"
                className="text-xs font-bold uppercase tracking-wider text-white/95 mb-3.5"
              >
                Contact Information
              </h5>

              <a
                href="mailto:info@meetfuraha.org"
                className="inline-flex items-center gap-2 text-white/95 hover:text-white transition-colors text-xs sm:text-[13px] font-medium group"
              >
                <Mail className="w-3.5 h-3.5 text-white/90 shrink-0 group-hover:scale-110 transition-transform" />
                <span>info@meetfuraha.org</span>
              </a>

              <p className="text-white/80 text-xs sm:text-[13px] mt-2 leading-relaxed font-normal">
                Kenya, East Africa • Global Partner Network
              </p>
            </div>

            {/* Social Media Links Section */}
            <div className="mt-5 pt-4 border-t border-white/15">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/90 block mb-2.5">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={social.label}
                      id={`footer-social-${social.name.toLowerCase()}`}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#893d2d] border border-white/20 hover:border-white flex items-center justify-center transition-all duration-200 ease-in-out hover:scale-110 hover:shadow-md active:scale-95 group cursor-pointer"
                    >
                      <Icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-105" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Site Footer Bottom Bar in Exact #893d2d */}
        <div className="site-footer-bottom -mx-4 sm:-mx-8 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p id="footer-copyright" className="copyright-text mb-0 text-xs text-white/80">
              Copyright © 2025 Furaha Ministries Charity Org.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 text-xs text-white/80">
              {onOpenTechStack && (
                <button
                  onClick={onOpenTechStack}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Shield className="w-3 h-3 text-white/80" />
                  <span>Platform & Trust</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
