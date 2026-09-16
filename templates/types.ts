import { NormalizedBusiness, GeneratedContent } from '@/lib/types';

export interface TemplateProps {
  business: NormalizedBusiness;
  content: GeneratedContent;
  onOpenLeadModal?: (defaultService?: string) => void;
  onOpenFeedbackModal?: () => void;
}
