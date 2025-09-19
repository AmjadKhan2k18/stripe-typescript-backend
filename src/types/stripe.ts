// Stripe Account Creation Types
// Based on Stripe API documentation for account creation

export interface Address {
  city?: string;
  country?: string;
  line1?: string;
  line2?: string;
  postal_code?: string;
  state?: string;
}

export interface AddressKana {
  city?: string;
  country?: string;
  line1?: string;
  line2?: string;
  postal_code?: string;
  state?: string;
  town?: string;
}

export interface AddressKanji {
  city?: string;
  country?: string;
  line1?: string;
  line2?: string;
  postal_code?: string;
  state?: string;
  town?: string;
}

export interface DateOfBirth {
  day: number;
  month: number;
  year: number;
}

export interface RegistrationDate {
  day: number;
  month: number;
  year: number;
}

export interface AnnualRevenue {
  amount: number;
  currency: string;
  fiscal_year_end: string;
}

export interface MonthlyEstimatedRevenue {
  amount: number;
  currency: string;
}

export interface BusinessProfile {
  annual_revenue?: AnnualRevenue;
  estimated_worker_count?: number;
  mcc?: string;
  minority_owned_business_designation?: Array<
    | 'lgbtqi_owned_business'
    | 'minority_owned_business'
    | 'none_of_these_apply'
    | 'prefer_not_to_answer'
    | 'women_owned_business'
  >;
  monthly_estimated_revenue?: MonthlyEstimatedRevenue;
  name?: string;
  product_description?: string;
  support_address?: Address;
  support_email?: string;
  support_phone?: string;
  support_url?: string;
  url?: string;
}

export interface Capability {
  requested?: boolean;
}

export interface Capabilities {
  acss_debit_payments?: Capability;
  affirm_payments?: Capability;
  afterpay_clearpay_payments?: Capability;
  alma_payments?: Capability;
  amazon_pay_payments?: Capability;
  au_becs_debit_payments?: Capability;
  bacs_debit_payments?: Capability;
  bancontact_payments?: Capability;
  bank_transfer_payments?: Capability;
  billie_payments?: Capability;
  blik_payments?: Capability;
  boleto_payments?: Capability;
  card_issuing?: Capability;
  card_payments?: Capability;
  cartes_bancaires_payments?: Capability;
  cashapp_payments?: Capability;
  crypto_payments?: Capability;
  eps_payments?: Capability;
  fpx_payments?: Capability;
  gb_bank_transfer_payments?: Capability;
  giropay_payments?: Capability;
  grabpay_payments?: Capability;
  ideal_payments?: Capability;
  india_international_payments?: Capability;
  jcb_payments?: Capability;
  jp_bank_transfer_payments?: Capability;
  kakao_pay_payments?: Capability;
  klarna_payments?: Capability;
  konbini_payments?: Capability;
  kr_card_payments?: Capability;
  legacy_payments?: Capability;
  link_payments?: Capability;
  mobilepay_payments?: Capability;
  multibanco_payments?: Capability;
  mx_bank_transfer_payments?: Capability;
  naver_pay_payments?: Capability;
  nz_bank_account_becs_debit_payments?: Capability;
  oxxo_payments?: Capability;
  p24_payments?: Capability;
  pay_by_bank_payments?: Capability;
  payco_payments?: Capability;
  paynow_payments?: Capability;
  pix_payments?: Capability;
  promptpay_payments?: Capability;
  revolut_pay_payments?: Capability;
  samsung_pay_payments?: Capability;
  satispay_payments?: Capability;
  sepa_bank_transfer_payments?: Capability;
  sepa_debit_payments?: Capability;
  sofort_payments?: Capability;
  swish_payments?: Capability;
  tax_reporting_us_1099_k?: Capability;
  tax_reporting_us_1099_misc?: Capability;
  transfers?: Capability;
  twint_payments?: Capability;
  us_bank_account_ach_payments?: Capability;
  us_bank_transfer_payments?: Capability;
  zip_payments?: Capability;
}

export interface DirectorshipDeclaration {
  date?: number;
  ip?: string;
  user_agent?: string;
}

export interface OwnershipDeclaration {
  date?: number;
  ip?: string;
  user_agent?: string;
}

export interface VerificationDocument {
  back?: string;
  front?: string;
}

export interface CompanyVerification {
  document?: VerificationDocument;
}

export interface Company {
  address?: Address;
  address_kana?: AddressKana;
  address_kanji?: AddressKanji;
  directors_provided?: boolean;
  directorship_declaration?: DirectorshipDeclaration;
  executives_provided?: boolean;
  export_license_id?: string;
  export_purpose_code?: string;
  name?: string;
  name_kana?: string;
  name_kanji?: string;
  owners_provided?: boolean;
  ownership_declaration?: OwnershipDeclaration;
  ownership_exemption_reason?: string;
  phone?: string;
  registration_date?: RegistrationDate;
  registration_number?: string;
  structure?: string;
  tax_id?: string;
  tax_id_registrar?: string;
  vat_id?: string;
  verification?: CompanyVerification;
}

