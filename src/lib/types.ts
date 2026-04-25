export type ACFUrl =
  | string
  | { title?: string; url: string; target?: string }
  | false
  | null;

export interface LinkItem {
  label: string;
  url: ACFUrl;
}

export interface TextItem {
  text: string;
}

export interface ProblemCard {
  icon: string | false;
  text: string;
}

export interface FeatureBullet {
  text: string;
}

export interface FeatureBlock {
  heading: string;
  description: string;
  bullets: FeatureBullet[] | false;
  closing_text: string;
  image: string | false;
  layout: 'image-right' | 'image-left';
}

export interface SocialLink {
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube';
  url: ACFUrl;
}

/* ---------- Global header / footer (custom REST endpoint) ---------- */

export interface NavDropdownItem {
  icon: string | false;
  title: string;
  description: string;
  url: string;
}

export interface NavLink {
  label: string;
  url: string;
  has_dropdown: boolean;
  dropdown_items: NavDropdownItem[] | false;
  textlabel: string;
  texturl: string;
}

export interface GlobalFooterLink {
  label: string;
  url: string;
}

export interface GlobalSocialLink {
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube';
  url: string;
}

export interface GlobalContent {
  nav_logo: string;
  nav_links: NavLink[];
  nav_cta_primary_label: string;
  nav_cta_primary_url: string;
  nav_cta_secondary_label: string;
  nav_cta_secondary_url: string;
  footer_address: string;
  footer_copyright: string;
  footer_links: GlobalFooterLink[];
  footer_social: GlobalSocialLink[];
}

export interface LandingPageACF {
  nav_logo: string | false;
  nav_links: LinkItem[] | false;
  nav_cta_primary_label: string;
  nav_cta_primary_url: ACFUrl;
  nav_cta_secondary_label: string;
  nav_cta_secondary_url: ACFUrl;

  hero_heading: string;
  hero_subheading: string;
  hero_email_placeholder: string;
  hero_cta_label: string;
  hero_cta_url: ACFUrl;
  hero_trust_badges: TextItem[] | false;
  hero_image: string | false;

  problem_heading: string;
  problem_description: string;
  problem_cards: ProblemCard[] | false;
  problem_closing: string;

  features_section_heading: string;
  features_section_subheading: string;
  feature_blocks: FeatureBlock[] | false;

  cta_heading: string;
  cta_description: string;
  cta_primary_label: string;
  cta_primary_url: ACFUrl;
  cta_secondary_label: string;
  cta_secondary_url: ACFUrl;
  cta_image: string | false;

  footer_address: string;
  footer_copyright: string;
  footer_links: LinkItem[] | false;
  footer_social: SocialLink[] | false;
}

export interface WPPage {
  id: number;
  slug: string;
  status: string;
  title: { rendered: string };
  page_template: string;
  acf: LandingPageACF;
}

export function getUrl(value: ACFUrl): string {
  if (!value) return '#';
  if (typeof value === 'string') return value || '#';
  if (typeof value === 'object' && 'url' in value) return value.url || '#';
  return '#';
}
