import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

// Address validation schema
const addressSchema = Joi.object({
  city: Joi.string().optional(),
  country: Joi.string().length(2).optional(),
  line1: Joi.string().optional(),
  line2: Joi.string().optional(),
  postal_code: Joi.string().optional(),
  state: Joi.string().optional(),
});

// Date of birth validation schema
const dateOfBirthSchema = Joi.object({
  day: Joi.number().integer().min(1).max(31).required(),
  month: Joi.number().integer().min(1).max(12).required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
});

// Annual revenue validation schema
const annualRevenueSchema = Joi.object({
  amount: Joi.number().integer().min(0).required(),
  currency: Joi.string().length(3).lowercase().required(),
  fiscal_year_end: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
});

// Monthly estimated revenue validation schema
const monthlyEstimatedRevenueSchema = Joi.object({
  amount: Joi.number().integer().min(0).required(),
  currency: Joi.string().length(3).lowercase().required(),
});

// Business profile validation schema
const businessProfileSchema = Joi.object({
  annual_revenue: annualRevenueSchema.optional(),
  estimated_worker_count: Joi.number().integer().min(0).optional(),
  mcc: Joi.string().optional(),
  minority_owned_business_designation: Joi.array().items(
    Joi.string().valid(
      'lgbtqi_owned_business',
      'minority_owned_business',
      'none_of_these_apply',
      'prefer_not_to_answer',
      'women_owned_business'
    )
  ).optional(),
  monthly_estimated_revenue: monthlyEstimatedRevenueSchema.optional(),
  name: Joi.string().optional(),
  product_description: Joi.string().optional(),
  support_address: addressSchema.optional(),
  support_email: Joi.string().email().optional(),
  support_phone: Joi.string().optional(),
  support_url: Joi.string().uri().optional(),
  url: Joi.string().uri().optional(),
});

// Capability validation schema
const capabilitySchema = Joi.object({
  requested: Joi.boolean().optional(),
});

// Capabilities validation schema
const capabilitiesSchema = Joi.object({
  acss_debit_payments: capabilitySchema.optional(),
  affirm_payments: capabilitySchema.optional(),
  afterpay_clearpay_payments: capabilitySchema.optional(),
  alma_payments: capabilitySchema.optional(),
  amazon_pay_payments: capabilitySchema.optional(),
  au_becs_debit_payments: capabilitySchema.optional(),
  bacs_debit_payments: capabilitySchema.optional(),
  bancontact_payments: capabilitySchema.optional(),
  bank_transfer_payments: capabilitySchema.optional(),
  billie_payments: capabilitySchema.optional(),
  blik_payments: capabilitySchema.optional(),
  boleto_payments: capabilitySchema.optional(),
  card_issuing: capabilitySchema.optional(),
  card_payments: capabilitySchema.optional(),
  cartes_bancaires_payments: capabilitySchema.optional(),
  cashapp_payments: capabilitySchema.optional(),
  crypto_payments: capabilitySchema.optional(),
  eps_payments: capabilitySchema.optional(),
  fpx_payments: capabilitySchema.optional(),
  gb_bank_transfer_payments: capabilitySchema.optional(),
  giropay_payments: capabilitySchema.optional(),
  grabpay_payments: capabilitySchema.optional(),
  ideal_payments: capabilitySchema.optional(),
  india_international_payments: capabilitySchema.optional(),
  jcb_payments: capabilitySchema.optional(),
  jp_bank_transfer_payments: capabilitySchema.optional(),
  kakao_pay_payments: capabilitySchema.optional(),
  klarna_payments: capabilitySchema.optional(),
  konbini_payments: capabilitySchema.optional(),
  kr_card_payments: capabilitySchema.optional(),
  legacy_payments: capabilitySchema.optional(),
  link_payments: capabilitySchema.optional(),
  mobilepay_payments: capabilitySchema.optional(),
  multibanco_payments: capabilitySchema.optional(),
  mx_bank_transfer_payments: capabilitySchema.optional(),
  naver_pay_payments: capabilitySchema.optional(),
  nz_bank_account_becs_debit_payments: capabilitySchema.optional(),
  oxxo_payments: capabilitySchema.optional(),
  p24_payments: capabilitySchema.optional(),
  pay_by_bank_payments: capabilitySchema.optional(),
  payco_payments: capabilitySchema.optional(),
  paynow_payments: capabilitySchema.optional(),
  pix_payments: capabilitySchema.optional(),
  promptpay_payments: capabilitySchema.optional(),
  revolut_pay_payments: capabilitySchema.optional(),
  samsung_pay_payments: capabilitySchema.optional(),
  satispay_payments: capabilitySchema.optional(),
  sepa_bank_transfer_payments: capabilitySchema.optional(),
  sepa_debit_payments: capabilitySchema.optional(),
  sofort_payments: capabilitySchema.optional(),
  swish_payments: capabilitySchema.optional(),
  tax_reporting_us_1099_k: capabilitySchema.optional(),
  tax_reporting_us_1099_misc: capabilitySchema.optional(),
  transfers: capabilitySchema.optional(),
  twint_payments: capabilitySchema.optional(),
  us_bank_account_ach_payments: capabilitySchema.optional(),
  us_bank_transfer_payments: capabilitySchema.optional(),
  zip_payments: capabilitySchema.optional(),
});