export interface ControllerFees {
  payer?: 'account' | 'application';
}

export interface ControllerLosses {
  payments?: 'application' | 'stripe';
}

export interface ControllerStripeDashboard {
  type?: 'express' | 'full' | 'none';
}

export interface Controller {
  fees?: ControllerFees;
  losses?: ControllerLosses;
  requirement_collection?: 'application' | 'stripe';
  stripe_dashboard?: ControllerStripeDashboard;
}

export interface DocumentFiles {
  files?: string[];
}

export interface Documents {
  bank_account_ownership_verification?: DocumentFiles;
  company_license?: DocumentFiles;
  company_memorandum_of_association?: DocumentFiles;
  company_ministerial_decree?: DocumentFiles;
  company_registration_verification?: DocumentFiles;
  company_tax_id_verification?: DocumentFiles;
  proof_of_address?: DocumentFiles;
  proof_of_registration?: DocumentFiles;
  proof_of_ultimate_beneficial_ownership?: DocumentFiles;
}

export interface IndividualVerification {
  additional_document?: VerificationDocument;
  document?: VerificationDocument;
}

export interface IndividualRelationship {
  director?: boolean;
  executive?: boolean;
  owner?: boolean;
  percent_ownership?: number;
  title?: string;
}

export interface Individual {
  address?: Address;
  address_kana?: AddressKana;
  address_kanji?: AddressKanji;
  dob?: DateOfBirth;
  email?: string;
  first_name?: string;
  first_name_kana?: string;
  first_name_kanji?: string;
  full_name_aliases?: string[];
  gender?: string;
  id_number?: string;
  id_number_secondary?: string;
  last_name?: string;
  last_name_kana?: string;
  last_name_kanji?: string;
  maiden_name?: string;
  metadata?: Record<string, string>;
  phone?: string;
  political_exposure?: 'existing' | 'none';
  registered_address?: Address;
  relationship?: IndividualRelationship;
  ssn_last_4?: string;
  verification?: IndividualVerification;
}

export interface Groups {
  payments_pricing?: string;
}

export interface BacsDebitPayments {
  display_name?: string;
}

export interface Branding {
  icon?: string;
  logo?: string;
  primary_color?: string;
  secondary_color?: string;
}

export interface CardIssuingTosAcceptance {
  date?: number;
  ip?: string;
  user_agent?: string;
}

export interface CardIssuing {
  tos_acceptance?: CardIssuingTosAcceptance;
}

export interface DeclineOn {
  avs_failure?: boolean;
  cvc_failure?: boolean;
}

export interface CardPayments {
  decline_on?: DeclineOn;
  statement_descriptor_prefix?: string;
  statement_descriptor_prefix_kanji?: string;
  statement_descriptor_prefix_kana?: string;
}

export interface Invoices {
  hosted_payment_method_save?: 'always' | 'never' | 'offer';
}

export interface Payments {
  statement_descriptor?: string;
  statement_descriptor_kana?: string;
  statement_descriptor_kanji?: string;
  statement_descriptor_prefix?: string;
  statement_descriptor_prefix_kana?: string;
  statement_descriptor_prefix_kanji?: string;
}

export interface PayoutSchedule {
  delay_days?: string | number;
  interval?: 'daily' | 'manual' | 'weekly' | 'monthly';
  monthly_anchor?: number;
  monthly_payout_days?: number[];
  weekly_anchor?: string;
  weekly_payout_days?: Array<'friday' | 'monday' | 'thursday' | 'tuesday' | 'wednesday'>;
}

export interface Payouts {
  debit_negative_balances?: boolean;
  schedule?: PayoutSchedule;
  statement_descriptor?: string;
}

export interface SepaDebitPayments {
  // Empty object for now
}

export interface Settings {
  bacs_debit_payments?: BacsDebitPayments;
  branding?: Branding;
  card_issuing?: CardIssuing;
  card_payments?: CardPayments;
  invoices?: Invoices;
  payments?: Payments;
  payouts?: Payouts;
  sepa_debit_payments?: SepaDebitPayments;
}

export interface TosAcceptance {
  date?: number;
  ip?: string;
  service_agreement?: string;
  user_agent?: string;
}

