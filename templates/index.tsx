import React from 'react';
import { TemplateProps } from './types';

// Handyman Templates
import TemplateH1_LocalPro from './handyman/H1_LocalPro';
import TemplateH2_ProjectFocused from './handyman/H2_ProjectFocused';
import TemplateH3_FastLocalService from './handyman/H3_FastLocalService';
import TemplateH4_PremiumHomeImprovement from './handyman/H4_PremiumHomeImprovement';
import TemplateH5_TrustFirst from './handyman/H5_TrustFirst';

// Cleaning Templates
import TemplateC1_ProfessionalCleaning from './cleaning/C1_ProfessionalCleaning';
import TemplateC2_HouseCleaning from './cleaning/C2_HouseCleaning';
import TemplateC3_CommercialCleaning from './cleaning/C3_CommercialCleaning';
import TemplateC4_PremiumCleaning from './cleaning/C4_PremiumCleaning';
import TemplateC5_SimpleLocalCleaner from './cleaning/C5_SimpleLocalCleaner';

// Restaurant Templates
import TemplateR1_ModernRestaurant from './restaurant/R1_ModernRestaurant';
import TemplateR2_CasualLocalRestaurant from './restaurant/R2_CasualLocalRestaurant';
import TemplateR3_PremiumDining from './restaurant/R3_PremiumDining';
import TemplateR4_TakeoutFastCasual from './restaurant/R4_TakeoutFastCasual';
import TemplateR5_FoodCommunity from './restaurant/R5_FoodCommunity';

export const TEMPLATE_COMPONENTS: Record<string, React.ComponentType<TemplateProps>> = {
  H1: TemplateH1_LocalPro,
  H2: TemplateH2_ProjectFocused,
  H3: TemplateH3_FastLocalService,
  H4: TemplateH4_PremiumHomeImprovement,
  H5: TemplateH5_TrustFirst,

  C1: TemplateC1_ProfessionalCleaning,
  C2: TemplateC2_HouseCleaning,
  C3: TemplateC3_CommercialCleaning,
  C4: TemplateC4_PremiumCleaning,
  C5: TemplateC5_SimpleLocalCleaner,

  R1: TemplateR1_ModernRestaurant,
  R2: TemplateR2_CasualLocalRestaurant,
  R3: TemplateR3_PremiumDining,
  R4: TemplateR4_TakeoutFastCasual,
  R5: TemplateR5_FoodCommunity,
};

export function renderTemplate(templateId: string, props: TemplateProps) {
  const Component = TEMPLATE_COMPONENTS[templateId] || TEMPLATE_COMPONENTS['H1'];
  return <Component {...props} />;
}