// Company validation schema
const companySchema = Joi.object({
  address: addressSchema.optional(),
  address_kana: addressSchema.optional(),
  address_kanji: addressSchema.optional(),
  directors_provided: Joi.boolean().optional(),
  directorship_declaration: Joi.object({
    date: Joi.number().integer().optional(),
    ip: Joi.string().ip().optional(),
    user_agent: Joi.string().optional(),
  }).optional(),
  executives_provided: Joi.boolean().optional(),
  export_license_id: Joi.string().optional(),
  export_purpose_code: Joi.string().optional(),
  name: Joi.string().optional(),
  name_kana: Joi.string().optional(),
  name_kanji: Joi.string().optional(),
  owners_provided: Joi.boolean().optional(),
  ownership_declaration: Joi.object({
    date: Joi.number().integer().optional(),
    ip: Joi.string().ip().optional(),
    user_agent: Joi.string().optional(),
  }).optional(),
  ownership_exemption_reason: Joi.string().optional(),
  phone: Joi.string().optional(),
  registration_date: Joi.object({
    day: Joi.number().integer().min(1).max(31).required(),
    month: Joi.number().integer().min(1).max(12).required(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
  }).optional(),
  registration_number: Joi.string().optional(),
  structure: Joi.string().optional(),
  tax_id: Joi.string().optional(),
  tax_id_registrar: Joi.string().optional(),
  vat_id: Joi.string().optional(),
  verification: Joi.object({
    document: Joi.object({
      back: Joi.string().optional(),
      front: Joi.string().optional(),
    }).optional(),
  }).optional(),
});

// Controller validation schema
const controllerSchema = Joi.object({
  fees: Joi.object({
    payer: Joi.string().valid('account', 'application').optional(),
  }).optional(),
  losses: Joi.object({
    payments: Joi.string().valid('application', 'stripe').optional(),
  }).optional(),
  requirement_collection: Joi.string().valid('application', 'stripe').optional(),
  stripe_dashboard: Joi.object({
    type: Joi.string().valid('express', 'full', 'none').optional(),
  }).optional(),
});

// Documents validation schema
const documentsSchema = Joi.object({
  bank_account_ownership_verification: Joi.object({
    files: Joi.array().items(Joi.string()).optional(),
  }).optional(),
  company_license: Joi.object({
    files: Joi.array().items(Joi.string()).optional(),
  }).optional(),
  company_memorandum_of_association: Joi.object({
    files: Joi.array().items(Joi.string()).optional(),
  }).optional(),
  company_ministerial_decree: Joi.object({
    files: Joi.array().items(Joi.string()).optional(),
  }).optional(),
  company_registration_verification: Joi.object({
    files: Joi.array().items(Joi.string()).optional(),
  }).optional(),
  company_tax_id_verification: Joi.object({
    files: Joi.array().items(Joi.string()).optional(),
  }).optional(),
  proof_of_address: Joi.object({
    files: Joi.array().items(Joi.string()).optional(),
  }).optional(),
  proof_of_registration: Joi.object({
    files: Joi.array().items(Joi.string()).optional(),
  }).optional(),
  proof_of_ultimate_beneficial_ownership: Joi.object({
    files: Joi.array().items(Joi.string()).optional(),
  }).optional(),
});

// Individual validation schema
const individualSchema = Joi.object({
  address: addressSchema.optional(),
  address_kana: addressSchema.optional(),
  address_kanji: addressSchema.optional(),
  dob: dateOfBirthSchema.optional(),
  email: Joi.string().email().optional(),
  first_name: Joi.string().optional(),
  first_name_kana: Joi.string().optional(),
  first_name_kanji: Joi.string().optional(),
  full_name_aliases: Joi.array().items(Joi.string()).optional(),
  gender: Joi.string().optional(),
  id_number: Joi.string().optional(),
  id_number_secondary: Joi.string().optional(),
  last_name: Joi.string().optional(),
  last_name_kana: Joi.string().optional(),
  last_name_kanji: Joi.string().optional(),
  maiden_name: Joi.string().optional(),
  metadata: Joi.object().pattern(Joi.string(), Joi.string()).optional(),
  phone: Joi.string().optional(),
  political_exposure: Joi.string().valid('existing', 'none').optional(),
  registered_address: addressSchema.optional(),
  relationship: Joi.object({
    director: Joi.boolean().optional(),
    executive: Joi.boolean().optional(),
    owner: Joi.boolean().optional(),
    percent_ownership: Joi.number().min(0).max(100).optional(),
    title: Joi.string().optional(),
  }).optional(),
  ssn_last_4: Joi.string().length(4).pattern(/^\d{4}$/).optional(),
  verification: Joi.object({
    additional_document: Joi.object({
      back: Joi.string().optional(),
      front: Joi.string().optional(),
    }).optional(),
    document: Joi.object({
      back: Joi.string().optional(),
      front: Joi.string().optional(),
    }).optional(),
  }).optional(),
});

// Groups validation schema
const groupsSchema = Joi.object({
  payments_pricing: Joi.string().optional(),
});

// Settings validation schema
const settingsSchema = Joi.object({
  bacs_debit_payments: Joi.object({
    display_name: Joi.string().optional(),
  }).optional(),
  branding: Joi.object({
    icon: Joi.string().optional(),
    logo: Joi.string().optional(),
    primary_color: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).optional(),
    secondary_color: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).optional(),
  }).optional(),
  card_issuing: Joi.object({
    tos_acceptance: Joi.object({
      date: Joi.number().integer().optional(),
      ip: Joi.string().ip().optional(),
      user_agent: Joi.string().optional(),
    }).optional(),
  }).optional(),
  card_payments: Joi.object({
    decline_on: Joi.object({
      avs_failure: Joi.boolean().optional(),
      cvc_failure: Joi.boolean().optional(),
    }).optional(),
    statement_descriptor_prefix: Joi.string().optional(),
    statement_descriptor_prefix_kanji: Joi.string().optional(),
    statement_descriptor_prefix_kana: Joi.string().optional(),
  }).optional(),
  invoices: Joi.object({
    hosted_payment_method_save: Joi.string().valid('always', 'never', 'offer').optional(),
  }).optional(),
  payments: Joi.object({
    statement_descriptor: Joi.string().optional(),
    statement_descriptor_kana: Joi.string().optional(),
    statement_descriptor_kanji: Joi.string().optional(),
    statement_descriptor_prefix: Joi.string().optional(),
    statement_descriptor_prefix_kana: Joi.string().optional(),
    statement_descriptor_prefix_kanji: Joi.string().optional(),
  }).optional(),
  payouts: Joi.object({
    debit_negative_balances: Joi.boolean().optional(),
    schedule: Joi.object({
      delay_days: Joi.alternatives().try(Joi.string(), Joi.number().integer().min(0)).optional(),
      interval: Joi.string().valid('daily', 'manual', 'weekly', 'monthly').optional(),
      monthly_anchor: Joi.number().integer().min(1).max(31).optional(),
      monthly_payout_days: Joi.array().items(Joi.number().integer().min(1).max(31)).optional(),
      weekly_anchor: Joi.string().optional(),
      weekly_payout_days: Joi.array().items(
        Joi.string().valid('friday', 'monday', 'thursday', 'tuesday', 'wednesday')
      ).optional(),
    }).optional(),
    statement_descriptor: Joi.string().optional(),
  }).optional(),
  sepa_debit_payments: Joi.object({}).optional(),
});

// TOS acceptance validation schema
const tosAcceptanceSchema = Joi.object({
  date: Joi.number().integer().optional(),
  ip: Joi.string().ip().optional(),
  service_agreement: Joi.string().optional(),
  user_agent: Joi.string().optional(),
});

// Main account creation validation schema
export const createAccountSchema = Joi.object({
  account_token: Joi.string().optional(),
  business_profile: businessProfileSchema.optional(),
  business_type: Joi.string().valid('company', 'government_entity', 'individual', 'non_profit').optional(),
  capabilities: capabilitiesSchema.optional(),
  company: companySchema.optional(),
  controller: controllerSchema.optional(),
  country: Joi.string().length(2).optional(),
  default_currency: Joi.string().length(3).lowercase().optional(),
  documents: documentsSchema.optional(),
  email: Joi.string().email().optional(),
  external_account: Joi.string().optional(),
  groups: groupsSchema.optional(),
  individual: individualSchema.optional(),
  metadata: Joi.object().pattern(Joi.string(), Joi.string()).optional(),
  settings: settingsSchema.optional(),
  tos_acceptance: tosAcceptanceSchema.optional(),
  type: Joi.string().valid('custom', 'express', 'standard').optional(),
});

// Validation middleware
export const validateCreateAccount = (req: Request, res: Response, next: NextFunction): void => {
  const { error, value } = createAccountSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({
      success: false,
      error: {
        type: 'validation_error',
        message: 'Validation failed',
        details: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message,
        })),
      },
    });
    return;
  }

  req.body = value;
  next();
};