export interface CreateAccountRequest {
  account_token?: string;
  business_profile?: BusinessProfile;
  business_type?: 'company' | 'government_entity' | 'individual' | 'non_profit';
  capabilities?: Capabilities;
  company?: Company;
  controller?: Controller;
  country?: string;
  default_currency?: string;
  documents?: Documents;
  email?: string;
  external_account?: string;
  groups?: Groups;
  individual?: Individual;
  metadata?: Record<string, string>;
  settings?: Settings;
  tos_acceptance?: TosAcceptance;
  type?: 'custom' | 'express' | 'standard';
}

export interface CreateAccountResponse {
  id: string;
  object: string;
  business_profile: BusinessProfile;
  business_type: string | null;
  capabilities: Record<string, any>;
  charges_enabled: boolean;
  controller: Controller;
  country: string;
  created: number;
  default_currency: string;
  details_submitted: boolean;
  email: string;
  external_accounts: {
    object: string;
    data: any[];
    has_more: boolean;
    total_count: number;
    url: string;
  };
  future_requirements: {
    alternatives: any[];
    current_deadline: string | null;
    currently_due: string[];
    disabled_reason: string | null;
    errors: any[];
    eventually_due: string[];
    past_due: string[];
    pending_verification: any[];
  };
  login_links: {
    object: string;
    total_count: number;
    has_more: boolean;
    url: string;
    data: any[];
  };
  metadata: Record<string, string>;
  payouts_enabled: boolean;
  requirements: {
    alternatives: any[];
    current_deadline: string | null;
    currently_due: string[];
    disabled_reason: string | null;
    errors: any[];
    eventually_due: string[];
    past_due: string[];
    pending_verification: any[];
  };
  settings: Settings;
  tos_acceptance: TosAcceptance;
  type: string;
}

export interface ApiError {
  error: {
    type: string;
    code?: string;
    message: string;
    param?: string;
    decline_code?: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

// Payment Intent Types
export interface CreatePaymentIntentRequest {
  amount: number;
  currency: string;
  customer_id?: string;
  description?: string;
  metadata?: Record<string, string>;
}

export interface PaymentIntentResponse {
  id: string;
  object: string;
  amount: number;
  amount_capturable: number;
  amount_details?: {
    tip?: {
      amount?: number;
    };
  };
  amount_received: number;
  application?: string;
  application_fee_amount?: number;
  automatic_payment_methods?: {
    enabled: boolean;
    allow_redirects?: string;
  };
  canceled_at?: number;
  cancellation_reason?: string;
  capture_method: string;
  charges: {
    object: string;
    data: any[];
    has_more: boolean;
    total_count: number;
    url: string;
  };
  client_secret: string;
  confirmation_method: string;
  created: number;
  currency: string;
  customer?: string;
  description?: string;
  invoice?: string;
  last_payment_error?: any;
  latest_charge?: string;
  livemode: boolean;
  metadata: Record<string, string>;
  next_action?: any;
  on_behalf_of?: string;
  payment_method?: string;
  payment_method_options?: any;
  payment_method_types: string[];
  processing?: any;
  receipt_email?: string;
  review?: string;
  setup_future_usage?: string;
  shipping?: any;
  source?: string;
  statement_descriptor?: string;
  statement_descriptor_suffix?: string;
  status: string;
  transfer_data?: any;
  transfer_group?: string;
}

// Customer Types
export interface CreateCustomerRequest {
  email?: string;
  name?: string;
  phone?: string;
  metadata?: Record<string, string>;
}

export interface CustomerResponse {
  id: string;
  object: string;
  address?: any;
  balance?: number;
  created: number;
  currency?: string;
  default_source?: string;
  delinquent?: boolean;
  description?: string;
  discount?: any;
  email?: string;
  invoice_prefix?: string;
  invoice_settings?: any;
  livemode: boolean;
  metadata: Record<string, string>;
  name?: string;
  next_invoice_sequence?: number;
  phone?: string;
  preferred_locales?: string[];
  shipping?: any;
  tax_exempt?: string;
  test_clock?: string;
}

// Payment Method Types
export interface PaymentMethodResponse {
  id: string;
  object: string;
  billing_details: {
    address?: any;
    email?: string;
    name?: string;
    phone?: string;
  };
  card?: {
    brand: string;
    checks?: any;
    country?: string;
    exp_month: number;
    exp_year: number;
    fingerprint?: string;
    funding?: string;
    generated_from?: any;
    last4: string;
    networks?: any;
    three_d_secure_usage?: any;
    wallet?: any;
  };
  created: number;
  customer?: string;
  livemode: boolean;
  metadata: Record<string, string>;
  type: string;
}

// Ephemeral Key Types
export interface CreateEphemeralKeyRequest {
  customer_id: string;
}

export interface EphemeralKeyResponse {
  id: string;
  object: string;
  associated_objects: Array<{
    id: string;
    type: string;
  }>;
  created: number;
  expires: number;
  livemode: boolean;
  secret: string;
}
