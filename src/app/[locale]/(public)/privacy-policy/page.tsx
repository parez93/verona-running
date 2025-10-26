import React from 'react';
import {Bookmark, ChevronDown, ExternalLink, Key, Server, User} from 'lucide-react';
import Link from "next/link";
import {useTranslations} from 'next-intl';

type DetailItemProps = {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    initiallyOpen?: boolean;
};

const DetailItem: React.FC<DetailItemProps> = ({title, icon: Icon, children, initiallyOpen = false}) => (
    <details className="group border border-gray-200 rounded overflow-hidden" open={initiallyOpen}>
        <summary className="list-none flex items-center justify-between p-4 cursor-pointer bg-white hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
                <Icon className="h-6 w-6 text-gray-700 flex-shrink-0"/>
                <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
            </div>
            <ChevronDown className="h-5 w-5 text-gray-700 transition-transform duration-200 group-open:rotate-180 flex-shrink-0"/>
        </summary>
        <div className="px-4 pt-4 pb-4 border-t border-gray-200 bg-white text-sm text-gray-600 leading-relaxed">
            {children}
        </div>
    </details>
);

const PrivacyPolicy = () => {
    const t = useTranslations('privacyPolicy');

    return (
        <div className="bg-white min-h-screen">
            <div className="container max-w-5xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 md:p-8">
                        {/* Header */}
                        <header className="pb-6 border-b border-gray-200">
                            <h1 className="text-2xl md:text-3xl text-gray-900 mb-2 font-bold">
                                {t('header.title')} <strong>{t('header.company')}</strong>
                            </h1>
                            <p className="mb-4 text-gray-600">{t('header.intro')}</p>
                            <p className="mb-4 text-gray-600">{t('header.protection_levels')}</p>
                            <p className="text-gray-600">{t('header.printable')}</p>
                        </header>

                        {/* Summary Section */}
                        <section className="py-6">
                            <div className="pb-5 border-b border-gray-200">
                                <h2 className="text-xl text-gray-900 font-bold text-center">
                                    {t('summary.title')}
                                </h2>
                            </div>
                        </section>

                        {/* Data Processing Purposes */}
                        <section className="py-6">
                            <h2 className="text-xl text-gray-900 font-bold mb-5">
                                {t('purposes.title')}
                            </h2>
                            <ul className="list-none space-y-5">
                                <li className="relative pl-12">
                                    <Server className="absolute left-0 top-1 h-6 w-6 text-gray-700"/>
                                    <h3 className="text-sm text-gray-900 font-bold mb-2">
                                        {t('purposes.hosting.title')}
                                    </h3>
                                    <ul className="list-none space-y-2">
                                        <li className="text-sm pt-2">{t('purposes.hosting.vercel')}</li>
                                        <li className="text-sm pt-2">{t('purposes.hosting.supabase')}</li>
                                    </ul>
                                </li>

                                <li className="relative pl-12">
                                    <Key className="absolute left-0 top-1 h-6 w-6 text-gray-700"/>
                                    <h3 className="text-sm text-gray-900 font-bold mb-2">
                                        {t('purposes.auth.title')}
                                    </h3>
                                    <ul className="list-none space-y-2">
                                        <li>
                                            <h4 className="text-sm text-gray-700 font-bold pt-2">
                                                {t('purposes.auth.direct_registration')}
                                            </h4>
                                            <p className="text-sm text-gray-600">{t('purposes.auth.data_types')}</p>
                                        </li>
                                        <li className="text-sm pt-2">{t('purposes.auth.supabase_auth')}</li>
                                    </ul>
                                </li>

                                <li className="relative pl-12">
                                    <ExternalLink className="absolute left-0 top-1 h-6 w-6 text-gray-700"/>
                                    <h3 className="text-sm text-gray-900 font-bold mb-2">
                                        {t('purposes.external_content.title')}
                                    </h3>
                                    <ul className="list-none">
                                        <li className="text-sm pt-2">{t('purposes.external_content.google_fonts')}</li>
                                    </ul>
                                </li>
                            </ul>
                        </section>

                        {/* Contact Information */}
                        <section className="py-6 border-t border-gray-200">
                            <h2 className="text-xl text-gray-900 font-bold mb-5">{t('contact.title')}</h2>
                            <div className="relative pl-12">
                                <User className="absolute left-0 top-1 h-6 w-6 text-gray-700"/>
                                <h3 className="text-sm text-gray-900 font-bold mb-2">{t('contact.data_controller')}</h3>
                                <p className="text-gray-600">
                                    {t('contact.name')}<br/>
                                    <i className="not-italic">{t('contact.company')}</i><br/>
                                    {t('contact.address')}<br/>
                                    {t('contact.city')}
                                </p>
                                <p className="mt-4 text-gray-600">
                                    <strong className="font-bold">{t('contact.email_label')}</strong> {t('contact.email')}
                                </p>
                            </div>
                        </section>

                        {/* Full Policy Header */}
                        <section className="py-6 border-t border-gray-200">
                            <h2 className="text-xl text-gray-900 font-bold text-center">{t('full_policy.title')}</h2>
                        </section>

                        {/* Full Policy Content */}
                        <div className="space-y-6 py-6">
                            {/* Data Controller */}
                            <section>
                                <h2 className="text-xl text-gray-900 font-bold mb-4">{t('full_policy.controller.title')}</h2>
                                <p className="text-gray-600">
                                    {t('contact.name')}<br/>
                                    <i className="not-italic">{t('contact.company')}</i><br/>
                                    {t('contact.address')}<br/>
                                    {t('contact.city')}
                                </p>
                                <p className="mt-4 text-gray-600">
                                    <strong className="font-bold">{t('contact.email_label')}</strong> {t('contact.email')}
                                </p>
                            </section>

                            {/* Types of Data Collected */}
                            <section>
                                <h2 className="text-xl text-gray-900 font-bold mb-4">{t('full_policy.data_types.title')}</h2>
                                <p className="mb-4 text-gray-600">{t('full_policy.data_types.collected')}</p>
                                <p className="mb-4 text-gray-600">{t('full_policy.data_types.details')}</p>
                                <p className="mb-4 text-gray-600">{t('full_policy.data_types.responsibility')}</p>
                            </section>

                            {/* Processing Methods */}
                            <section>
                                <h2 className="text-xl text-gray-900 font-bold mb-4">{t('full_policy.processing.title')}</h2>
                                <h3 className="text-sm text-gray-900 font-bold mb-2">{t('full_policy.processing.methods.title')}</h3>
                                <p className="mb-4 text-gray-600">{t('full_policy.processing.methods.description')}</p>

                                <h3 className="text-sm text-gray-900 font-bold mb-2">{t('full_policy.processing.location.title')}</h3>
                                <p className="mb-4 text-gray-600">{t('full_policy.processing.location.description')}</p>

                                <h3 className="text-sm text-gray-900 font-bold mb-2">{t('full_policy.processing.retention.title')}</h3>
                                <p className="mb-4 text-gray-600">{t('full_policy.processing.retention.description')}</p>
                            </section>

                            {/* Processing Purposes */}
                            <section>
                                <h2 className="text-xl text-gray-900 font-bold mb-4">{t('full_policy.processing_purposes.title')}</h2>
                                <p className="mb-4 text-gray-600">{t('full_policy.processing_purposes.description')}</p>
                                <p className="mb-4 text-gray-600">{t('full_policy.processing_purposes.reference')}</p>
                            </section>

                            {/* Detailed Processing */}
                            <section>
                                <h2 className="text-xl text-gray-900 font-bold mb-4">{t('full_policy.detailed_processing.title')}</h2>
                                <p className="mb-4 text-gray-600">{t('full_policy.detailed_processing.intro')}</p>

                                <ul className="list-none space-y-5">
                                    <li>
                                        <DetailItem title={t('purposes.hosting.title')} icon={Server} initiallyOpen={true}>
                                            <p className="mb-4">{t('full_policy.detailed_processing.hosting.description')}</p>

                                            <h4 className="font-bold text-gray-900 mb-2 mt-4">{t('purposes.hosting.vercel')}</h4>
                                            <p className="mb-4">
                                                {t('full_policy.detailed_processing.hosting.vercel_description')}
                                                <br/>{t('full_policy.detailed_processing.hosting.vercel_data')}
                                                <br/>
                                                <a href="https://vercel.com/legal/privacy-policy"
                                                   className="text-blue-600 hover:underline">
                                                    {t('common.legal_notes')}
                                                </a>
                                            </p>

                                            <h4 className="font-bold text-gray-900 mb-2 mt-4">{t('purposes.hosting.supabase')}</h4>
                                            <p className="mb-4">
                                                {t('full_policy.detailed_processing.hosting.supabase_description')}
                                                <br/>{t('full_policy.detailed_processing.hosting.supabase_data')}
                                                <br/>
                                                <a href="https://supabase.com/privacy"
                                                   className="text-blue-600 hover:underline">
                                                    {t('common.legal_notes')}
                                                </a>
                                            </p>
                                        </DetailItem>
                                    </li>

                                    <li>
                                        <DetailItem title={t('purposes.auth.title')} icon={Key} initiallyOpen={true}>
                                            <p className="mb-4">{t('full_policy.detailed_processing.auth.description')}</p>

                                            <h4 className="font-bold text-gray-900 mb-2 mt-4">{t('full_policy.detailed_processing.auth.direct_title')}</h4>
                                            <p className="mb-4">
                                                {t('full_policy.detailed_processing.auth.direct_description')}
                                                <br/>{t('full_policy.detailed_processing.auth.direct_data')}
                                            </p>

                                            <h4 className="font-bold text-gray-900 mb-2 mt-4">{t('purposes.auth.supabase_auth')}</h4>
                                            <p className="mb-4">
                                                {t('full_policy.detailed_processing.auth.supabase_description')}
                                                <br/>{t('full_policy.detailed_processing.auth.supabase_data')}
                                                <br/>
                                                <a href="https://supabase.com/privacy"
                                                   className="text-blue-600 hover:underline">
                                                    {t('common.legal_notes')}
                                                </a>
                                            </p>
                                        </DetailItem>
                                    </li>

                                    <li>
                                        <DetailItem title={t('purposes.external_content.title')} icon={ExternalLink} initiallyOpen={true}>
                                            <p className="mb-4">{t('full_policy.detailed_processing.external.description')}</p>

                                            <h4 className="font-bold text-gray-900 mb-2 mt-4">{t('purposes.external_content.google_fonts')}</h4>
                                            <p className="mb-4">
                                                {t('full_policy.detailed_processing.external.google_fonts_description')}
                                                <br/>{t('full_policy.detailed_processing.external.google_fonts_data')}
                                                <br/>
                                                <a href="https://business.safety.google/privacy/"
                                                   className="text-blue-600 hover:underline">
                                                    {t('common.legal_notes')}
                                                </a>
                                            </p>
                                        </DetailItem>
                                    </li>
                                </ul>
                            </section>

                            {/* Cookie Policy */}
                            <section>
                                <h2 className="text-xl text-gray-900 font-bold mb-4">{t('full_policy.cookies.title')}</h2>
                                <p className="text-gray-600">
                                    {t('full_policy.cookies.description')}{' '}
                                    <Link href="/cookie-policy" className="text-blue-600 hover:underline">
                                        {t('full_policy.cookies.link')}
                                    </Link>.
                                </p>
                            </section>

                            {/* EU Users Information */}
                            <section>
                                <h2 className="text-xl text-gray-900 font-bold mb-4">{t('full_policy.eu_users.title')}</h2>
                                <p className="mb-4 text-gray-600">{t('full_policy.eu_users.intro')}</p>

                                <h3 className="text-sm text-gray-900 font-bold mb-2">{t('full_policy.eu_users.legal_basis.title')}</h3>
                                <p className="mb-4 text-gray-600">{t('full_policy.eu_users.legal_basis.intro')}</p>
                                <ul className="list-disc pl-5 space-y-2 mb-4 text-gray-600">
                                    <li>{t('full_policy.eu_users.legal_basis.consent')}</li>
                                    <li>{t('full_policy.eu_users.legal_basis.contract')}</li>
                                    <li>{t('full_policy.eu_users.legal_basis.legal_obligation')}</li>
                                    <li>{t('full_policy.eu_users.legal_basis.public_interest')}</li>
                                    <li>{t('full_policy.eu_users.legal_basis.legitimate_interest')}</li>
                                </ul>
                                <p className="text-gray-600">{t('full_policy.eu_users.legal_basis.clarification')}</p>
                            </section>

                            {/* Retention Period */}
                            <section>
                                <h2 className="text-xl text-gray-900 font-bold mb-4">{t('full_policy.retention.title')}</h2>
                                <p className="mb-4 text-gray-600">{t('full_policy.retention.intro')}</p>
                                <p className="mb-4 text-gray-600">{t('full_policy.retention.therefore')}</p>
                                <ul className="list-disc pl-5 space-y-2 mb-4 text-gray-600">
                                    <li>{t('full_policy.retention.contract_data')}</li>
                                    <li>{t('full_policy.retention.legitimate_interest')}</li>
                                </ul>
                                <p className="mb-4 text-gray-600">{t('full_policy.retention.consent_based')}</p>
                            </section>

                            {/* User Rights */}
                            <section>
                                <h2 className="text-xl text-gray-900 font-bold mb-4">{t('full_policy.user_rights.title')}</h2>
                                <p className="mb-4 text-gray-600">{t('full_policy.user_rights.intro')}</p>
                                <p className="mb-4 text-gray-600">{t('full_policy.user_rights.within_limits')}</p>
                                <ul className="list-disc pl-5 space-y-2 mb-4 text-gray-600">
                                    <li><b>{t('full_policy.user_rights.revoke_consent.title')}</b> {t('full_policy.user_rights.revoke_consent.description')}</li>
                                    <li><b>{t('full_policy.user_rights.object.title')}</b> {t('full_policy.user_rights.object.description')}</li>
                                    <li><b>{t('full_policy.user_rights.access.title')}</b> {t('full_policy.user_rights.access.description')}</li>
                                    <li><b>{t('full_policy.user_rights.rectification.title')}</b> {t('full_policy.user_rights.rectification.description')}</li>
                                    <li><b>{t('full_policy.user_rights.restriction.title')}</b> {t('full_policy.user_rights.restriction.description')}</li>
                                    <li><b>{t('full_policy.user_rights.erasure.title')}</b> {t('full_policy.user_rights.erasure.description')}</li>
                                    <li><b>{t('full_policy.user_rights.portability.title')}</b> {t('full_policy.user_rights.portability.description')}</li>
                                    <li><b>{t('full_policy.user_rights.complaint.title')}</b> {t('full_policy.user_rights.complaint.description')}</li>
                                </ul>
                                <p className="mb-4 text-gray-600">{t('full_policy.user_rights.transfer_info')}</p>
                            </section>

                            {/* Right to Object */}
                            <section>
                                <h2 className="text-xl text-gray-900 font-bold mb-4">{t('full_policy.right_to_object.title')}</h2>
                                <p className="mb-4 text-gray-600"><b>{t('full_policy.right_to_object.description')}</b></p>
                            </section>

                            {/* How to Exercise Rights */}
                            <section>
                                <h2 className="text-xl text-gray-900 font-bold mb-4">{t('full_policy.exercise_rights.title')}</h2>
                                <p className="mb-4 text-gray-600">{t('full_policy.exercise_rights.description')}</p>
                            </section>

                            {/* Additional Information */}
                            <section>
                                <h2 className="text-xl text-gray-900 font-bold mb-4">{t('full_policy.additional_info.title')}</h2>

                                <h3 className="text-sm text-gray-900 font-bold mb-2">{t('full_policy.additional_info.legal_defense.title')}</h3>
                                <p className="mb-4 text-gray-600">{t('full_policy.additional_info.legal_defense.description')}</p>

                                <h3 className="text-sm text-gray-900 font-bold mb-2">{t('full_policy.additional_info.specific_info.title')}</h3>
                                <p className="mb-4 text-gray-600">{t('full_policy.additional_info.specific_info.description')}</p>

                                <h3 className="text-sm text-gray-900 font-bold mb-2">{t('full_policy.additional_info.system_logs.title')}</h3>
                                <p className="mb-4 text-gray-600">{t('full_policy.additional_info.system_logs.description')}</p>

                                <h3 className="text-sm text-gray-900 font-bold mb-2">{t('full_policy.additional_info.not_contained.title')}</h3>
                                <p className="mb-4 text-gray-600">{t('full_policy.additional_info.not_contained.description')}</p>

                                <h3 className="text-sm text-gray-900 font-bold mb-2">{t('full_policy.additional_info.policy_changes.title')}</h3>
                                <p className="mb-4 text-gray-600">
                                    {t('full_policy.additional_info.policy_changes.description')}
                                    <p className="mt-2">{t('full_policy.additional_info.policy_changes.consent')}</p>
                                </p>
                            </section>

                            {/* Definitions */}
                            <section className="pt-5">
                                <DetailItem title={t('definitions.title')} icon={Bookmark} initiallyOpen={false}>
                                    <h3 className="text-sm text-gray-900 font-bold mb-2">{t('definitions.personal_data.title')}</h3>
                                    <p className="mb-4 text-gray-600">{t('definitions.personal_data.description')}</p>

                                    <h3 className="text-sm text-gray-900 font-bold mb-2">{t('definitions.usage_data.title')}</h3>
                                    <p className="mb-4 text-gray-600">{t('definitions.usage_data.description')}</p>

                                    <h3 className="text-sm text-gray-900 font-bold mb-2">{t('definitions.user.title')}</h3>
                                    <p className="mb-4 text-gray-600">{t('definitions.user.description')}</p>

                                    <h3 className="text-sm text-gray-900 font-bold mb-2">{t('definitions.data_subject.title')}</h3>
                                    <p className="mb-4 text-gray-600">{t('definitions.data_subject.description')}</p>

                                    <h3 className="text-sm text-gray-900 font-bold mb-2">{t('definitions.processor.title')}</h3>
                                    <p className="mb-4 text-gray-600">{t('definitions.processor.description')}</p>

                                    <h3 className="text-sm text-gray-900 font-bold mb-2">{t('definitions.controller.title')}</h3>
                                    <p className="mb-4 text-gray-600">{t('definitions.controller.description')}</p>

                                    <h3 className="text-sm text-gray-900 font-bold mb-2">{t('definitions.application.title')}</h3>
                                    <p className="mb-4 text-gray-600">{t('definitions.application.description')}</p>

                                    <h3 className="text-sm text-gray-900 font-bold mb-2">{t('definitions.service.title')}</h3>
                                    <p className="mb-4 text-gray-600">{t('definitions.service.description')}</p>

                                    <h3 className="text-sm text-gray-900 font-bold mb-2">{t('definitions.eu.title')}</h3>
                                    <p className="mb-4 text-gray-600">{t('definitions.eu.description')}</p>

                                    <h3 className="text-sm text-gray-900 font-bold mb-2">{t('definitions.cookie.title')}</h3>
                                    <p className="mb-4 text-gray-600">{t('definitions.cookie.description')}</p>

                                    <h3 className="text-sm text-gray-900 font-bold mb-2">{t('definitions.tracking_tool.title')}</h3>
                                    <p className="mb-4 text-gray-600">{t('definitions.tracking_tool.description')}</p>

                                    <div className="my-6 border-t border-gray-300"></div>

                                    <h3 className="text-sm text-gray-900 font-bold mb-2">{t('definitions.legal_references.title')}</h3>
                                    <p className="mb-4 text-gray-600">{t('definitions.legal_references.description')}</p>
                                </DetailItem>
                            </section>
                        </div>

                        {/* Footer */}
                        <footer className="py-6 border-t border-gray-200 text-xs text-gray-500">
                            <p>{t('footer.last_modified')}</p>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy
