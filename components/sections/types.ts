import { WebsiteSection, NormalizedBusiness, ThemeConfig } from '@/lib/types';

export interface SectionComponentProps {
  section: WebsiteSection;
  business: NormalizedBusiness;
  theme: ThemeConfig;
  onOpenLeadModal?: (service?: string) => void;
  onOpenFeedbackModal?: () => void;
}
